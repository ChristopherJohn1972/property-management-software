// src/main/java/com/propertymanagement/service/PropertyService.java
package com.propertymanagement.service;

import com.propertymanagement.dto.PropertyDTO;
import com.propertymanagement.model.Property;
import com.propertymanagement.model.User;
import com.propertymanagement.repository.PropertyRepository;
import com.propertymanagement.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PropertyService {
    
    private final PropertyRepository propertyRepository;
    private final UserRepository userRepository;
    private final PaymentService paymentService;
    
    public PropertyService(PropertyRepository propertyRepository,
                          UserRepository userRepository,
                          PaymentService paymentService) {
        this.propertyRepository = propertyRepository;
        this.userRepository = userRepository;
        this.paymentService = paymentService;
    }
    
    @Transactional
    public Property createProperty(PropertyDTO propertyDTO, Long ownerId) {
        User owner = userRepository.findById(ownerId)
            .orElseThrow(() -> new RuntimeException("Owner not found"));
        
        Property property = new Property();
        mapDtoToEntity(propertyDTO, property);
        property.setOwner(owner);
        
        return propertyRepository.save(property);
    }
    
    @Transactional
    public Property updateProperty(Long id, PropertyDTO propertyDTO) {
        Property property = propertyRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Property not found"));
        
        mapDtoToEntity(propertyDTO, property);
        return propertyRepository.save(property);
    }
    
    public PropertyDTO getPropertyById(Long id) {
        Property property = propertyRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Property not found"));
        
        return mapEntityToDto(property);
    }
    
    public Page<PropertyDTO> getPropertiesByOwner(Long ownerId, Pageable pageable) {
        User owner = userRepository.findById(ownerId)
            .orElseThrow(() -> new RuntimeException("Owner not found"));
        
        return propertyRepository.findByOwner(owner)
            .map(this::mapEntityToDto);
    }
    
    public List<PropertyDTO> getAvailableProperties() {
        return propertyRepository.findAvailableProperties(LocalDate.now())
            .stream()
            .map(this::mapEntityToDto)
            .collect(Collectors.toList());
    }
    
    public List<PropertyDTO> searchProperties(String city, String state, 
                                              BigDecimal minRent, BigDecimal maxRent) {
        if (city != null && state != null) {
            return propertyRepository.findByCityAndState(city, state)
                .stream()
                .map(this::mapEntityToDto)
                .collect(Collectors.toList());
        } else if (minRent != null && maxRent != null) {
            return propertyRepository.findByRentRange(minRent, maxRent)
                .stream()
                .map(this::mapEntityToDto)
                .collect(Collectors.toList());
        }
        
        return propertyRepository.findAll()
            .stream()
            .map(this::mapEntityToDto)
            .collect(Collectors.toList());
    }
    
    public BigDecimal getTotalMonthlyRevenue(Long ownerId) {
        return propertyRepository.getTotalMonthlyRentByOwner(ownerId);
    }
    
    private void mapDtoToEntity(PropertyDTO dto, Property entity) {
        entity.setPropertyName(dto.getPropertyName());
        entity.setAddress(dto.getAddress());
        entity.setCity(dto.getCity());
        entity.setState(dto.getState());
        entity.setZipCode(dto.getZipCode());
        entity.setMonthlyRent(dto.getMonthlyRent());
        entity.setSecurityDeposit(dto.getSecurityDeposit());
        entity.setBedrooms(dto.getBedrooms());
        entity.setBathrooms(dto.getBathrooms());
        entity.setSquareFeet(dto.getSquareFeet());
        
        if (dto.getPropertyType() != null) {
            entity.setPropertyType(Property.PropertyType.valueOf(dto.getPropertyType()));
        }
        if (dto.getStatus() != null) {
            entity.setStatus(Property.PropertyStatus.valueOf(dto.getStatus()));
        }
        entity.setAvailableDate(dto.getAvailableDate());
    }
    
    private PropertyDTO mapEntityToDto(Property property) {
        PropertyDTO dto = new PropertyDTO();
        dto.setId(property.getId());
        dto.setPropertyName(property.getPropertyName());
        dto.setAddress(property.getAddress());
        dto.setCity(property.getCity());
        dto.setState(property.getState());
        dto.setZipCode(property.getZipCode());
        dto.setMonthlyRent(property.getMonthlyRent());
        dto.setSecurityDeposit(property.getSecurityDeposit());
        dto.setBedrooms(property.getBedrooms());
        dto.setBathrooms(property.getBathrooms());
        dto.setSquareFeet(property.getSquareFeet());
        dto.setPropertyType(property.getPropertyType() != null ? property.getPropertyType().name() : null);
        dto.setStatus(property.getStatus().name());
        dto.setAvailableDate(property.getAvailableDate());
        
        if (property.getOwner() != null) {
            dto.setOwnerId(property.getOwner().getId());
            dto.setOwnerName(property.getOwner().getFirstName() + " " + property.getOwner().getLastName());
        }
        
        // Calculate statistics
        dto.setTenantCount(property.getTenants() != null ? property.getTenants().size() : 0);
        dto.setActiveLeases(property.getLeases() != null ? 
            (int) property.getLeases().stream()
                .filter(l -> l.getStatus() == Property.PropertyStatus.RENTED)
                .count() : 0);
        
        return dto;
    }
}
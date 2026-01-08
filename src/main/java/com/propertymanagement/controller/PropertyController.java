// src/main/java/com/propertymanagement/controller/PropertyController.java
package com.propertymanagement.controller;

import com.propertymanagement.dto.PropertyDTO;
import com.propertymanagement.service.PropertyService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.math.BigDecimal;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/properties")
public class PropertyController {
    
    private final PropertyService propertyService;
    
    public PropertyController(PropertyService propertyService) {
        this.propertyService = propertyService;
    }
    
    @PostMapping
    @PreAuthorize("hasRole('LANDLORD') or hasRole('ADMIN')")
    public ResponseEntity<PropertyDTO> createProperty(
            @Valid @RequestBody PropertyDTO propertyDTO,
            Principal principal) {
        // Get owner ID from principal
        Long ownerId = getUserIdFromPrincipal(principal);
        PropertyDTO created = propertyService.createProperty(propertyDTO, ownerId);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('LANDLORD') or hasRole('ADMIN')")
    public ResponseEntity<PropertyDTO> updateProperty(
            @PathVariable Long id,
            @Valid @RequestBody PropertyDTO propertyDTO) {
        PropertyDTO updated = propertyService.updateProperty(id, propertyDTO);
        return ResponseEntity.ok(updated);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<PropertyDTO> getProperty(@PathVariable Long id) {
        PropertyDTO property = propertyService.getPropertyById(id);
        return ResponseEntity.ok(property);
    }
    
    @GetMapping
    public ResponseEntity<Page<PropertyDTO>> getProperties(Pageable pageable) {
        Page<PropertyDTO> properties = propertyService.getPropertiesByOwner(
            getCurrentUserId(), pageable);
        return ResponseEntity.ok(properties);
    }
    
    @GetMapping("/available")
    public ResponseEntity<List<PropertyDTO>> getAvailableProperties() {
        List<PropertyDTO> properties = propertyService.getAvailableProperties();
        return ResponseEntity.ok(properties);
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<PropertyDTO>> searchProperties(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String state,
            @RequestParam(required = false) BigDecimal minRent,
            @RequestParam(required = false) BigDecimal maxRent) {
        List<PropertyDTO> properties = propertyService.searchProperties(
            city, state, minRent, maxRent);
        return ResponseEntity.ok(properties);
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteProperty(@PathVariable Long id) {
        // propertyService.deleteProperty(id);
        return ResponseEntity.noContent().build();
    }
    
    private Long getUserIdFromPrincipal(Principal principal) {
        // Extract user ID from principal (implementation depends on your setup)
        return 1L; // Placeholder
    }
    
    private Long getCurrentUserId() {
        // Get current user ID from security context
        return 1L; // Placeholder
    }
}
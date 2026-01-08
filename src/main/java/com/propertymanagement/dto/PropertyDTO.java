// src/main/java/com/propertymanagement/dto/PropertyDTO.java
package com.propertymanagement.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PropertyDTO {
    private Long id;
    
    @NotBlank(message = "Property name is required")
    private String propertyName;
    
    @NotBlank(message = "Address is required")
    private String address;
    
    @NotBlank(message = "City is required")
    private String city;
    
    @NotBlank(message = "State is required")
    private String state;
    
    @NotBlank(message = "ZIP code is required")
    private String zipCode;
    
    @NotNull(message = "Monthly rent is required")
    @Positive(message = "Monthly rent must be positive")
    private BigDecimal monthlyRent;
    
    private BigDecimal securityDeposit;
    private Integer bedrooms;
    private Integer bathrooms;
    private BigDecimal squareFeet;
    private String propertyType;
    private String status;
    private LocalDate availableDate;
    private Long ownerId;
    private String ownerName;
    
    // Statistics
    private Integer tenantCount;
    private Integer activeLeases;
    private BigDecimal totalRevenue;
    private BigDecimal occupancyRate;
}
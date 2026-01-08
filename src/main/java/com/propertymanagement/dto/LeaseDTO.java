// src/main/java/com/propertymanagement/dto/LeaseDTO.java
package com.propertymanagement.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import javax.validation.constraints.Future;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LeaseDTO {
    private Long id;
    private String leaseNumber;
    
    @NotNull(message = "Property ID is required")
    private Long propertyId;
    
    @NotNull(message = "Tenant ID is required")
    private Long tenantId;
    
    @NotNull(message = "Start date is required")
    private LocalDate startDate;
    
    @NotNull(message = "End date is required")
    @Future(message = "End date must be in the future")
    private LocalDate endDate;
    
    @NotNull(message = "Monthly rent is required")
    @Positive(message = "Monthly rent must be positive")
    private BigDecimal monthlyRent;
    
    @NotNull(message = "Security deposit is required")
    @Positive(message = "Security deposit must be positive")
    private BigDecimal securityDeposit;
    
    private String status;
    private String terms;
    private LocalDate signedDate;
    
    // Related data
    private String propertyName;
    private String tenantName;
    private String tenantEmail;
    private BigDecimal totalPaid;
    private BigDecimal balanceDue;
    private Integer daysRemaining;
}
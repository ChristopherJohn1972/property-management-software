// src/main/java/com/propertymanagement/model/Property.java
package com.propertymanagement.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "properties")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Property {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "property_name", nullable = false)
    private String propertyName;
    
    @Column(nullable = false)
    private String address;
    
    @Column(nullable = false)
    private String city;
    
    @Column(nullable = false)
    private String state;
    
    @Column(name = "zip_code", nullable = false)
    private String zipCode;
    
    @Column(name = "monthly_rent", nullable = false, precision = 15, scale = 2)
    private BigDecimal monthlyRent;
    
    @Column(name = "security_deposit", precision = 15, scale = 2)
    private BigDecimal securityDeposit;
    
    private Integer bedrooms;
    
    private Integer bathrooms;
    
    @Column(name = "square_feet", precision = 10, scale = 2)
    private BigDecimal squareFeet;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "property_type")
    private PropertyType propertyType;
    
    @Enumerated(EnumType.STRING)
    private PropertyStatus status = PropertyStatus.VACANT;
    
    @Column(name = "available_date")
    private LocalDate availableDate;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id")
    private User owner;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Tenant> tenants = new HashSet<>();
    
    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Lease> leases = new HashSet<>();
    
    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<MaintenanceRequest> maintenanceRequests = new HashSet<>();
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    public enum PropertyType {
        APARTMENT, CONDO, HOUSE, TOWNHOUSE, COMMERCIAL
    }
    
    public enum PropertyStatus {
        VACANT, OCCUPIED, UNDER_MAINTENANCE, RENTED
    }
}
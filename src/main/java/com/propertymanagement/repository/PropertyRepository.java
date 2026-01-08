// src/main/java/com/propertymanagement/repository/PropertyRepository.java
package com.propertymanagement.repository;

import com.propertymanagement.model.Property;
import com.propertymanagement.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface PropertyRepository extends JpaRepository<Property, Long> {
    
    List<Property> findByOwner(User owner);
    List<Property> findByCityAndState(String city, String state);
    List<Property> findByStatus(Property.PropertyStatus status);
    
    @Query("SELECT p FROM Property p WHERE p.monthlyRent BETWEEN :minRent AND :maxRent")
    List<Property> findByRentRange(@Param("minRent") BigDecimal minRent, 
                                   @Param("maxRent") BigDecimal maxRent);
    
    @Query("SELECT p FROM Property p WHERE p.availableDate <= :date AND p.status = 'VACANT'")
    List<Property> findAvailableProperties(@Param("date") LocalDate date);
    
    @Query("SELECT COUNT(p) FROM Property p WHERE p.owner.id = :ownerId")
    Long countByOwnerId(@Param("ownerId") Long ownerId);
    
    @Query("SELECT SUM(p.monthlyRent) FROM Property p WHERE p.owner.id = :ownerId AND p.status = 'OCCUPIED'")
    BigDecimal getTotalMonthlyRentByOwner(@Param("ownerId") Long ownerId);
}
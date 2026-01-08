// src/main/java/com/propertymanagement/repository/PaymentRepository.java
package com.propertymanagement.repository;

import com.propertymanagement.model.Payment;
import com.propertymanagement.model.Payment.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    
    List<Payment> findByTenantId(Long tenantId);
    List<Payment> findByLeaseId(Long leaseId);
    List<Payment> findByStatus(PaymentStatus status);
    List<Payment> findByPaymentDateBetween(LocalDate startDate, LocalDate endDate);
    
    @Query("SELECT p FROM Payment p WHERE p.dueDate < :date AND p.status IN ('PENDING', 'OVERDUE')")
    List<Payment> findOverduePayments(@Param("date") LocalDate date);
    
    @Query("SELECT SUM(p.amount) FROM Payment p WHERE p.tenant.id = :tenantId AND p.status = 'PAID'")
    BigDecimal getTotalPaidByTenant(@Param("tenantId") Long tenantId);
    
    @Query("SELECT SUM(p.amount) FROM Payment p WHERE p.paymentDate BETWEEN :startDate AND :endDate AND p.status = 'PAID'")
    BigDecimal getTotalRevenue(@Param("startDate") LocalDate startDate, 
                               @Param("endDate") LocalDate endDate);
}
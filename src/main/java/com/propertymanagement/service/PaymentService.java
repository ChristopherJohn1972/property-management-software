// src/main/java/com/propertymanagement/service/PaymentService.java
package com.propertymanagement.service;

import com.propertymanagement.model.Payment;
import com.propertymanagement.repository.PaymentRepository;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import com.stripe.param.ChargeCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@Service
public class PaymentService {
    
    @Value("${app.payment.stripe.secret-key}")
    private String stripeSecretKey;
    
    @Value("${app.payment.stripe.public-key}")
    private String stripePublicKey;
    
    private final PaymentRepository paymentRepository;
    
    public PaymentService(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }
    
    @Transactional
    public Payment createPayment(Payment payment) {
        return paymentRepository.save(payment);
    }
    
    public String processStripePayment(String token, BigDecimal amount, String description) 
            throws StripeException {
        Stripe.apiKey = stripeSecretKey;
        
        ChargeCreateParams params = ChargeCreateParams.builder()
            .setAmount(amount.multiply(BigDecimal.valueOf(100)).longValue()) // Convert to cents
            .setCurrency("usd")
            .setDescription(description)
            .setSource(token)
            .build();
        
        Charge charge = Charge.create(params);
        return charge.getId();
    }
    
    public Map<String, Object> generatePaymentReport(LocalDate startDate, LocalDate endDate) {
        Map<String, Object> report = new HashMap<>();
        
        BigDecimal totalRevenue = paymentRepository.getTotalRevenue(startDate, endDate);
        BigDecimal pendingPayments = paymentRepository.findByStatus(Payment.PaymentStatus.PENDING)
            .stream()
            .map(Payment::getAmount)
            .reduce(BigDecimal.ZERO, BigDecimal::add);
        
        BigDecimal overduePayments = paymentRepository.findOverduePayments(LocalDate.now())
            .stream()
            .map(Payment::getAmount)
            .reduce(BigDecimal.ZERO, BigDecimal::add);
        
        report.put("totalRevenue", totalRevenue);
        report.put("pendingPayments", pendingPayments);
        report.put("overduePayments", overduePayments);
        report.put("period", startDate + " to " + endDate);
        report.put("generatedAt", LocalDate.now());
        
        return report;
    }
    
    public void sendPaymentReminder(Long paymentId) {
        Payment payment = paymentRepository.findById(paymentId)
            .orElseThrow(() -> new RuntimeException("Payment not found"));
        
        // Send email reminder logic here
        // emailService.sendPaymentReminder(payment);
    }
}
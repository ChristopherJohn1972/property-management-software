// src/main/java/com/propertymanagement/sync/SyncService.java
package com.propertymanagement.sync;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.propertymanagement.model.Property;
import com.propertymanagement.repository.PropertyRepository;
import okhttp3.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class SyncService {
    
    private static final Logger logger = LoggerFactory.getLogger(SyncService.class);
    
    @Value("${app.backend.url}")
    private String backendUrl;
    
    private final OkHttpClient httpClient;
    private final ObjectMapper objectMapper;
    private final PropertyRepository propertyRepository;
    
    public SyncService(PropertyRepository propertyRepository) {
        this.httpClient = new OkHttpClient.Builder()
            .connectTimeout(30, java.util.concurrent.TimeUnit.SECONDS)
            .readTimeout(30, java.util.concurrent.TimeUnit.SECONDS)
            .writeTimeout(30, java.util.concurrent.TimeUnit.SECONDS)
            .build();
        this.objectMapper = new ObjectMapper();
        this.propertyRepository = propertyRepository;
    }
    
    @Scheduled(fixedDelayString = "${app.sync.interval}")
    public void syncProperties() {
        logger.info("Starting property synchronization with backend...");
        
        try {
            List<Property> localProperties = propertyRepository.findAll();
            
            for (Property property : localProperties) {
                if (needsSync(property)) {
                    syncProperty(property);
                }
            }
            
            logger.info("Property synchronization completed successfully");
        } catch (Exception e) {
            logger.error("Error during property synchronization", e);
        }
    }
    
    private boolean needsSync(Property property) {
        // Check if property was modified recently
        return property.getUpdatedAt().isAfter(
            java.time.LocalDateTime.now().minusMinutes(5)
        );
    }
    
    private void syncProperty(Property property) throws IOException {
        String url = backendUrl + "/api/properties";
        
        // Convert property to JSON
        String json = objectMapper.writeValueAsString(property);
        
        RequestBody body = RequestBody.create(
            json,
            MediaType.parse("application/json; charset=utf-8")
        );
        
        Request request = new Request.Builder()
            .url(url)
            .post(body)
            .addHeader("Content-Type", "application/json")
            .addHeader("Accept", "application/json")
            .build();
        
        try (Response response = httpClient.newCall(request).execute()) {
            if (response.isSuccessful()) {
                logger.info("Successfully synced property: {}", property.getPropertyName());
                // Update sync timestamp
                // syncTrackerRepository.markAsSynced(property.getId(), "PROPERTY");
            } else {
                logger.error("Failed to sync property: {}. Response: {}", 
                    property.getPropertyName(), response.body().string());
            }
        }
    }
    
    public void syncAllProperties() throws IOException {
        logger.info("Syncing all properties with backend...");
        
        String url = backendUrl + "/api/properties/batch-sync";
        List<Property> properties = propertyRepository.findAll();
        
        String json = objectMapper.writeValueAsString(properties);
        
        RequestBody body = RequestBody.create(
            json,
            MediaType.parse("application/json; charset=utf-8")
        );
        
        Request request = new Request.Builder()
            .url(url)
            .post(body)
            .addHeader("Content-Type", "application/json")
            .build();
        
        try (Response response = httpClient.newCall(request).execute()) {
            if (response.isSuccessful()) {
                logger.info("Batch sync completed successfully");
            } else {
                logger.error("Batch sync failed: {}", response.body().string());
            }
        }
    }
}
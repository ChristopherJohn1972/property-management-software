// src/main/java/com/propertymanagement/repository/UserRepository.java
package com.propertymanagement.repository;

import com.propertymanagement.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    
    @Query("SELECT u FROM User u WHERE u.role = :role AND u.enabled = true")
    List<User> findByRole(@Param("role") User.Role role);
    
    @Query("SELECT u FROM User u WHERE u.email LIKE %:search% OR u.firstName LIKE %:search% OR u.lastName LIKE %:search%")
    List<User> searchUsers(@Param("search") String search);
}
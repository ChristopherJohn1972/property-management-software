// src/main/java/com/propertymanagement/web/WebController.java
package com.propertymanagement.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {
    
    @GetMapping("/")
    public String home() {
        return "index";
    }
    
    @GetMapping("/login")
    public String login() {
        return "login";
    }
    
    @GetMapping("/dashboard")
    public String dashboard(Model model) {
        model.addAttribute("title", "Dashboard");
        return "dashboard";
    }
    
    @GetMapping("/properties")
    public String properties(Model model) {
        model.addAttribute("title", "Properties");
        return "properties";
    }
    
    @GetMapping("/tenants")
    public String tenants(Model model) {
        model.addAttribute("title", "Tenants");
        return "tenants";
    }
    
    @GetMapping("/leases")
    public String leases(Model model) {
        model.addAttribute("title", "Leases");
        return "leases";
    }
    
    @GetMapping("/payments")
    public String payments(Model model) {
        model.addAttribute("title", "Payments");
        return "payments";
    }
    
    @GetMapping("/maintenance")
    public String maintenance(Model model) {
        model.addAttribute("title", "Maintenance");
        return "maintenance";
    }
    
    @GetMapping("/reports")
    public String reports(Model model) {
        model.addAttribute("title", "Reports");
        return "reports";
    }
}
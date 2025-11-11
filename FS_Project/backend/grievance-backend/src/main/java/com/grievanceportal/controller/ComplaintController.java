package com.grievanceportal.controller;

import com.grievanceportal.model.Complaint;
import com.grievanceportal.repository.ComplaintRepository;
import com.grievanceportal.security.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/complaints")
@CrossOrigin(
    origins = {"http://localhost:5173", "http://127.0.0.1:5173"},
    allowCredentials = "true"
)
public class ComplaintController {

    private final ComplaintRepository complaintRepository;
    private final JwtService jwtService;

    public ComplaintController(ComplaintRepository complaintRepository, JwtService jwtService) {
        this.complaintRepository = complaintRepository;
        this.jwtService = jwtService;
    }

    // ✅ Public route — fetch all resolved complaints for "Major Complaints" page
    @GetMapping("/major")
    public List<Complaint> getMajorResolvedComplaints() {
        return complaintRepository.findByStatus("RESOLVED");
    }

    // ✅ Authenticated route — submit new complaint
    @PostMapping
    public Complaint submitComplaint(@RequestBody Complaint complaint, HttpServletRequest request) {
        String email = jwtService.extractEmailFromRequest(request);
        System.out.println("📩 Extracted email from JWT (POST /complaints): " + email);

        if (email == null) {
            System.out.println("❌ Unauthorized — invalid or missing JWT token.");
            throw new RuntimeException("Unauthorized: Invalid or missing JWT token");
        }

        complaint.setUserEmail(email);
        complaint.setStatus("OPEN");
        complaint.setCreatedAt(LocalDateTime.now());

        Complaint saved = complaintRepository.save(complaint);
        System.out.println("✅ Complaint saved for user: " + email + " (ID: " + saved.getId() + ")");
        return saved;
    }

    // ✅ Authenticated route — get logged-in user's complaints
    @GetMapping("/my")
    public List<Complaint> getUserComplaints(HttpServletRequest request) {
        String email = jwtService.extractEmailFromRequest(request);
        System.out.println("📩 Extracted email from JWT (GET /complaints/my): " + email);

        if (email == null) {
            System.out.println("❌ Email extraction failed — invalid or missing token.");
            throw new RuntimeException("Unauthorized: Invalid or missing JWT token");
        }

        List<Complaint> complaints = complaintRepository.findByUserEmail(email);
        System.out.println("🗂 Found " + complaints.size() + " complaints for user: " + email);
        return complaints;
    }

    // ⚙️ Dev/test route — get all complaints (admin/debug use)
    @GetMapping
    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }
}

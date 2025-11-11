package com.grievanceportal.controller;

import com.grievanceportal.model.Complaint;
import com.grievanceportal.repository.ComplaintRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final ComplaintRepository complaintRepository;

    public AdminController(ComplaintRepository complaintRepository) {
        this.complaintRepository = complaintRepository;
    }

    // ✅ Get all complaints (for Admin Dashboard)
    @GetMapping("/complaints")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<Complaint>> getAllComplaints() {
        List<Complaint> complaints = complaintRepository.findAll();
        return ResponseEntity.ok(complaints);
    }

    // ✅ Update complaint status
    @PutMapping("/complaints/{id}/status")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> updateStatus(
            @PathVariable Long id,
            @RequestParam String status
    ) {
        return complaintRepository.findById(id)
                .map(complaint -> {
                    complaint.setStatus(status);
                    complaintRepository.save(complaint);
                    return ResponseEntity.ok("✅ Complaint status updated to: " + status);
                })
                .orElse(ResponseEntity.notFound().build());
    }
}

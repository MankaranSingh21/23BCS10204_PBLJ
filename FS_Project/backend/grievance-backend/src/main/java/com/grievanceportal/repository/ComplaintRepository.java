package com.grievanceportal.repository;

import com.grievanceportal.model.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {

    // 🔹 Fetch all complaints with a given status (e.g., "RESOLVED", "OPEN")
    List<Complaint> findByStatus(String status);

    // 🔹 Fetch all complaints submitted by a specific user (using their email)
    List<Complaint> findByUserEmail(String userEmail);
}

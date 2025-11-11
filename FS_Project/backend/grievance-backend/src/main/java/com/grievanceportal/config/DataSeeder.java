package com.grievanceportal.config;

import com.grievanceportal.model.Complaint;
import com.grievanceportal.repository.ComplaintRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder {

    private final ComplaintRepository complaintRepository;

    @PostConstruct
    public void seedData() {
        if (complaintRepository.count() == 0) {
            List<Complaint> complaints = List.of(
                Complaint.builder()
                        .title("Pothole on Main Street")
                        .description("Large pothole near the city post office, causing accidents.")
                        .status("RESOLVED")
                        .userEmail("citizen1@example.com")
                        .createdAt(LocalDateTime.now().minusDays(5))
                        .build(),

                Complaint.builder()
                        .title("Broken Street Lights")
                        .description("Multiple street lights not working in Sector 9 area.")
                        .status("RESOLVED")
                        .userEmail("citizen2@example.com")
                        .createdAt(LocalDateTime.now().minusDays(2))
                        .build(),

                Complaint.builder()
                        .title("Garbage Overflow")
                        .description("Waste bins overflowing near the school entrance.")
                        .status("RESOLVED")
                        .userEmail("citizen3@example.com")
                        .createdAt(LocalDateTime.now().minusDays(7))
                        .build()
            );

            complaintRepository.saveAll(complaints);
            System.out.println("✅ Seeded mock major resolved complaints into DB!");
        }
    }
}

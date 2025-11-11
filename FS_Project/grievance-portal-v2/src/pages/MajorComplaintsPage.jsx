// src/pages/MajorComplaintsPage.jsx
import React, { useEffect, useState } from "react";
import ComplaintCard from "../components/ComplaintCard";
import api from "../api/apiClient";

export default function MajorComplaintsPage() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchResolved = async () => {
      try {
        const res = await api.get("/complaints/major");
        setComplaints(res.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchResolved();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4 text-indigo-700">
        Major Resolved Complaints
      </h2>

      {complaints.length === 0 ? (
        <p className="text-gray-600">No major complaints found.</p>
      ) : (
        <div className="grid gap-4">
          {complaints.map((c) => (
            <ComplaintCard key={c.id} complaint={c} isMajor />
          ))}
        </div>
      )}
    </div>
  );
}

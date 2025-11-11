// src/pages/CheckComplaintPage.jsx
import React, { useState } from "react";
import ComplaintCard from "../components/ComplaintCard";
import api from "../api/apiClient";

export default function CheckComplaintPage() {
  const [id, setId] = useState("");
  const [complaint, setComplaint] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await api.get(`/complaints/${id}`);
      setComplaint(res.data);
    } catch (err) {
      setComplaint(null);
      setError("Complaint not found.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4 text-indigo-700">
        Check Complaint Status
      </h2>

      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Enter Complaint ID"
          className="flex-grow border rounded-md px-3 py-2"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 rounded-md hover:bg-indigo-700"
        >
          Search
        </button>
      </form>

      {error && <p className="text-red-600">{error}</p>}
      {complaint && <ComplaintCard complaint={complaint} />}
    </div>
  );
}

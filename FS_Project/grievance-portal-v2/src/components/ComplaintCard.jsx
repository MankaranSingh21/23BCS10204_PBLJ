// src/components/ComplaintCard.jsx
import React from "react";

export default function ComplaintCard({ complaint, requestReminder, isMajor = false }) {
  const {
    id,
    name,
    location,
    department,
    description,
    status,
    dateOfComplaint,
    dateOfResolution,
    files = [],
  } = complaint;

  const canRequestReminder = () => {
    const diffDays =
      (new Date() - new Date(dateOfComplaint)) / (1000 * 60 * 60 * 24);
    return diffDays > 15;
  };

  const statusColor = {
    Resolved: "bg-green-100 text-green-700",
    "In Progress": "bg-yellow-100 text-yellow-700",
    Pending: "bg-gray-100 text-gray-700",
  }[status] || "bg-gray-100 text-gray-700";

  return (
    <div className="border p-4 rounded-lg shadow-sm bg-white hover:shadow-md transition">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-semibold">Complaint ID: {id}</h4>
        <span className={`px-2 py-1 rounded text-sm ${statusColor}`}>
          {status}
        </span>
      </div>

      <p className="text-gray-700 mb-2">{description}</p>

      <div className="text-sm text-gray-600 space-y-1">
        <div>
          <strong>Location:</strong> {location}
        </div>
        <div>
          <strong>Department:</strong> {department}
        </div>
        <div>
          <strong>Raised By:</strong> {isMajor ? "Citizen" : name}
        </div>
        <div>
          <strong>Date:</strong> {dateOfComplaint}
        </div>
        {dateOfResolution && (
          <div>
            <strong>Resolved On:</strong> {dateOfResolution}
          </div>
        )}
      </div>

      {files.length > 0 && (
        <div className="mt-2">
          <strong>Attachments:</strong>
          <ul className="list-disc list-inside text-sm text-gray-600">
            {files.map((f, i) => (
              <li key={i}>{f.name}</li>
            ))}
          </ul>
        </div>
      )}

      {requestReminder && status !== "Resolved" && (
        <div className="mt-4">
          <button
            onClick={() => requestReminder(id)}
            disabled={!canRequestReminder()}
            className={`px-3 py-1 rounded ${
              canRequestReminder()
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Request Reminder
          </button>
          {!canRequestReminder() && (
            <p className="text-xs text-gray-500 mt-1">
              You can request a reminder 15 days after submission.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

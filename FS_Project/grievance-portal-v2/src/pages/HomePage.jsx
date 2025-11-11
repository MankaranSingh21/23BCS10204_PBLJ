// src/pages/HomePage.jsx
import React from "react";
import ActionCard from "../components/ActionCard";
import Step from "../components/Step";
import { useAuth } from "../context/AuthContext";

export default function HomePage() {
  const { user } = useAuth();

  const steps = [
    {
      title: "Register or Login",
      description:
        "Create an account or sign in to raise, track, and manage complaints.",
    },
    {
      title: "Raise Complaint",
      description:
        "Fill out a short form with location, department, and description.",
    },
    {
      title: "Track Progress",
      description:
        "Check updates or send reminders if not resolved within 15 days.",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-6 text-indigo-700">
        Welcome to the Government Grievance Portal
      </h1>

      <p className="text-center text-gray-600 mb-10">
        Empowering citizens to raise issues, ensure accountability, and drive
        transparency in governance.
      </p>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
        <ActionCard
          title="Raise a Complaint"
          description="Submit a new grievance easily with details and attachments."
          to={user ? "/raise" : "/login"}
        />
        <ActionCard
          title="Check Complaint Status"
          description="Track progress of any registered complaint."
          to="/check"
        />
        <ActionCard
          title="View Major Resolved Complaints"
          description="See impactful grievances successfully resolved by authorities."
          to="/major"
        />
      </div>

      <h2 className="text-2xl font-semibold mb-4 text-indigo-600">
        How It Works
      </h2>

      <div className="grid sm:grid-cols-3 gap-6">
        {steps.map((s, i) => (
          <Step key={i} number={i + 1} title={s.title} description={s.description} />
        ))}
      </div>
    </div>
  );
}

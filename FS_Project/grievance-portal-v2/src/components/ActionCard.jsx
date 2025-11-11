// src/components/ActionCard.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function ActionCard({ title, description, to }) {
  return (
    <Link
      to={to}
      className="block border rounded-lg p-6 shadow-sm hover:shadow-md transition bg-white text-gray-800"
    >
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </Link>
  );
}

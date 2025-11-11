// src/components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-center py-4 mt-10 border-t text-sm text-gray-600">
      © {new Date().getFullYear()} Government Grievance Portal. All Rights Reserved.
    </footer>
  );
}

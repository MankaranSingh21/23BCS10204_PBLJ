// src/components/Step.jsx
import React from "react";

export default function Step({ number, title, description }) {
  return (
    <div className="flex items-start space-x-3">
      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-600 text-white font-semibold">
        {number}
      </div>
      <div>
        <h4 className="font-semibold text-gray-800">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}

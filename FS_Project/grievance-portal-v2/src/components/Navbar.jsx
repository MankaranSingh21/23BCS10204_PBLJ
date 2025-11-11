// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const NavLinks = [
    { name: "Home", to: "/", public: true },
    { name: "Raise Complaint", to: "/raise", public: false },
    { name: "My Complaints", to: "/my-complaints", public: false },
    { name: "Major Resolved", to: "/major", public: true },
    { name: "Check Status", to: "/check", public: true },
  ];

  return (
    <header className="flex justify-between items-center px-6 py-4 shadow bg-white sticky top-0 z-50">
      <Link
        to="/"
        className="font-semibold text-lg text-indigo-700 hover:text-indigo-900 flex items-center gap-2"
      >
        🏛️ Grievance Portal
      </Link>

      <nav className="flex gap-4">
        {NavLinks.map((link) => {
          if (!link.public && !user) return null;
          const active = location.pathname === link.to;
          return (
            <Link
              key={link.name}
              to={link.to}
              className={`${
                active ? "text-indigo-700 font-semibold" : "text-gray-700"
              } hover:text-indigo-900 transition`}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="flex gap-3 items-center">
        {user ? (
          <>
            <span className="text-gray-700">Hi, {user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="px-3 py-1 border rounded-md text-gray-700 hover:bg-gray-100 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

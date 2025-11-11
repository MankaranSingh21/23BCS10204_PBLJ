// src/App.jsx
import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useAuth } from "./context/AuthContext";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminDashboard from "./pages/admin/AdminDashboard";

// Lazy load pages for better performance
const HomePage = lazy(() => import("./pages/HomePage"));
const RaiseComplaintPage = lazy(() => import("./pages/RaiseComplaintPage"));
const MajorComplaintsPage = lazy(() => import("./pages/MajorComplaintsPage"));
const MyComplaintsPage = lazy(() => import("./pages/MyComplaintsPage"));
const CheckComplaintPage = lazy(() => import("./pages/CheckComplaintPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));

// 🔒 Protected Route Wrapper (for user dashboard)
function RequireAuth({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// 🔓 Auth pages should redirect logged-in users
function AuthRoute({ children }) {
  const { user } = useAuth();
  if (user) return <Navigate to="/" replace />;
  return children;
}

// 🧠 Admin route guard
function RequireAdmin({ children }) {
  const token = localStorage.getItem("adminToken");
  if (!token) return <Navigate to="/admin/login" replace />;
  return children;
}

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Hide Navbar/Footer on Admin routes if you want a cleaner dashboard */}
      <Navbar />

      <main className="flex-grow py-6">
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-[70vh]">
              <p className="text-gray-600">Loading...</p>
            </div>
          }
        >
          <Routes>
            {/* 🏠 User-facing routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/major" element={<MajorComplaintsPage />} />
            <Route
              path="/raise"
              element={
                <RequireAuth>
                  <RaiseComplaintPage />
                </RequireAuth>
              }
            />
            <Route
              path="/my-complaints"
              element={
                <RequireAuth>
                  <MyComplaintsPage />
                </RequireAuth>
              }
            />
            <Route path="/check" element={<CheckComplaintPage />} />

            {/* 👤 User Auth Routes */}
            <Route
              path="/login"
              element={
                <AuthRoute>
                  <LoginPage />
                </AuthRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <AuthRoute>
                  <SignupPage />
                </AuthRoute>
              }
            />

            {/* 🧑‍💼 Admin Routes */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route
              path="/admin/dashboard"
              element={
                <RequireAdmin>
                  <AdminDashboard />
                </RequireAdmin>
              }
            />

            {/* 🧭 Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}

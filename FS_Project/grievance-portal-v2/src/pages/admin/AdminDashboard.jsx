import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);
  const [toast, setToast] = useState("");
  const token = localStorage.getItem("adminToken");

  // 🧠 Protect route
  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }
    fetchComplaints();
  }, []);

  // 🧾 Fetch all complaints
  const fetchComplaints = async () => {
    try {
      const res = await axios.get("http://localhost:8081/api/admin/complaints", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComplaints(res.data);
    } catch (err) {
      console.error("Failed to fetch complaints:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔄 Update complaint status
  const updateStatus = async (id, newStatus) => {
    setUpdating(id);
    try {
      await axios.put(
        `http://localhost:8081/api/admin/complaints/${id}/status`,
        null,
        {
          params: { status: newStatus },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setToast(`Complaint #${id} marked as "${newStatus}"`);
      fetchComplaints();
      setTimeout(() => setToast(""), 2500);
    } catch (err) {
      console.error("Failed to update status:", err);
      setToast("❌ Failed to update status");
      setTimeout(() => setToast(""), 2500);
    } finally {
      setUpdating(null);
    }
  };

  // 🚪 Logout
  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  // 🎨 Color-coded badges
  const getStatusColor = (status) => {
    switch (status) {
      case "Resolved":
        return "bg-green-100 text-green-700 border-green-300";
      case "In Progress":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      default:
        return "bg-red-100 text-red-700 border-red-300";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh] text-gray-600">
        Loading complaints...
      </div>
    );
  }

  return (
    <div className="relative p-8">
      {/* 🔔 Toast */}
      {toast && (
        <div className="absolute top-5 right-5 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg transition-all">
          {toast}
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">🧑‍💼 Admin Dashboard</h1>
        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-lg border">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-gray-200 text-gray-700 uppercase text-xs">
            <tr>
              <th className="p-3 border">#</th>
              <th className="p-3 border">Title</th>
              <th className="p-3 border">Description</th>
              <th className="p-3 border">User</th>
              <th className="p-3 border">Created At</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Update</th>
            </tr>
          </thead>
          <tbody>
            {complaints.length > 0 ? (
              complaints.map((c) => (
                <tr key={c.id} className="border hover:bg-gray-50 transition">
                  <td className="p-3 border text-gray-600">{c.id}</td>
                  <td className="p-3 border font-medium text-gray-800">
                    {c.title}
                  </td>
                  <td className="p-3 border text-gray-600">
                    {c.description.slice(0, 80)}...
                  </td>
                  <td className="p-3 border text-gray-700">{c.userEmail}</td>
                  <td className="p-3 border text-gray-500">
                    {new Date(c.createdAt).toLocaleString()}
                  </td>
                  <td className="p-3 border">
                    <span
                      className={`px-2 py-1 rounded-full border text-xs font-semibold ${getStatusColor(
                        c.status
                      )}`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="p-3 border">
                    <select
                      disabled={updating === c.id}
                      value={c.status}
                      onChange={(e) => updateStatus(c.id, e.target.value)}
                      className="border rounded-lg px-2 py-1 text-sm focus:ring focus:ring-blue-200 disabled:opacity-50"
                    >
                      <option>Pending</option>
                      <option>In Progress</option>
                      <option>Resolved</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center text-gray-500 py-6 italic"
                >
                  No complaints yet 🎉
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

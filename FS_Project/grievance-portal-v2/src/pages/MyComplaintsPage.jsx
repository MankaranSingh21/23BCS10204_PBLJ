import React, { useEffect, useState } from 'react';
import api from '../api/apiClient';

export default function MyComplaintsPage() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await api.get('/complaints/my');
        setComplaints(res.data);
      } catch (err) {
        setError('Failed to fetch complaints.');
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, []);

  // 🎨 status badge color helper
  const getStatusClass = (status) => {
    switch (status) {
      case 'Resolved':
        return 'bg-green-100 text-green-700';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-red-100 text-red-700';
    }
  };

  if (loading) return <p className="text-center mt-8">Loading your complaints...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">My Complaints</h2>
      {complaints.length === 0 ? (
        <p>No complaints found.</p>
      ) : (
        <div className="space-y-4">
          {complaints.map((c) => (
            <div
              key={c.id}
              className="p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition"
            >
              <h3 className="font-semibold text-lg text-gray-800">{c.title}</h3>
              <p className="text-gray-600 mt-1">{c.description}</p>

              <div className="text-sm text-gray-700 mt-2">
                Status:{' '}
                <span
                  className={`font-semibold px-2 py-1 rounded-full text-xs ${getStatusClass(
                    c.status
                  )}`}
                >
                  {c.status}
                </span>
              </div>

              <div className="text-xs text-gray-400 mt-1">
                Submitted: {new Date(c.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

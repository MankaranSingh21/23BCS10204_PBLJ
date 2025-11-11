import React, { useState } from 'react';
import api from '../api/apiClient';
import { useAuth } from '../context/AuthContext';

export default function RaiseComplaintPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await api.post('/complaints', {
        title,
        description,
        userEmail: user.email
      });
      
      if (response.status === 200 || response.status === 201) {
        setSuccess('Complaint submitted successfully!');
        setTitle('');
        setDescription('');
      }
    } catch (err) {
      console.error('Error submitting complaint:', err);
      setError(err.response?.data?.message || 'Failed to submit complaint. Please try again.');
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-700">
        Please log in to raise a complaint.
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-96"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Raise a Complaint
        </h2>

        <input
          type="text"
          placeholder="Complaint Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded mb-3"
          required
        />

        <textarea
          placeholder="Describe your issue"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded mb-4 h-24"
          required
        ></textarea>

        {success && <p className="text-green-600 text-sm mb-2">{success}</p>}
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit Complaint
        </button>
      </form>
    </div>
  );
}

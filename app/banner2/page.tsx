'use client';

import { useState, useEffect } from 'react';

const ManageCategory = () => {
  const [editFormData, setEditFormData] = useState({ id: '68a8697f7451b9a1c5d4492f', name: '', off: '' });
  const [message, setMessage] = useState('');
  const [editMode, setEditMode] = useState(false);

  // Fetch category by fixed ID
  const fetchCategory = async () => {
    try {
      const res = await fetch(`/api/banner2?id=68a8697f7451b9a1c5d4492f`, { method: 'GET' });
      if (res.ok) {
        const data = await res.json();
        setEditFormData({
          id: data.id,
          name: data.name || '',
          off: data.off || '',
        });
        setEditMode(true);
      } else {
        console.error('Failed to fetch category');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  // Only update allowed
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/banner2?id=68a8697f7451b9a1c5d4492f`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editFormData.name,
          off: editFormData.off,
        }),
      });

      if (res.ok) {
        setMessage('Banner updated successfully!');
        fetchCategory();
      } else {
        const errorData = await res.json();
        setMessage(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred while updating the Banner.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Banner</h1>

      <form onSubmit={handleEditSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            className="border p-2 w-full"
            value={editFormData.name}
            onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block mb-1">Off</label>
          <input
            type="text"
            className="border p-2 w-full"
            value={editFormData.off}
            onChange={(e) => setEditFormData({ ...editFormData, off: e.target.value })}
            required
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Update Banner
        </button>
      </form>

      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default ManageCategory;

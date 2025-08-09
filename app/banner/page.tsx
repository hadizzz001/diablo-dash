'use client';

import { useState, useEffect } from 'react';
import Upload from '../components/Upload';

const ManageCategory = () => {
  const fixedId = '68975dec1b58e4fa69d8be3b';
  const [editFormData, setEditFormData] = useState({ id: fixedId, img: [] });
  const [message, setMessage] = useState('');
  const [img, setImg] = useState([]);

  // Fetch the fixed banner
  const fetchBanner = async () => {
    try {
      const res = await fetch(`/api/banner?id=${fixedId}`);
      if (res.ok) {
        const data = await res.json();
        setEditFormData({ id: fixedId, img: data.img || [] });
        setImg(data.img || []);
      } else {
        console.error('Failed to fetch banner');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchBanner();
  }, []);

  // Patch banner
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/banner?id=${fixedId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ img }),
      });

      if (res.ok) {
        setMessage('Banner updated successfully!');
        fetchBanner();
      } else {
        const errorData = await res.json();
        setMessage(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred while updating the banner.');
    }
  };

  const handleImgChange = (url) => {
    if (url) {
      setImg([url]);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Banner</h1>

      <form onSubmit={handleEditSubmit} className="space-y-4">
        <Upload onFilesUpload={handleImgChange} />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Update banner
        </button>
      </form>

      {message && <p className="mt-4">{message}</p>}

      {img.length > 0 && (
        <div className="mt-4">
          {/\.(mp4|webm|ogg)$/i.test(img[0]) ? (
            <video controls className="w-24 h-auto">
              <source src={img[0]} type="video/mp4" />
            </video>
          ) : (
            <img src={img[0]} alt="Banner" className="w-24 h-auto" />
          )}
        </div>
      )}
    </div>
  );
};

export default ManageCategory;

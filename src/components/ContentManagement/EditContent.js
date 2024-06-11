import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function EditContent() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    // Fetch the existing content data by id and populate the form fields
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your content update logic here
  };

  return (
    <div className="edit-content">
      <h2>Edit Content</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <br />
        <label>
          Content:
          <textarea value={content} onChange={(e) => setContent(e.target.value)} />
        </label>
        <br />
        <button type="submit">Update Content</button>
      </form>
    </div>
  );
}

export default EditContent;

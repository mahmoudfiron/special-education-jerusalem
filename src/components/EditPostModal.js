import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './EditPostModal.css';

const EditPostModal = ({ postId, collectionName, onClose }) => {
  const [mainTitle, setMainTitle] = useState('');
  const [sections, setSections] = useState([{ secondaryTitle: '', text: '', fileUrl: null }]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      const postDoc = await getDoc(doc(db, collectionName, postId));
      if (postDoc.exists()) {
        const postData = postDoc.data();
        setMainTitle(postData.mainTitle);
        setSections(postData.sections);
      }
    };
    fetchPost();
  }, [collectionName, postId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUploading(true);

    const updatedSections = await Promise.all(sections.map(async (section) => {
      let fileUrl = section.fileUrl;
      if (section.file && section.file !== section.fileUrl) {
        if (section.fileUrl) {
          const oldRef = ref(storage, section.fileUrl);
          await deleteObject(oldRef);
        }
        const storageRef = ref(storage, `uploads/${section.file.name}`);
        await uploadBytes(storageRef, section.file);
        fileUrl = await getDownloadURL(storageRef);
      }
      const { file, ...sectionWithoutFile } = section;
      return { ...sectionWithoutFile, fileUrl };
    }));

    const postRef = doc(db, collectionName, postId);
    await updateDoc(postRef, {
      mainTitle,
      sections: updatedSections,
    });

    setUploading(false);
    onClose();
  };

  const handleAddSection = () => {
    setSections([...sections, { secondaryTitle: '', text: '', fileUrl: null }]);
  };

  const handleRemoveSection = (index) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const handleSectionChange = (index, field, value) => {
    const newSections = sections.slice();
    newSections[index][field] = value;
    setSections(newSections);
  };

  return (
    <div className="edit-post-modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Edit Post</h2>
        <form onSubmit={handleUpdate} className="edit-form">
          <input
            type="text"
            value={mainTitle}
            onChange={(e) => setMainTitle(e.target.value)}
            placeholder="Main Title"
            required
            dir="rtl"
          />
          {sections.map((section, index) => (
            <div key={index} className="section">
              <input
                type="text"
                value={section.secondaryTitle}
                onChange={(e) => handleSectionChange(index, 'secondaryTitle', e.target.value)}
                placeholder="Secondary Title"
                dir="rtl"
              />
              <ReactQuill
                value={section.text}
                onChange={(value) => handleSectionChange(index, 'text', value)}
                placeholder="Text"
                dir="rtl"
              />
              {section.fileUrl && (
                <div className="media-container">
                  {section.fileUrl.endsWith('.mp4') ? (
                    <video controls>
                      <source src={section.fileUrl} type="video/mp4" />
                    </video>
                  ) : (
                    <img src={section.fileUrl} alt="Uploaded" className="uploaded-image" />
                  )}
                  <button type="button" onClick={() => handleSectionChange(index, 'fileUrl', null)}>Remove</button>
                </div>
              )}
              <input
                type="file"
                onChange={(e) => handleSectionChange(index, 'file', e.target.files[0])}
              />
              <button type="button" className="remove-section-button" onClick={() => handleRemoveSection(index)}>
                Remove Section
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddSection}>
            Add Section
          </button>
          <button type="submit" disabled={uploading}>
            {uploading ? 'Updating...' : 'Update'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPostModal;

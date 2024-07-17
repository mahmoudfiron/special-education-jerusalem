import React, { useState, useEffect } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db, storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import styles
import './ContentUpload.css';

const ContentUpload = ({ collectionName }) => {
  const [mainTitle, setMainTitle] = useState('');
  const [sections, setSections] = useState([{ secondaryTitle: '', text: '', file: null }]);
  const [uploading, setUploading] = useState(false);
  const [isGuide, setIsGuide] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  useEffect(() => {
    const fetchUserRole = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setIsGuide(userData.role === 'guide');
        }
      }
    };

    fetchUserRole();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) {
      console.log('User not authenticated');
      return;
    }

    setUploading(true);
    const postRef = doc(db, collectionName, new Date().getTime().toString());

    const sectionsWithUrls = await Promise.all(sections.map(async (section) => {
      let fileUrl = '';
      if (section.file) {
        const storageRef = ref(storage, `uploads/${section.file.name}`);
        await uploadBytes(storageRef, section.file);
        fileUrl = await getDownloadURL(storageRef);
      }
      const { file, ...sectionWithoutFile } = section; // Remove the file field
      return { ...sectionWithoutFile, fileUrl };
    }));

    const postData = {
      mainTitle,
      sections: sectionsWithUrls,
      authorId: user.uid,
      timestamp: new Date(),
    };

    await setDoc(postRef, postData);
    setMainTitle('');
    setSections([{ secondaryTitle: '', text: '', file: null }]);
    setUploading(false);
    setShowUpload(false); // Close the upload section
  };

  const handleAddSection = () => {
    setSections([...sections, { secondaryTitle: '', text: '', file: null }]);
  };

  const handleRemoveSection = (index) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const handleSectionChange = (index, field, value) => {
    const newSections = sections.slice();
    newSections[index][field] = value;
    setSections(newSections);
  };

  if (!isGuide) {
    return null; // Do not render the component if the user is not a guide
  }

  return (
    <div className="content-upload2">
      <button onClick={() => setShowUpload(!showUpload)}>
        {showUpload ? 'סגירה' : 'להעלות תוכן'}
      </button>
      {showUpload && (
        <div className="content-upload" dir='rtl'>
          
          <h2>להעלות תוכן</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={mainTitle}
              onChange={(e) => setMainTitle(e.target.value)}
              placeholder="כותרת ראשית"
              required
            />
            {sections.map((section, index) => (
              <div key={index} className="section">
                <input
                  type="text"
                  value={section.secondaryTitle}
                  onChange={(e) => handleSectionChange(index, 'secondaryTitle', e.target.value)}
                  placeholder="כותרת משנית"
                />
                <ReactQuill
                  value={section.text}
                  onChange={(value) => handleSectionChange(index, 'text', value)}
                />
                <input
                  type="file"
                  onChange={(e) => handleSectionChange(index, 'file', e.target.files[0])}
                />
                <button type="button" className="remove-section-button" onClick={() => handleRemoveSection(index)}>
                  הסר סעיף
                </button>
              </div>
            ))}
            <button type="button" onClick={handleAddSection}>
              הוסף סעיף
            </button>
            <button type="submit" disabled={uploading}>
              {uploading ? 'מעלה...' : 'העלה'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ContentUpload;

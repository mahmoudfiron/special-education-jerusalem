import React, { useState, useEffect } from 'react';
import { db, storage, auth } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getDoc, doc } from 'firebase/firestore';
import './ContentUpload.css';

const ContentUpload = () => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserRole = async (uid) => {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUser({ ...userData, uid: uid });
      }
    };

    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        fetchUserRole(currentUser.uid);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file || !description) return;

    try {
      const storageRef = ref(storage, `files/${file.name}`);
      await uploadBytes(storageRef, file);
      const fileUrl = await getDownloadURL(storageRef);

      await addDoc(collection(db, 'posts'), {
        description,
        fileUrl,
        createdAt: serverTimestamp(),
        uid: user.uid,
      });

      setFile(null);
      setDescription('');
      alert('Content uploaded successfully!');
    } catch (error) {
      console.error('Error uploading content:', error.message);
    }
  };

  if (!user || user.role !== 'guide') {
    return <p>You do not have permission to upload content.</p>;
  }

  return (
    <div className="content-upload">
      <h2>Upload Content</h2>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} required />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default ContentUpload;

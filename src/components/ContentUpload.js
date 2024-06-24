import React, { useState } from 'react';
import { getDoc, doc, setDoc } from 'firebase/firestore';
import { auth, db, storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './ContentUpload.css';

const ContentUpload = ({ collectionName }) => {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) {
      console.log('User not authenticated');
      return;
    }

    setUploading(true);
    const postRef = doc(db, collectionName, new Date().getTime().toString());
    let fileUrl = '';

    if (file) {
      const storageRef = ref(storage, `uploads/${file.name}`);
      await uploadBytes(storageRef, file);
      fileUrl = await getDownloadURL(storageRef);
    }

    const postData = {
      text,
      fileUrl,
      authorId: user.uid,
      timestamp: new Date(),
    };

    await setDoc(postRef, postData);
    setText('');
    setFile(null);
    setUploading(false);
  };

  return (
    <div className="content-upload">
      <h2>Upload</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's on your mind?"
        />
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit" disabled={uploading}>
          {uploading ? 'Uploading...' : 'Post'}
        </button>
      </form>
    </div>
  );
};

export default ContentUpload;

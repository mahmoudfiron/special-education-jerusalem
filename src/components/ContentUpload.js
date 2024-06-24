import React, { useState } from 'react';
import { storage, db } from '../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import './ContentUpload.css';

const ContentUpload = () => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) return;

    const storageRef = ref(storage, `uploads/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.error('Upload failed:', error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          addDoc(collection(db, 'posts'), {
            description: description,
            fileUrl: downloadURL,
            createdAt: Timestamp.fromDate(new Date()),
          });
          setFile(null);
          setDescription('');
          setProgress(0);
        });
      }
    );
  };

  return (
    <div className="content-upload">
      <h2>Upload Content</h2>
      <input type="file" onChange={handleFileChange} />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleUpload}>Upload</button>
      {progress > 0 && <progress value={progress} max="100" />}
    </div>
  );
};

export default ContentUpload;

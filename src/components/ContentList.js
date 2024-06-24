import React, { useEffect, useState } from 'react';
import { collection, query, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import './ContentList.css';
import '../Pages/MathHomePage.css';

const ContentList = ({ collectionName }) => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const q = query(collection(db, collectionName));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postsData = [];
      querySnapshot.forEach((doc) => {
        postsData.push({ id: doc.id, ...doc.data() });
      });
      setPosts(postsData);
    });
    return () => unsubscribe();
  }, [collectionName]);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, collectionName, id));
  };

 return (
    <div className="content-list">
      {posts.map((post) => (
        <div key={post.id} className="content-item">
          {post.fileUrl && <img src={post.fileUrl} alt="uploaded" />}
          <p>{post.description}</p>
          {user && (
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ContentList;

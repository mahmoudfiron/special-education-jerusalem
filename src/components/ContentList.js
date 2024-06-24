import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import './ContentList.css';

const ContentList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postsArray = [];
      querySnapshot.forEach((doc) => {
        postsArray.push({ ...doc.data(), id: doc.id });
      });
      setPosts(postsArray);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="content-list">
      {posts.map((post) => (
        <div key={post.id} className="content-item">
          {post.fileUrl && <img src={post.fileUrl} alt="uploaded" />}
          <p>{post.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ContentList;

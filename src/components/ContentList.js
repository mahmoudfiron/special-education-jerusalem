import React, { useEffect, useState } from 'react';
import { collection, query, onSnapshot, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import './ContentList.css';
import '../Pages/MathHomePage.css';

const ContentList = ({ collectionName }) => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const q = query(collection(db, collectionName));
    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      const postsData = [];
      for (const docSnapshot of querySnapshot.docs) {
        const postData = docSnapshot.data();
        const userDoc = await getDoc(doc(db, 'users', postData.authorId));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          postsData.push({ id: docSnapshot.id, ...postData, authorName: `${userData.firstName} ${userData.lastName}` });
        }
      }
      postsData.sort((a, b) => b.timestamp - a.timestamp); // Sort posts by newest first
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
          <div className="post-header">
            <span className="author-name">{post.authorName}</span>
            <span className="post-date">{new Date(post.timestamp.toMillis()).toLocaleDateString()}</span>
          </div>
          <p>{post.text}</p>
          {post.fileUrl && <img src={post.fileUrl} alt="Uploaded" className="uploaded-image" />}
          {user && post.authorId === user.uid && (
            <button onClick={() => handleDelete(post.id)} className="delete-button">Delete</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ContentList;

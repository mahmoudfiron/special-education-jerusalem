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
        <div key={post.id} className="content-item" dir="rtl">
          <div className="post-header">
            <span className="author-name">{post.authorName}</span>
            <span className="post-date">{new Date(post.timestamp.toMillis()).toLocaleDateString()}</span>
          </div>
          <h2>{post.mainTitle}</h2>
          {post.sections.map((section, index) => (
            <div key={index} className="section" dir="rtl">
              {section.secondaryTitle && <h3>{section.secondaryTitle}</h3>}
              {section.fileUrl && (
                <div className="media-container" dir="rtl">
                  {section.fileUrl.endsWith('.mp4') ? (
                    <video controls>
                      <source src={section.fileUrl} type="video/mp4" />
                    </video>
                  ) : (
                    <img src={section.fileUrl} alt="Uploaded" className="uploaded-image" />
                  )}
                </div>
              )}
              <div className="post-content" dangerouslySetInnerHTML={{ __html: section.text }} />
            </div>
          ))}
          {user && post.authorId === user.uid && (
            <button onClick={() => handleDelete(post.id)} className="delete-button">Delete</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ContentList;

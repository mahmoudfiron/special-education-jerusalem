import React, { useEffect, useState } from 'react';
import { collection, query, onSnapshot, deleteDoc, doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db, auth } from '../firebase';
import EditPostModal from './EditPostModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import './ContentList.css';
import '../Pages/MathSection/MathHomePage.css';

const ContentList = ({ collectionName }) => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [expandedPostIds, setExpandedPostIds] = useState([]);
  const [editPostId, setEditPostId] = useState(null);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserRole(userDoc.data().role);
        }
      } else {
        setUser(null);
        setUserRole('');
      }
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

  const toggleExpandPost = (postId) => {
    setExpandedPostIds((prevExpandedPostIds) =>
      prevExpandedPostIds.includes(postId)
        ? prevExpandedPostIds.filter((id) => id !== postId)
        : [...prevExpandedPostIds, postId]
    );
  };

  const handleLike = async (postId) => {
    if (!user) {
      alert('Please sign in to like the post.');
      return;
    }

    const postRef = doc(db, collectionName, postId);
    const postDoc = await getDoc(postRef);
    const postData = postDoc.data();

    if (postData.likes && postData.likes.includes(user.uid)) {
      await updateDoc(postRef, {
        likes: arrayRemove(user.uid)
      });
    } else {
      await updateDoc(postRef, {
        likes: arrayUnion(user.uid),
        dislikes: arrayRemove(user.uid)
      });
    }
  };

  const handleDislike = async (postId) => {
    if (!user) {
      alert('Please sign in to dislike the post.');
      return;
    }

    const postRef = doc(db, collectionName, postId);
    const postDoc = await getDoc(postRef);
    const postData = postDoc.data();

    if (postData.dislikes && postData.dislikes.includes(user.uid)) {
      await updateDoc(postRef, {
        dislikes: arrayRemove(user.uid)
      });
    } else {
      await updateDoc(postRef, {
        dislikes: arrayUnion(user.uid),
        likes: arrayRemove(user.uid)
      });
    }
  };

  const renderText = (text, postId) => {
    const wordLimit = 100;
    const words = text.split(' ');
    const isLongText = words.length > wordLimit;
    const displayText = isLongText && !expandedPostIds.includes(postId)
      ? words.slice(0, wordLimit).join(' ') + '...'
      : text;

    return (
      <div>
        <div className="post-content" dangerouslySetInnerHTML={{ __html: displayText }} />
        {isLongText && (
          <span onClick={() => toggleExpandPost(postId)} className="read-more-label">
            {expandedPostIds.includes(postId) ? 'קרא פחות' : 'קרא עוד'}
          </span>
        )}
      </div>
    );
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
              {renderText(section.text, post.id)}
            </div>
          ))}
          <div className="post-actions">
            {user ? (
              <>
                <button
                  className={`like-button ${post.likes && post.likes.includes(user.uid) ? 'active' : ''}`}
                  onClick={() => handleLike(post.id)}
                >
                  <FontAwesomeIcon icon={faThumbsUp} /> {post.likes ? post.likes.length : 0}
                </button>
                <button
                  className={`dislike-button ${post.dislikes && post.dislikes.includes(user.uid) ? 'active' : ''}`}
                  onClick={() => handleDislike(post.id)}
                >
                  <FontAwesomeIcon icon={faThumbsDown} />
                  {(userRole === 'guide' || userRole === 'admin') && post.dislikes ? ` ${post.dislikes.length}` : ''}
                </button>
              </>
            ) : (
              <>
                <button className="like-button disabled" onClick={() => alert('Please sign in to like the post.')}>
                  <FontAwesomeIcon icon={faThumbsUp} /> {post.likes ? post.likes.length : 0}
                </button>
                <button className="dislike-button disabled" onClick={() => alert('Please sign in to dislike the post.')}>
                  <FontAwesomeIcon icon={faThumbsDown} />
                </button>
              </>
            )}
          </div>
          {(user && post.authorId === user.uid) || userRole === 'admin' ? (
            <div>
              <button onClick={() => handleDelete(post.id)} className="delete-button">מחק</button>
              <button onClick={() => setEditPostId(post.id)} className="edit-button">הערכה</button>
            </div>
          ) : null}
        </div>
      ))}
      {editPostId && (
        <EditPostModal
          postId={editPostId}
          collectionName={collectionName}
          onClose={() => setEditPostId(null)}
        />
      )}
    </div>
  );
};

export default ContentList;

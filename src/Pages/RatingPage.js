import React, { useState, useEffect } from 'react';
import './RatingPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { collection, addDoc, query, onSnapshot, deleteDoc, doc, updateDoc, getDoc } from 'firebase/firestore'; // Ensure getDoc is imported
import { db, auth } from '../firebase';

require('../assets/background.avif');

const RatingPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [currentFeedback, setCurrentFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [visibleFeedbacks, setVisibleFeedbacks] = useState(5);
  const [starCounts, setStarCounts] = useState({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
  const [editingFeedbackId, setEditingFeedbackId] = useState(null);
  const [editingFeedback, setEditingFeedback] = useState('');
  const [currentUserRole, setCurrentUserRole] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'ratings'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const feedbacksData = [];
      const starCountsData = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

      querySnapshot.forEach((doc) => {
        const feedback = doc.data();
        feedbacksData.push({ id: doc.id, ...feedback });
        starCountsData[feedback.stars]++;
      });

      setFeedbacks(feedbacksData);
      setStarCounts(starCountsData);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchUserRole = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid)); // Ensure getDoc is used here
        if (userDoc.exists()) {
          setCurrentUserRole(userDoc.data().role);
        }
      }
    };

    fetchUserRole();
  }, []);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleFeedbackChange = (event) => {
    setCurrentFeedback(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (currentFeedback) {
      const user = auth.currentUser;
      if (!user) {
        alert('Please sign in to rate.');
        return;
      }

      const newFeedback = {
        comment: currentFeedback,
        stars: rating,
        date: new Date().toISOString(),
        userId: user.uid,
        userName: user.displayName,
      };

      await addDoc(collection(db, 'ratings'), newFeedback);
      setCurrentFeedback('');
      setRating(0);
    }
  };

  const loadMoreFeedbacks = () => {
    setVisibleFeedbacks((prevVisible) => prevVisible + 5);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'ratings', id));
  };

  const handleEdit = (id, comment) => {
    setEditingFeedbackId(id);
    setEditingFeedback(comment);
  };

  const handleUpdate = async () => {
    if (editingFeedbackId) {
      await updateDoc(doc(db, 'ratings', editingFeedbackId), {
        comment: editingFeedback,
      });
      setEditingFeedbackId(null);
      setEditingFeedback('');
    }
  };

  const totalRatings = feedbacks.length;
  const calculatePercentage = (count) => (count / totalRatings) * 100;

  return (
    <div className="rating-page">
      <div className="feedback-container">
        <div className="sorting-buttons">
          <button onClick={() => setFeedbacks([...feedbacks].sort((a, b) => new Date(b.date) - new Date(a.date)))}>Newest</button>
          <button onClick={() => setFeedbacks([...feedbacks].sort((a, b) => b.stars - a.stars))}>Highest</button>
          <button onClick={() => setFeedbacks([...feedbacks].sort((a, b) => a.stars - b.stars))}>Lowest</button>
        </div>
        {feedbacks.slice(0, visibleFeedbacks).map((feedback) => (
          <div key={feedback.id} className="feedback-item">
            <div className="feedback-rating">
              {[...Array(feedback.stars)].map((_, i) => (
                <FontAwesomeIcon key={i} icon={faStar} className="star selected" />
              ))}
            </div>
            {editingFeedbackId === feedback.id ? (
              <div>
                <textarea
                  value={editingFeedback}
                  onChange={(e) => setEditingFeedback(e.target.value)}
                  rows="2"
                />
                <button onClick={handleUpdate}>Update</button>
              </div>
            ) : (
              <p>{feedback.comment}</p>
            )}
            <div className="feedback-user">
              <span>{feedback.userName}</span>
              <span>
                {feedback.date
                  ? new Date(feedback.date).toLocaleDateString()
                  : 'No Date'}
              </span>
            </div>
            {auth.currentUser && (
              <>
                {auth.currentUser.uid === feedback.userId && (
                  <button className="edit-button" onClick={() => handleEdit(feedback.id, feedback.comment)}>Edit</button>
                )}
                {(auth.currentUser.uid === feedback.userId || currentUserRole === 'guide') && (
                  <button className="delete-button" onClick={() => handleDelete(feedback.id)}>Delete</button>
                )}
              </>
            )}
          </div>
        ))}
        {visibleFeedbacks < feedbacks.length && (
          <button className="read-more" onClick={loadMoreFeedbacks}>
            קרא עוד
          </button>
        )}
      </div>
      <div className="rating-container">
        <h2>דרגו אותנו</h2>
        <form onSubmit={handleFormSubmit} className="rating-form">
          <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <FontAwesomeIcon
                key={star}
                icon={faStar}
                className={star <= rating ? 'star selected' : 'star'}
                onClick={() => handleRatingChange(star)}
              />
            ))}
          </div>
          <textarea
            value={currentFeedback}
            onChange={handleFeedbackChange}
            placeholder="כתבו את המשוב שלכם כאן"
            rows="4"
          />
          <button type="submit">שלח</button>
        </form>
        <div className="star-percentages">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="star-percentage">
              <span className="star-count">{star}</span>
              <div className="percentage-bar">
                <div className="filled-bar" style={{ width: `${calculatePercentage(starCounts[star])}%` }}></div>
              </div>
              <span className="percentage-text">{calculatePercentage(starCounts[star]).toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RatingPage;

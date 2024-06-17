import React, { useState } from 'react';
import './RatingPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const RatingPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [currentFeedback, setCurrentFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [visibleFeedbacks, setVisibleFeedbacks] = useState(5);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleFeedbackChange = (event) => {
    setCurrentFeedback(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (currentFeedback) {
      const newFeedback = {
        comment: currentFeedback,
        stars: rating,
      };
      setFeedbacks([newFeedback, ...feedbacks]);
      setCurrentFeedback('');
      setRating(0);
    }
  };

  const loadMoreFeedbacks = () => {
    setVisibleFeedbacks((prevVisible) => prevVisible + 5);
  };

  return (
    <div className="rating-page">
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
      </div>
      <div className="feedback-container">
        {feedbacks.slice(0, visibleFeedbacks).map((feedback, index) => (
          <div key={index} className="feedback-item">
            <div className="feedback-rating">
              {[...Array(feedback.stars)].map((_, i) => (
                <FontAwesomeIcon key={i} icon={faStar} className="star selected" />
              ))}
            </div>
            <p>{feedback.comment}</p>
          </div>
        ))}
{visibleFeedbacks < feedbacks.length && (
        <button className="read-more" onClick={loadMoreFeedbacks}>
          קרא עוד
        </button>
      )}
        
      </div>
      
    </div>
  );
};

export default RatingPage;

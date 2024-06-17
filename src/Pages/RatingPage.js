import React, { useState } from 'react';
import './RatingPage.css';

const RatingPage = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [feedbackList, setFeedbackList] = useState([]);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newFeedback = { rating, feedback };
    setFeedbackList([newFeedback, ...feedbackList]);
    setRating(0);
    setFeedback('');
  };

  return (
    <div className="rating-page">
      <div className="rating-container">
        <h2>דרגו אותנו</h2>
        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${rating >= star ? 'selected' : ''}`}
              onClick={() => handleRatingChange(star)}
            >
              ★
            </span>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="feedback">משוב:</label>
            <textarea
              id="feedback"
              value={feedback}
              onChange={handleFeedbackChange}
              rows="5"
              required
            ></textarea>
          </div>
          <button type="submit">שלח</button>
        </form>
        </div>
        <div className="feedback-container">

        
        <div className="feedback-list">
          {feedbackList.map((item, index) => (
            <div key={index} className="feedback-item">
              <div className="feedback-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className={`star ${item.rating >= star ? 'selected' : ''}`}>
                    ★
                  </span>
                ))}
              </div>
              <p>{item.feedback}</p>
            </div>
          ))}
        </div>
        </div>
    </div>
  );
};

export default RatingPage;

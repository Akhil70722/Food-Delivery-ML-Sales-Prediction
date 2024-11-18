import React, { useState } from 'react';
import './FeedbackResponse.css';

const FeedbackResponse = () => {
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle the feedback submission here (e.g., send it to a server)
    setSubmitted(true);
    setFeedback('');
  };

  return (
    <div className="feedback-container">
      <h2>Feedback</h2>
      {submitted ? (
        <div className="response-message">
          <p>Thank you for your feedback!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Enter your feedback here"
            required
          />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default FeedbackResponse;

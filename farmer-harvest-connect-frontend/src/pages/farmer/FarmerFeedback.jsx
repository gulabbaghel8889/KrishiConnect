import { useState } from 'react';
import toast from 'react-hot-toast';
import { PageHeader, Button } from '../../components/common/UI';

export default function FarmerFeedback() {
  const [feedback, setFeedback] = useState('');
  const [reviews, setReviews] = useState([]);

  const submitFeedback = (e) => {
    e.preventDefault();

    if (!feedback.trim()) {
      toast.error('Please enter feedback');
      return;
    }

    setReviews((prev) => [...prev, feedback]);
    setFeedback('');
    toast.success('Feedback submitted successfully');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Feedback"
        subtitle="Share your experience with buyers and service providers."
      />

      <form onSubmit={submitFeedback} className="card space-y-4">
        <textarea
          className="form-input resize-none"
          rows={5}
          placeholder="Write your feedback here..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />

        <Button type="submit">
          Submit Feedback
        </Button>
      </form>

      {reviews.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-bold text-gray-800">
            Previous Feedback
          </h3>

          {reviews.map((review, index) => (
            <div key={index} className="card">
              {review}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
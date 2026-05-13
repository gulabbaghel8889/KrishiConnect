import { useState } from 'react';
import toast from 'react-hot-toast';
import { PageHeader, Button } from '../../components/common/UI';

export default function BuyerReviews() {
  const [review, setReview] = useState('');

  const submitReview = () => {
    if (!review.trim()) {
      toast.error('Enter review');
      return;
    }

    toast.success('Review submitted');
    setReview('');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reviews"
        subtitle="Rate farmers and services."
      />

      <div className="card space-y-4">
        <textarea
          className="form-input"
          rows={5}
          placeholder="Write your review..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />

        <Button onClick={submitReview}>
          Submit Review
        </Button>
      </div>
    </div>
  );
}
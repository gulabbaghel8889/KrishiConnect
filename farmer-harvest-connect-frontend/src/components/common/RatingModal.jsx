import { useState } from 'react';
import { Modal, Button } from './UI';
import toast from 'react-hot-toast';
import { HiStar } from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';
import { API_URL as API_BASE } from '../../config';

export default function RatingModal({ open, onClose, targetId, targetType, purchaseId, cropId, title }) {
  const { token } = useAuth();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let url = `${API_BASE}/feedback`;
      let body = {
        rating,
        comment,
        referenceType: 'purchase',
        referenceId: purchaseId
      };

      if (targetType === 'user') {
        body.toUser = targetId;
      } else if (targetType === 'crop') {
        url = `${API_BASE}/reviews/add`;
        body.cropId = cropId;
        body.purchaseId = purchaseId;
      }

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });

      const data = await res.json();
      if (data.success) {
        toast.success('Rating submitted successfully!');
        onClose();
      } else {
        toast.error(data.message || 'Failed to submit rating');
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title={title}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col items-center gap-4">
          <p className="text-gray-500 text-sm">How was your experience?</p>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`text-4xl transition-colors ${
                  star <= rating ? 'text-yellow-400' : 'text-gray-200'
                }`}
              >
                <HiStar />
              </button>
            ))}
          </div>
          <span className="font-bold text-gray-700">
            {rating === 5 ? 'Excellent' : rating === 4 ? 'Very Good' : rating === 3 ? 'Good' : rating === 2 ? 'Fair' : 'Poor'}
          </span>
        </div>

        <div className="space-y-2">
          <label className="form-label">Write a brief comment (optional)</label>
          <textarea
            className="form-input min-h-[100px] resize-none"
            placeholder="Tell us more about the quality, delivery, etc."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <Button type="submit" loading={loading} className="w-full py-4 text-lg">
          Submit Rating
        </Button>
      </form>
    </Modal>
  );
}

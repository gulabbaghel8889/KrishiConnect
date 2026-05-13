import { useState } from 'react';
import toast from 'react-hot-toast';
import { PageHeader, Button } from '../../components/common/UI';

export default function ProviderFeedback() {
  const [feedback, setFeedback] = useState('');

  const submit = (e) => {
    e.preventDefault();

    if (!feedback.trim()) {
      toast.error('Enter feedback');
      return;
    }

    toast.success('Feedback submitted');
    setFeedback('');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Feedback"
        subtitle="Share your experience."
      />

      <form onSubmit={submit} className="card space-y-4">
        <textarea
          className="form-input"
          rows={5}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />

        <Button type="submit">
          Submit Feedback
        </Button>
      </form>
    </div>
  );
}
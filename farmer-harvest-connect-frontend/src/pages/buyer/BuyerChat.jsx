import { useState } from 'react';
import { PageHeader, Button } from '../../components/common/UI';
import toast from 'react-hot-toast';

const INITIAL_CHATS = [
  {
    id: 1,
    farmer: 'Ramesh Patel',
    message: 'Wheat stock available',
  },
  {
    id: 2,
    farmer: 'Suresh Yadav',
    message: 'Can offer discount for bulk purchase',
  },
];

export default function BuyerChat() {
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    if (!message.trim()) {
      toast.error('Enter a message');
      return;
    }

    toast.success('Message sent');
    setMessage('');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Chat"
        subtitle="Communicate with farmers."
      />

      <div className="space-y-4">
        {INITIAL_CHATS.map((chat) => (
          <div key={chat.id} className="card">
            <p className="font-bold">{chat.farmer}</p>
            <p className="text-gray-600">{chat.message}</p>
          </div>
        ))}
      </div>

      <div className="card space-y-4">
        <textarea
          className="form-input"
          rows={4}
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <Button onClick={sendMessage}>
          Send Message
        </Button>
      </div>
    </div>
  );
}
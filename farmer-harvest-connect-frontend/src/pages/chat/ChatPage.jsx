import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  // TEMP IDs
  const senderId = 'B6a044c0b381b8afb3fd2f30a';
  const receiverId = '6a042304bda97b782fe02b70';

  useEffect(() => {
    socket.emit('joinRoom', senderId);

    fetchMessages();

    socket.on('receiveMessage', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  const fetchMessages = async () => {
    const res = await fetch(
      `http://localhost:5000/api/messages?user1=${senderId}&user2=${receiverId}`
    );

    const data = await res.json();

    if (data.success) {
      setMessages(data.messages);
    }
  };

  const sendMessage = async () => {
    if (!text.trim()) return;

    const payload = {
      senderId,
      receiverId,
      senderRole: 'buyer',
      message: text,
    };

    await fetch('http://localhost:5000/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    socket.emit('sendMessage', payload);

    setMessages((prev) => [...prev, payload]);
    setText('');
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        Chat
      </h1>

      <div className="border rounded-lg h-96 overflow-y-auto p-4 space-y-2 bg-white">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg max-w-xs ${
              msg.senderId === senderId
                ? 'ml-auto bg-green-100'
                : 'bg-gray-100'
            }`}
          >
            {msg.message}
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-4">
        <input
          value={text}
          onChange={(e) =>
            setText(e.target.value)
          }
          placeholder="Type message..."
          className="flex-1 border rounded-lg px-4 py-2"
        />

        <button
          onClick={sendMessage}
          className="bg-green-600 text-white px-6 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}
import { useState, useEffect, useRef } from 'react';
import { Modal, Button } from './UI';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { HiOutlinePaperAirplane, HiOutlineChatAlt2 } from 'react-icons/hi';
import io from 'socket.io-client';

const API_BASE = 'http://localhost:5001/api';
const SOCKET_URL = 'http://localhost:5001';

export default function ChatModal({ open, onClose, otherUserId, cropId, cropName, otherUserName }) {
  const { token, user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const socketRef = useRef();
  const scrollRef = useRef();

  // Socket setup
  useEffect(() => {
    if (!token || !open) return;

    socketRef.current = io(SOCKET_URL);
    socketRef.current.emit('joinRoom', user._id);

    socketRef.current.on('receiveMessage', (data) => {
      if (data.cropId === cropId && (data.senderId === otherUserId || data.receiverId === otherUserId)) {
        setMessages((prev) => [...prev, data]);
      }
    });

    return () => {
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, [token, open, user._id, cropId, otherUserId]);

  // Fetch history
  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/messages?otherUserId=${otherUserId}&cropId=${cropId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setMessages(data.messages);
      }
    } catch (error) {
      toast.error('Failed to load chat history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open && otherUserId && cropId) {
      fetchMessages();
    }
  }, [open, otherUserId, cropId]);

  // Scroll to bottom
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const messageData = {
      receiverId: otherUserId,
      cropId,
      message: newMessage,
      senderId: user._id,
      senderRole: user.role,
      createdAt: new Date().toISOString()
    };

    try {
      // Optimistic update
      setMessages((prev) => [...prev, messageData]);
      setNewMessage('');

      // Emit via socket
      socketRef.current.emit('sendMessage', messageData);

      // Save to DB
      await fetch(`${API_BASE}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          receiverId: otherUserId,
          cropId,
          message: messageData.message
        }),
      });
    } catch (error) {
      toast.error('Failed to send message');
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`Chat with ${otherUserName || 'User'}`}
      width="max-w-md"
    >
      <div className="flex flex-col h-[500px]">
        {/* Header Info */}
        <div className="px-4 py-2 bg-forest-50 border-b border-forest-100 flex items-center gap-2 mb-4 rounded-xl">
           <HiOutlineChatAlt2 className="text-forest-600" />
           <span className="text-xs font-bold text-forest-800 uppercase tracking-wider">Topic: {cropName}</span>
        </div>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar pb-4">
          {loading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-forest-600"></div>
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center py-20 text-gray-400 italic text-sm">
              No messages yet. Start the conversation!
            </div>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.senderId === user._id ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
                    msg.senderId === user._id
                      ? 'bg-forest-600 text-white rounded-tr-none shadow-lg shadow-forest-100'
                      : 'bg-gray-100 text-gray-800 rounded-tl-none border border-gray-200'
                  }`}
                >
                  <p>{msg.message}</p>
                  <p className={`text-[10px] mt-1 opacity-60 ${msg.senderId === user._id ? 'text-right' : 'text-left'}`}>
                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))
          )}
          <div ref={scrollRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSend} className="mt-4 flex gap-2">
          <input
            type="text"
            className="form-input flex-1 bg-gray-50 border-gray-200 focus:bg-white transition-all rounded-xl py-3"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            type="submit"
            className="w-12 h-12 rounded-xl bg-forest-600 text-white flex items-center justify-center hover:bg-forest-700 transition-colors shadow-lg shadow-forest-100 disabled:opacity-50"
            disabled={!newMessage.trim()}
          >
            <HiOutlinePaperAirplane className="w-6 h-6 rotate-45" />
          </button>
        </form>
      </div>
    </Modal>
  );
}

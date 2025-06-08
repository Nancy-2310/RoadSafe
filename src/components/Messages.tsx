import React, { useState } from 'react';
import { FaPaperPlane, FaSearch, FaEllipsisV, FaPaperclip, FaSmile } from 'react-icons/fa';

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

interface Chat {
  id: number;
  name: string;
  role: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  avatar: string;
}

const Messages: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [message, setMessage] = useState('');

  const chats: Chat[] = [
    {
      id: 1,
      name: 'John Smith',
      role: 'Reviewer',
      lastMessage: 'Please provide additional details for case #123',
      timestamp: '10:30 AM',
      unread: 2,
      avatar: 'JS'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      role: 'Administrator',
      lastMessage: 'Your report has been approved',
      timestamp: 'Yesterday',
      unread: 0,
      avatar: 'SJ'
    },
    {
      id: 3,
      name: 'Mike Wilson',
      role: 'Case Manager',
      lastMessage: 'New case assigned to you',
      timestamp: '2 days ago',
      unread: 1,
      avatar: 'MW'
    }
  ];

  const messages: Message[] = [
    {
      id: 1,
      sender: 'John Smith',
      content: 'Hello, I need some clarification about the accident report.',
      timestamp: '10:30 AM',
      isRead: true
    },
    {
      id: 2,
      sender: 'You',
      content: 'Sure, what would you like to know?',
      timestamp: '10:31 AM',
      isRead: true
    },
    {
      id: 3,
      sender: 'John Smith',
      content: 'Please provide additional details for case #123',
      timestamp: '10:32 AM',
      isRead: false
    }
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // Handle sending message
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <div className="messages-container">
      <div className="messages-sidebar">
        <div className="messages-header">
          <h2>Messages</h2>
          <div className="search-box">
            <FaSearch />
            <input type="text" placeholder="Search messages..." />
          </div>
        </div>

        <div className="chats-list">
          {chats.map(chat => (
            <div
              key={chat.id}
              className={`chat-item ${selectedChat === chat.id ? 'active' : ''}`}
              onClick={() => setSelectedChat(chat.id)}
            >
              <div className="chat-avatar">{chat.avatar}</div>
              <div className="chat-info">
                <div className="chat-header">
                  <h4>{chat.name}</h4>
                  <span className="chat-time">{chat.timestamp}</span>
                </div>
                <div className="chat-preview">
                  <p>{chat.lastMessage}</p>
                  {chat.unread > 0 && (
                    <span className="unread-badge">{chat.unread}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="messages-content">
        {selectedChat ? (
          <>
            <div className="chat-header">
              <div className="chat-user-info">
                <div className="chat-avatar">
                  {chats.find(chat => chat.id === selectedChat)?.avatar}
                </div>
                <div>
                  <h3>{chats.find(chat => chat.id === selectedChat)?.name}</h3>
                  <span className="user-role">
                    {chats.find(chat => chat.id === selectedChat)?.role}
                  </span>
                </div>
              </div>
              <button className="btn-icon">
                <FaEllipsisV />
              </button>
            </div>

            <div className="messages-list">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`message ${msg.sender === 'You' ? 'sent' : 'received'}`}
                >
                  <div className="message-content">
                    <p>{msg.content}</p>
                    <span className="message-time">{msg.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="message-input">
              <button type="button" className="btn-icon">
                <FaPaperclip />
              </button>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
              />
              <button type="button" className="btn-icon">
                <FaSmile />
              </button>
              <button type="submit" className="btn-icon send">
                <FaPaperPlane />
              </button>
            </form>
          </>
        ) : (
          <div className="no-chat-selected">
            <h3>Select a conversation to start messaging</h3>
            <p>Choose from your existing conversations or start a new one</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages; 
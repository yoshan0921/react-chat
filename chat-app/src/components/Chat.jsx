import { useEffect, useState, useRef } from 'react'
import Message from './Message'

// Server side endpoint
const API_ROOT = 'http://localhost:3001';

const Chat = () => {
  const [jsonData, setJsonData] = useState({ messages: [] }); // JSON data from messages.json (from server)
  const [yourName, setYourName] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null); // For chat area scrolling

  useEffect(() => {
    const readMessageList = async() => {
      try {
        const response = await fetch(`${API_ROOT}/messages`);
        if (!response.ok) {
          throw new Error(`JSON Server error: ${response.status}`);
        }
        const data = await response.json();
        setJsonData(data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    // Initial message retrieval
    readMessageList();

    // Fetch messages every 1 second
    // NOTE: I considered multiple users use the chat app simultaneously.
    // The user can see the new messages from the others in real-time without refreshing the page.
    // This is not the best way to do this, but it's a simple way to demonstrate real-time chat as MVP version.
    const intervalId = setInterval(() => {
      readMessageList();
    }, 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Scroll to the bottom of the chat area when a new message is added
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [jsonData]);

  // Update messages state and json file
  const handleSendMessage = async() => {
    // If the new message include only whitespace, do nothing
    if (newMessage.trim()) {
      const newMessageObj = {
        user: yourName ? yourName : 'Anonymous',
        text: newMessage,
        // Use the browser's locale
        time: new Date().toLocaleString(undefined, {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        })
      };

      try {
        const response = await fetch(`${API_ROOT}/messages`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newMessageObj),
        });

        // Check if the response is successful
        if (!response.ok) {
          throw new Error(`JSON Server error: ${response.status}`);
        }
        const result = await response.json();
        console.log('New message added successfully', result);

        // Clear the new message input
        setNewMessage('');

      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleClearMessages = () => {
    setNewMessage('');
  };

  return (
    <div className="chatContainer">
      <h1>Chat App</h1>

      {/* Rendering past messages */}
      <div className="messagesContainer">
        {jsonData?.messages?.map((message, index) => (
          <Message key={index} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Entering a new message */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
      >
        <div className="nameContainer">
          <label 
            className="yourNameLabel"
            htmlFor="name"
          >
            Your Name:
          </label>
          <input 
            className="yourNameInput"
            type="text" 
            id="name" 
            name="name" 
            placeholder="Please enter your name"
            onChange={(e) => setYourName(e.target.value)}
          />
        </div>
        <div className="inputContainer">
          <input 
            className="newMessage"
            type="text"
            placeholder="Type a message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />      
          <button type="submit">
            Send
          </button>
          <button type="button" onClick={handleClearMessages}>
            Clear
          </button>
        </div>
      </form>
    </div>
  )
}

export default Chat
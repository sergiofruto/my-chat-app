import { useEffect, useState, useRef } from 'react';
import { useSocket } from '@/context/SocketContext';
import ChatBody from '@/components/ChatBody';
import ChatFooter from '@/components/ChatFooter';

const ChatWindow = () => {
  const socket = useSocket();
  const [messages, setMessages] = useState([]);
  const lastMessageRef = useRef(null);

  useEffect(() => {
    socket.on('messageResponse', (data) => setMessages([...messages, data]));
  }, [socket, messages]);

  useEffect(() => {
    //scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat">
      {/* <ChatBar socket={socket} /> */}
      <div className="chat__main">
        <ChatBody messages={messages} lastMessageRef={lastMessageRef} />
        <ChatFooter socket={socket} />
      </div>
    </div>
  );
};

export default ChatWindow;

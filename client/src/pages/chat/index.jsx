import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@/context/UserContext';
import ChatWindow from '@/components/ChatWindow';

const Chat = () => {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (!user.loggedIn) {
      router.push('/');
    }
  }, [user, router]);

  return (
    <>
      <ChatWindow />
    </>
  );
};

export default Chat;

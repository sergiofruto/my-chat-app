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
    <div className=" bg-gray-200">
      <div className='container max-w-5xl mx-auto rounded-2xl'>
        <ChatWindow />
      </div>
    </div>
  );
};

export default Chat;

import { useRouter } from 'next/router';
import { useUser } from '@/context/UserContext';

const ChatBody = ({messages, lastMessageRef}) => {
  const router = useRouter();
  const { user, logoutUser } = useUser();


  const handleLeaveChat = () => {
    logoutUser();
    router.push('/');
  };

  return (
    <>
      <header className="chat__mainHeader">
        <div class="flex flex-row items-center justify-center h-12">
          <div
            class="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-8 w-8"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                strokeWidth="2"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              ></path>
            </svg>
          </div>
          <div class="ml-2 font-bold text-lg">ChatApp</div>
        </div>
        <div class="flex items-center justify-center">
          <span className="green-dot mr-2">
            <svg
              class="w-3 h-3 text-green-500 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="10" cy="10" r="10" />
            </svg>
          </span>
          <span className="flex mr-4">
            {/* {localStorage.getItem('userName')} */}
            {user.username}
          </span>
          <button className="flex items-center justify-center bg-red-600 hover:bg-red-800 rounded-xl text-white px-4 py-1 flex-shrink-0" onClick={handleLeaveChat}>
            Log out
          </button>
        </div>
      </header>
      <div className="message__container bg-gray-100">
        {messages.map((message) =>
          message.name === localStorage.getItem('userName') ? (
            <div className="message__chats" key={message.id}>
              <div className="flex items-center justify-start flex-row-reverse">
                <span className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0 text-white">
                  {message.name.charAt(0).toUpperCase()}
                </span>
                <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                  <p>{message.text}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="message__chats" key={message.id}>
              <div className="flex flex-row items-center">
                <span className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-300 flex-shrink-0 text-white">
                  {message.name.charAt(0).toUpperCase()}
                </span>
                <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                  <p>{message.text}</p>
                </div>
              </div>
            </div>
          )
        )}
        <div ref={lastMessageRef} />
      </div>
    </>
  );
};

export default ChatBody;

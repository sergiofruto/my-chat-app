import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@/context/UserContext';
import { useSocket } from '@/context/SocketContext';

const LoginForm = () => {
  const router = useRouter();
  const socket = useSocket();
  const { loginUser } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      // Handle login
      if (response.ok) {
        const data = await response.json();
        console.log('User logged in successfully:', data);
        setError(null);
        loginUser(username);
        socket.emit('newUser', { username, socketID: socket.id });
        router.push('/chat');
      } else {
        console.error('Login error:', response.statusText);
        setError('Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Login error:', err.message);
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div>
      <div className="relative mb-4">
        <label htmlFor="username" className="leading-7 text-sm text-gray-600">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"

        />
      </div>
      <div className="relative mb-4">
        <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"

        />
      </div>
      <button onClick={handleLogin} className="w-full text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Login</button>
      <p className="text-xs text-gray-500 mt-3">
        Don’t have an account yet?{" "}
        <Link
          href="/registration"
          className="font-medium text-blue-500 hover:underline"
        >
          Sign up
        </Link>
      </p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default LoginForm;

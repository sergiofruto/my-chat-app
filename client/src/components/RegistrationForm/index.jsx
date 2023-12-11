import { useState } from 'react';
import Link from 'next/link';

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleRegister = async () => {
    if (!username.trim() || !password.trim()) {
      setError('Username and password are required');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log('User registered successfully:', data);
      setError(null);
    } catch (err) {
      console.error('Registration error:', err.message);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div>
      {/* <h2>Registration Form</h2> */}
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
      {error && <p className="text-xs my-2 text-red-500">{error}</p>}
      <button onClick={handleRegister} className="w-full text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
        Register
      </button>
      <p className="text-xs text-gray-500 mt-3">
        Already have an account?{" "}
        <Link href="/" className="font-medium text-blue-500 hover:underline">
          Go to Login
        </Link>
      </p>
    </div>
  );
};

export default RegistrationForm;

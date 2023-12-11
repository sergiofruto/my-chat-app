import { useState } from "react";
import { useRouter } from "next/router";

const Login = ({ socket }) => {
  const router = useRouter();
  const [userName, setUserName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userName", userName);
    socket.emit('newUser', { userName, socketID: socket.id });
    router.push("/chat");
  };

  return (
    <form className="home__container" onSubmit={handleSubmit}>
      <h2 className="home__header">Sign in to Open Chat</h2>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        minLength={4}
        name="username"
        id="username"
        className="username__input"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button type="submit" className="home__cta">
        SIGN IN
      </button>
    </form>
  );
};

export default Login;

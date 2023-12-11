import LoginForm from "@/components/LoginForm";
import Login from "@/components/Login";
import RegistrationForm from "@/components/RegistrationForm";
import { useSocket } from '@/context/SocketContext';

const Homepage = () => {
  const socket = useSocket();
  return (
    <>
      <h1>Welcome to the ChatApp</h1>
      {/* <Login socket={socket}></Login> */}
      <LoginForm socket={socket}></LoginForm>
      <RegistrationForm socket={socket}></RegistrationForm>
    </>
  );
}
 
export default Homepage;
import SlidingAuth from "../components/SlidingAuth";
import { Toaster } from "react-hot-toast";

export default function Login() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <SlidingAuth initialMode="login" />
    </>
  );
}

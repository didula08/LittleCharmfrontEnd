import SlidingAuth from "../components/SlidingAuth";
import { Toaster } from "react-hot-toast";

export default function SignUp() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <SlidingAuth initialMode="register" />
    </>
  );
}

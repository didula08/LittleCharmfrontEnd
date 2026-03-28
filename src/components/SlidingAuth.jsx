import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaFacebookF, FaGoogle, FaLinkedinIn } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function SlidingAuth({ initialMode = "login" }) {
  const [isLogin, setIsLogin] = useState(initialMode === "login");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Form states
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({ firstName: "", lastName: "", email: "", password: "" });

  useEffect(() => {
    setIsLogin(initialMode === "login");
  }, [initialMode]);

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      toast.error("Please fill in all fields");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "/Users/login", loginData);
      toast.success("Login successful!");
      localStorage.setItem("token", response.data.token);
      setTimeout(() => {
        if (response.data.role?.toLowerCase() === "admin") {
          navigate("/admin");
        } else {
          window.location.href = "/";
        }
      }, 500);
    } catch (err) {
      toast.error("Login failed: " + (err.response?.data?.message || err.message));
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!registerData.firstName || !registerData.lastName || !registerData.email || !registerData.password) {
      toast.error("Please fill in all fields");
      return;
    }
    setIsLoading(true);
    try {
      await axios.post(import.meta.env.VITE_BACKEND_URL + "/Users/", registerData);
      toast.success("Registration successful!");
      setTimeout(() => toggleMode(), 1000);
    } catch (err) {
      toast.error("Registration failed: " + (err.response?.data?.message || err.message));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f5f7] relative flex flex-col justify-center items-center font-['Outfit'] py-10 px-4 overflow-hidden">
      {/* Attractive Animated Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-accent/20 rounded-full blur-[80px] animate-blob" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[80px] animate-blob animation-delay-2000" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-lite/30 rounded-full blur-[60px] animate-blob animation-delay-4000" />
        
        {/* Subtle Decorative Shapes */}
        <svg className="absolute top-10 left-10 w-20 h-20 text-secondary/10 animate-spin-slow" viewBox="0 0 100 100">
          <path d="M50 0 L100 50 L50 100 L0 50 Z" fill="currentColor" />
        </svg>
        <svg className="absolute bottom-20 right-20 w-32 h-32 text-accent/10 animate-bounce-subtle" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="currentColor" />
        </svg>
      </div>

      <div className="relative z-10 overflow-hidden w-full max-w-[800px] min-h-[550px] bg-white/80 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl">
        
        {/* Sign Up Container */}
        <div className={`absolute top-0 h-full transition-all duration-700 ease-in-out left-0 w-1/2 opacity-0 z-1 ${!isLogin ? "translate-x-full opacity-100 z-5 animate-show" : ""}`}>
          <form onSubmit={handleRegister} className="bg-white flex items-center justify-center flex-col px-10 h-full text-center">
            <div className="w-16 h-16 bg-[url('/logo1.png')] bg-contain bg-no-repeat bg-center mb-2" />
            <h1 className="text-3xl font-bold text-secondary mb-2">Create Account</h1>
            <div className="flex my-4">
              <SocialIcon icon={<FaFacebookF />} />
              <SocialIcon icon={<FaGoogle />} />
              <SocialIcon icon={<FaLinkedinIn />} />
            </div>
            <span className="text-xs text-gray-500 mb-4 font-medium uppercase tracking-wider">or use your email for registration</span>
            
            <div className="w-full space-y-3">
              <AuthInput 
                placeholder="First Name" 
                value={registerData.firstName} 
                onChange={(e) => setRegisterData({...registerData, firstName: e.target.value})} 
              />
              <AuthInput 
                placeholder="Last Name" 
                value={registerData.lastName} 
                onChange={(e) => setRegisterData({...registerData, lastName: e.target.value})} 
              />
              <AuthInput 
                type="email" 
                placeholder="Email" 
                value={registerData.email} 
                onChange={(e) => setRegisterData({...registerData, email: e.target.value})} 
              />
              <AuthInput 
                type="password" 
                placeholder="Password" 
                value={registerData.password} 
                onChange={(e) => setRegisterData({...registerData, password: e.target.value})} 
              />
            </div>
            
            <button 
              disabled={isLoading}
              className="mt-6 rounded-full border border-secondary bg-secondary text-white text-xs font-bold py-3 px-12 tracking-wider uppercase transition-transform active:scale-95 hover:bg-lite hover:text-primary hover:border-lite disabled:opacity-50"
            >
              Sign Up
            </button>
          </form>
        </div>

        {/* Sign In Container */}
        <div className={`absolute top-0 h-full transition-all duration-700 ease-in-out left-0 w-1/2 z-2 ${!isLogin ? "translate-x-full" : ""}`}>
          <form onSubmit={handleLogin} className="bg-white flex items-center justify-center flex-col px-10 h-full text-center">
            <div className="w-16 h-16 bg-[url('/logo1.png')] bg-contain bg-no-repeat bg-center mb-2" />
            <h1 className="text-3xl font-bold text-secondary mb-2">Sign in</h1>
            <div className="flex my-4">
              <SocialIcon icon={<FaFacebookF />} />
              <SocialIcon icon={<FaGoogle />} />
              <SocialIcon icon={<FaLinkedinIn />} />
            </div>
            <span className="text-xs text-gray-500 mb-4 font-medium uppercase tracking-wider">or use your account</span>
            
            <div className="w-full space-y-3">
              <AuthInput 
                type="email" 
                placeholder="Email" 
                value={loginData.email} 
                onChange={(e) => setLoginData({...loginData, email: e.target.value})} 
              />
              <AuthInput 
                type="password" 
                placeholder="Password" 
                value={loginData.password} 
                onChange={(e) => setLoginData({...loginData, password: e.target.value})} 
              />
            </div>
            
            <a href="#" className="text-sm text-gray-600 my-4 hover:text-secondary transition-colors underline-offset-4 hover:underline">Forgot your password?</a>
            
            <button 
              disabled={isLoading}
              className="rounded-full border border-secondary bg-secondary text-white text-xs font-bold py-3 px-12 tracking-wider uppercase transition-transform active:scale-95 hover:bg-lite hover:text-primary hover:border-lite disabled:opacity-50"
            >
              Sign In
            </button>
          </form>
        </div>

        {/* Overlay Container */}
        <div className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-700 ease-in-out z-100 ${!isLogin ? "-translate-x-full" : ""}`}>
          <div className={`bg-gradient-to-br from-secondary to-accent text-white relative -left-full h-full w-[200%] transition-transform duration-700 ease-in-out ${!isLogin ? "translate-x-1/2" : "translate-x-0"}`}>
            
            {/* Left Overlay (Welcome Back) */}
            <div className={`absolute flex items-center justify-center flex-col px-10 text-center top-0 h-full w-1/2 transition-transform duration-700 ease-in-out ${!isLogin ? "translate-x-0" : "-translate-x-[20%]"}`}>
              <h1 className="text-4xl font-bold mb-4 drop-shadow-lg">Welcome Back!</h1>
              <p className="text-sm font-light leading-relaxed mb-8 px-4 opacity-90 text-white/90">
                To keep connected with us please login with your personal info
              </p>
              <button 
                onClick={toggleMode}
                className="bg-transparent border border-white text-white rounded-full text-xs font-bold py-3 px-12 tracking-wider uppercase hover:bg-white hover:text-secondary transition-all active:scale-95"
              >
                Sign In
              </button>
            </div>

            {/* Right Overlay (Hello Friend) */}
            <div className={`absolute flex items-center justify-center flex-col px-10 text-center top-0 right-0 h-full w-1/2 transition-transform duration-700 ease-in-out ${!isLogin ? "translate-x-[20%]" : "translate-x-0"}`}>
              <h1 className="text-4xl font-bold mb-4 drop-shadow-lg">Hello, Friend!</h1>
              <p className="text-sm font-light leading-relaxed mb-8 px-4 opacity-90 text-white/90">
                Enter your personal details and start your journey with us
              </p>
              <button 
                onClick={toggleMode}
                className="bg-transparent border border-white text-white rounded-full text-xs font-bold py-3 px-12 tracking-wider uppercase hover:bg-white hover:text-secondary transition-all active:scale-95"
              >
                Sign Up
              </button>
            </div>

          </div>
        </div>

      </div>
      
      {/* Return Home Link */}
      <Link to="/" className="mt-8 text-gray-500 hover:text-secondary flex items-center gap-2 transition-colors">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        Back to Home
      </Link>
    </div>
  );
}

function SocialIcon({ icon }) {
  return (
    <a href="#" className="border border-gray-300 rounded-full inline-flex justify-center items-center mx-2 h-10 w-10 text-gray-700 hover:bg-lite/30 hover:border-lite transition-all">
      {icon}
    </a>
  );
}

function AuthInput({ type = "text", placeholder, value, onChange }) {
  return (
    <input 
      type={type} 
      placeholder={placeholder} 
      value={value} 
      onChange={onChange}
      className="bg-gray-100 border-none px-4 py-3 my-2 w-full rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all font-medium"
    />
  );
}

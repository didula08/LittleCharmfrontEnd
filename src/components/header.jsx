import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { cartCount } = useCart();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  // The header should be solid if we are NOT on the home page OR if we've scrolled down.
  const isHomePage = location.pathname === "/";
  const headerSolid = !isHomePage || isScrolled;

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      headerSolid 
        ? "bg-white/95 backdrop-blur-md border-b border-black/5 shadow-sm py-3" 
        : "bg-black/20 backdrop-blur-md border-b border-white/10 py-5"
    }`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
        
        {/* Mobile Menu Button - Left Side */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`md:hidden p-2 -ml-2 transition-colors ${
            headerSolid ? "text-primary" : "text-white"
          }`}
          aria-label="Toggle menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d={isMenuOpen ? "M6 18 18 6M6 6l12 12" : "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"} />
          </svg>
        </button>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 md:gap-3">
          <img
            src="/logo1.png"
            alt="Logo"
            className={`w-8 h-8 md:w-10 md:h-10 object-cover rounded-full border transition-colors ${
              headerSolid ? "border-black/10" : "border-white/10 hover:border-white/30"
            }`}
            onError={(e) => {
              e.target.src = "https://ui-avatars.com/api/?name=LC&background=EBD5AB&color=1B211A";
            }}
          />
          <span className={`text-lg md:text-2xl font-bold tracking-tight transition-colors ${
            headerSolid ? "text-primary" : "text-white drop-shadow-md"
          }`}>
            LittleCharm
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`relative text-[15px] font-medium transition-colors duration-300 py-1 ${
                  isActive 
                    ? (headerSolid ? "text-primary font-bold" : "text-white font-bold")
                    : (headerSolid ? "text-primary/70 hover:text-primary" : "text-white/70 hover:text-white")
                }`}
              >
                {link.name}
                {isActive && (
                  <span className={`absolute bottom-0 left-0 w-full h-[2px] rounded-full transition-colors ${
                    headerSolid ? "bg-primary" : "bg-white"
                  }`}></span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1 md:gap-4">
          <Link
            to="/cart"
            className={`relative p-2 transition-colors flex items-center justify-center transform hover:scale-105 ${
              headerSolid ? "text-primary/80 hover:text-primary" : "text-white/80 hover:text-white"
            }`}
            title="Cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.112 11.213a.45.45 0 0 1-.443.46h-11.35a.45.45 0 0 1-.443-.46L3.394 8.507a.45.45 0 0 1 .443-.46h17.113a.45.45 0 0 1 .443.46Z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-white shadow-sm animate-bounce-subtle">
                {cartCount}
              </span>
            )}
          </Link>

          <Link
            to="/login"
            className={`p-2 transition-colors flex items-center justify-center transform hover:scale-105 ${
              headerSolid ? "text-primary/80 hover:text-primary" : "text-white/80 hover:text-white"
            }`}
            title="Sign In"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Mobile Menu Sidebar */}
      <div className={`fixed inset-0 z-40 md:hidden transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />
        
        {/* Sidebar Content */}
        <div className="absolute top-0 left-0 h-full w-[280px] bg-white shadow-2xl flex flex-col p-6 pt-20">
          <nav className="flex flex-col gap-6">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-lg font-semibold py-2 border-b border-black/5 transition-colors ${
                    isActive ? "text-secondary pl-2" : "text-primary/70"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <Link
              to="/login"
              className="text-lg font-semibold py-2 border-b border-black/5 text-primary/70"
            >
              Sign In
            </Link>
          </nav>
          
          <div className="mt-auto pt-10 pb-6 border-t border-black/5 text-center">
            <p className="text-sm text-primary/50 font-medium">© 2026 LittleCharm</p>
          </div>
        </div>
      </div>
    </header>
  );
}
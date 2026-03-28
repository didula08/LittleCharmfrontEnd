import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Hero() {
  const images = [
    "/hero3.png",
    "/login.jpg",
    "/login2.jpg"
  ];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000); // 4sec for a slightly calmer pace
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[100svh] overflow-hidden -mt-[80px]">
      {/* Background Images with Crossfade */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentImage ? "opacity-100 z-0" : "opacity-0 -z-10"
          }`}
        >
          <img
            src={img}
            alt="Hero Background"
            className="w-full h-full object-cover scale-105"
          />
        </div>
      ))}
      
      {/* Luxurious Dark Gradient Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />

      {/* Hero Content */}
      <div className="relative z-20 w-full h-full max-w-7xl mx-auto px-6 flex flex-col justify-center pt-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0 }}
          className="inline-flex items-center self-start gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-lite animate-pulse"></span>
          <span className="text-lite font-semibold text-xs tracking-widest uppercase">New Collection 2026</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="text-5xl md:text-7xl font-extrabold text-white leading-[1.1] tracking-tight drop-shadow-lg transition-all mb-6"
        >
          Discover <br />
          <span className="text-lite">Handcrafted</span> <br />
          Perfection.
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="text-lg md:text-xl text-white/80 max-w-lg leading-relaxed font-light drop-shadow-md"
        >
          Bring charm and joy to your desk with our exclusive collection of hand-sculpted, air-dry foam clay miniatures featuring the beloved Chibi aesthetic.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
          className="flex flex-wrap items-center gap-5 pt-4"
        >
          <Link
            to="/products"
            className="px-8 py-4 bg-lite text-primary font-bold rounded-lg hover:bg-white transition-all duration-300 shadow-xl shadow-black/20 hover:-translate-y-0.5"
          >
            Shop Now
          </Link>
          <Link
            to="/about"
            className="px-8 py-4 bg-transparent text-white font-medium rounded-lg border border-white/30 hover:border-white hover:bg-white/10 transition-all duration-300"
          >
            Our Story
          </Link>
        </motion.div>
        
        {/* Additional features/stats */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
          className="pt-10 flex border-t border-white/20 mt-8 gap-10"
        >
            <div>
                <h4 className="text-2xl font-bold text-white">5cm</h4>
                <p className="text-sm text-white/70 mt-1 uppercase tracking-wider">Perfect Size</p>
            </div>
            <div>
                <h4 className="text-2xl font-bold text-white">100%</h4>
                <p className="text-sm text-white/70 mt-1 uppercase tracking-wider">Handmade</p>
            </div>
        </motion.div>
      </div>
    </div>
  );
}

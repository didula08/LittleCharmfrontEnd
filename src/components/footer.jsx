import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full bg-primary text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
          {/* Brand & Description */}
          <div className="space-y-4 text-center sm:text-left">
            <Link to="/" className="flex items-center justify-center sm:justify-start gap-3">
              <span className="text-2xl font-bold text-white tracking-tight">
                LittleCharm
              </span>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed font-light max-w-xs mx-auto sm:mx-0">
              We bring charm and joy into your space with our exclusive collection of meticulously crafted accessories.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h4 className="font-semibold text-white mb-5 uppercase tracking-widest text-[10px]">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-sm text-white/60 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/products" className="text-sm text-white/60 hover:text-white transition-colors">Products</Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-white/60 hover:text-white transition-colors">About Us</Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="text-center sm:text-left">
            <h4 className="font-semibold text-white mb-5 uppercase tracking-widest text-[10px]">Support</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/contact" className="text-sm text-white/60 hover:text-white transition-colors">Contact Us</Link>
              </li>
              <li>
                <span className="text-sm text-white/60 hover:text-white transition-colors cursor-pointer">FAQs</span>
              </li>
              <li>
                <span className="text-sm text-white/60 hover:text-white transition-colors cursor-pointer">Shipping & Returns</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="text-center sm:text-left">
            <h4 className="font-semibold text-white mb-5 uppercase tracking-widest text-[10px]">Newsletter</h4>
            <p className="text-sm text-white/60 mb-6 font-light">Subscribe to get special offers, free giveaways, and updates.</p>
            <div className="flex flex-col space-y-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-4 py-3 border border-white/10 rounded-lg bg-white/5 text-white text-sm focus:outline-none focus:border-secondary focus:bg-white/10 transition-colors"
                autoComplete="off"
              />
              <button className="w-full px-5 py-3 bg-secondary text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-white hover:text-primary transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[10px] md:text-xs text-white/40 font-light tracking-wide">
            &copy; {new Date().getFullYear()} LITTLECHARM. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-6 text-[10px] md:text-xs text-white/40 font-light tracking-wide">
            <span className="hover:text-white cursor-pointer transition-colors uppercase">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors uppercase">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

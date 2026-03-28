import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full bg-[#1B211A] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand & Description */}
          <div className="md:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <span className="text-xl font-bold text-white tracking-tight">
                LittleCharm
              </span>
            </Link>
            <p className="text-sm text-white/70 leading-relaxed font-light">
              We bring charm and joy into your space with our exclusive collection of meticulously crafted accessories.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-5 uppercase tracking-wider text-xs">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-sm text-white/70 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/products" className="text-sm text-white/70 hover:text-white transition-colors">Products</Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-white/70 hover:text-white transition-colors">About Us</Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold text-white mb-5 uppercase tracking-wider text-xs">Support</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/contact" className="text-sm text-white/70 hover:text-white transition-colors">Contact Us</Link>
              </li>
              <li>
                <span className="text-sm text-white/70 hover:text-white transition-colors cursor-pointer">FAQs</span>
              </li>
              <li>
                <span className="text-sm text-white/70 hover:text-white transition-colors cursor-pointer">Shipping & Returns</span>
              </li>
            </ul>
          </div>

          {/* Newsletter / Socials */}
          <div>
            <h4 className="font-semibold text-white mb-5 uppercase tracking-wider text-xs">Newsletter</h4>
            <p className="text-sm text-white/70 mb-4 font-light">Subscribe to get special offers, free giveaways, and updates.</p>
            <div className="flex items-center">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-4 py-2 border border-white/20 rounded-l-lg bg-white/5 text-white text-sm focus:outline-none focus:border-[#628141] focus:bg-white/10 transition-colors"
                autoComplete="off"
              />
              <button className="px-5 py-2 bg-[#628141] text-white text-sm font-medium rounded-r-lg hover:bg-[#EBD5AB] hover:text-[#1B211A] transition-colors border border-[#628141] hover:border-[#EBD5AB]">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/50 font-light">
            &copy; {new Date().getFullYear()} LittleCharm. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-white/50 font-light">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

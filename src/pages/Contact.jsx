import { motion } from "framer-motion";
import emailjs from '@emailjs/browser';
import React, { useRef, useState } from 'react';

export default function Contact() {
  const form = useRef();
  const [isSending, setIsSending] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);

    // Replace with your actual EmailJS credentials
    emailjs.sendForm(
      'service_kj143wi', 
      'template_6xdre1k', 
      form.current, 
      'j_w08JEs5MD7mDBj2'
    )
    .then((result) => {
        alert("Message sent successfully!");
        form.current.reset();
    })
    .catch((error) => {
        alert("Failed to send: " + error.text);
    })
    .finally(() => {
        setIsSending(false);
    });
  };

  return (
    <div className="w-full min-h-screen pt-[120px] pb-24 flex items-center justify-center bg-white">
      <div className="max-w-7xl mx-auto px-6 w-full flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Left Side: Huge Modern Typography */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full lg:w-5/12 flex flex-col justify-center"
        >
          <div className="w-12 h-[2px] bg-primary mb-6"></div>
          <h1 className="text-5xl md:text-7xl font-light text-primary mb-6 tracking-tight leading-tight">
            Let's create <br/> something <span className="text-[#628141] font-medium">beautiful.</span>
          </h1>
          <p className="text-primary/70 text-lg md:text-xl leading-relaxed font-light mb-12 max-w-md">
            Whether you have a custom miniature idea, a question about your order, or just want to chat about chibi art, we're here for you.
          </p>

          <div className="space-y-8 flex flex-col">
            <div className="group">
               <h3 className="text-xs font-bold uppercase tracking-widest text-primary/40 mb-2">Email</h3>
               <p className="text-xl md:text-2xl font-medium text-primary cursor-pointer hover:text-[#628141] transition-colors">
                 hello@littlecharm.co
               </p>
            </div>
            
            <div className="group">
               <h3 className="text-xs font-bold uppercase tracking-widest text-primary/40 mb-2">Studio</h3>
               <p className="text-xl md:text-2xl font-medium text-primary">
                 123 Artisan Valley, NY 10001
               </p>
            </div>
            
            <div className="group">
               <h3 className="text-xs font-bold uppercase tracking-widest text-primary/40 mb-2">Social</h3>
               <div className="flex gap-6 mt-1">
                 <span className="text-lg font-medium text-primary cursor-pointer hover:text-[#628141] transition-colors">Instagram</span>
                 <span className="text-lg font-medium text-primary cursor-pointer hover:text-[#628141] transition-colors">TikTok</span>
               </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Ultra Modern Floating Form */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="w-full lg:w-7/12"
        >
          <div className="bg-[#fcfcfc] border border-black/5 p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] rounded-[2rem] relative overflow-hidden">
            
            {/* Decorative background blob */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-lite/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>

            {/* Added ref and onSubmit here */}
            <form ref={form} onSubmit={sendEmail} className="relative z-10 w-full flex flex-col gap-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2 group">
                  <label className="text-sm font-medium text-primary/50 group-focus-within:text-primary transition-colors">First Name</label>
                  {/* Added name="first_name" */}
                  <input name="first_name" type="text" required className="w-full border-b border-black/10 py-2 bg-transparent focus:outline-none focus:border-[#628141] transition-all text-primary text-lg" placeholder="Jane" />
                </div>
                <div className="flex flex-col gap-2 group">
                  <label className="text-sm font-medium text-primary/50 group-focus-within:text-primary transition-colors">Last Name</label>
                  {/* Added name="last_name" */}
                  <input name="last_name" type="text" required className="w-full border-b border-black/10 py-2 bg-transparent focus:outline-none focus:border-[#628141] transition-all text-primary text-lg" placeholder="Doe" />
                </div>
              </div>

              <div className="flex flex-col gap-2 group">
                <label className="text-sm font-medium text-primary/50 group-focus-within:text-primary transition-colors">Email Address</label>
                {/* Added name="email" */}
                <input name="email" type="email" required className="w-full border-b border-black/10 py-2 bg-transparent focus:outline-none focus:border-[#628141] transition-all text-primary text-lg" placeholder="jane@example.com" />
              </div>

              <div className="flex flex-col gap-2 group">
                <label className="text-sm font-medium text-primary/50 group-focus-within:text-primary transition-colors">Your Message</label>
                {/* Added name="message" */}
                <textarea name="message" rows="4" required className="w-full border-b border-black/10 py-2 bg-transparent focus:outline-none focus:border-[#628141] transition-all text-primary text-lg resize-none" placeholder="Tell us all about your idea..."></textarea>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                disabled={isSending}
                className="mt-6 bg-primary text-white py-4 px-10 font-bold tracking-wide hover:bg-[#628141] transition-colors rounded-2xl shadow-lg shadow-primary/20 self-start flex items-center gap-3 disabled:opacity-50"
              >
                {isSending ? "Sending..." : "Send Message"}
                {!isSending && (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="w-full flex-col flex items-center bg-white pb-0">
      <div className="w-full max-w-7xl mx-auto px-6 flex flex-col items-center">
        {/* Top Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mb-16 mt-8 md:mt-12"
        >
          <h1 className="text-4xl md:text-5xl font-light text-primary mb-6 tracking-tight">
            About Our Store
          </h1>
          <p className="text-primary/80 text-lg md:text-xl leading-relaxed font-light">
            Discover the story behind LittleCharm — where imagination meets craftsmanship. We sculpt soft, minimalist Chibi-aesthetic miniatures that capture hearts and elevate your personal desktop space.
          </p>
        </motion.div>

        {/* Split Content Section */}
        <div className="w-full flex flex-col md:flex-row items-center gap-12 md:gap-20 overflow-hidden">
          {/* Left Image */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full md:w-1/2 aspect-[4/3] bg-[#F4F4F4] overflow-hidden"
          >
            <img 
              src="https://images.unsplash.com/photo-1449247709967-d4461a6a6103?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
              alt="LittleCharm Workspace" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 ease-out"
            />
          </motion.div>
          
          {/* Right Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="w-full md:w-1/2 flex flex-col justify-center"
          >
            <h2 className="text-3xl md:text-4xl font-normal text-primary mb-8 tracking-tight">
              Our Mission
            </h2>
            <p className="text-primary/80 text-lg leading-relaxed font-light mb-6">
              At LittleCharm, our mission is to bring joy and personality to your everyday spaces through meticulously hand-sculpted, air-dry foam clay miniatures. 
              Combining an adorable Chibi aesthetic with high-quality, velvet-touch finishes, we create ultra-lightweight companions perfect for your bookshelf or desk.
            </p>
            <p className="text-primary/80 text-lg leading-relaxed font-light">
              Every piece is uniquely crafted and hand-painted with delicate details—from oversized glossy black eyes to soft pastel blushes. We are dedicated to creating lovable decor pieces that require nothing more than a dry environment, a light dusting, and a loving home.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="w-full bg-[#f4f4f5] py-24 mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-[32px] md:text-4xl font-light text-center text-primary mb-16"
          >
            Our Core Values
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            {/* Sustainability Card */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0 }}
              className="bg-white p-12 flex flex-col items-center text-center shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-10 h-10 text-primary mb-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-4m0 0a2 2 0 1 0 0-4m0 4a2 2 0 1 1 0-4m-6.4 1.2A7.5 7.5 0 0 1 12 3a7.5 7.5 0 0 1 6.4 8.2l-2 9.6a1.5 1.5 0 0 1-1.5 1.2H9.1a1.5 1.5 0 0 1-1.5-1.2l-2-9.6Z" />
              </svg>
              <h3 className="text-[17px] font-medium text-primary mb-3">Sustainability</h3>
              <p className="text-primary/60 text-sm font-light leading-relaxed">
                We use responsibly sourced, non-toxic air-dry foam clay and eco-friendly packaging to ensure our cute creations support a greener planet.
              </p>
            </motion.div>

            {/* Quality Card */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white p-12 flex flex-col items-center text-center shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-10 h-10 text-primary mb-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
              </svg>
              <h3 className="text-[17px] font-medium text-primary mb-3">Quality</h3>
              <p className="text-primary/60 text-sm font-light leading-relaxed">
                Every single miniature is sculpted and meticulously painted by hand to guarantee a flawless velvet-touch finish and enduring charm.
              </p>
            </motion.div>

            {/* Design Card */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white p-12 flex flex-col items-center text-center shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-10 h-10 text-primary mb-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.89 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.89l12.683-12.683z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 7.125L16.862 4.487" />
              </svg>
              <h3 className="text-[17px] font-medium text-primary mb-3">Design</h3>
              <p className="text-primary/60 text-sm font-light leading-relaxed">
                Our designs blend the beloved soft Chibi aesthetic with minimalist perfection, offering unique companions that bring personality to your setup.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

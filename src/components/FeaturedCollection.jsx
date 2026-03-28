import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "./productCard.jsx";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function FeaturedCollection() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/products");
        setFeaturedProducts(response.data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="w-full bg-[#fcfcfc] py-16 md:py-24 border-t border-black/5">
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6 md:gap-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-xl text-left"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-primary"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Featured items</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-light text-primary mb-4 md:mb-6 leading-tight tracking-tight">
            Our Favourite <br className="hidden md:block"/> Collection
          </h2>
          <p className="text-primary/70 text-base md:text-xl leading-relaxed font-light">
            Explore our favorite hand-sculpted miniatures, featuring soft pastel colors, oversized glossy eyes, and a delightful velvet-touch finish. Perfect for your desk or bookshelf!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full md:w-auto text-left"
        >
          <Link to="/products" className="group inline-flex items-center gap-3 text-primary font-medium hover:text-secondary transition-colors">
            <span>View All Products</span>
            <span className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                 <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
               </svg>
            </span>
          </Link>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {loading ? (
          <div className="col-span-full py-20 flex justify-center">
             <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          </div>
        ) : (
          featuredProducts.map((product, index) => (
            <motion.div
              key={product.productId}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

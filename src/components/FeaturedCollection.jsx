import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard.jsx";
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
    <div className="w-full bg-[#fcfcfc] py-24 border-t border-black/5">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-primary"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Featured items</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-primary mb-6 leading-tight tracking-tight">
            Our Favourite <br/> Collection
          </h2>
          <p className="text-primary/70 text-lg md:text-xl leading-relaxed font-light">
            Explore our favorite hand-sculpted miniatures, featuring soft pastel colors, oversized glossy eyes, and a delightful velvet-touch finish. Perfect for your desk or bookshelf!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Link to="/products" className="group flex items-center gap-3 text-primary font-medium hover:text-secondary transition-colors">
            <span>View All Products</span>
            <span className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                 <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
               </svg>
            </span>
          </Link>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

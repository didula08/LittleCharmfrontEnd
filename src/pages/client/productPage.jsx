import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../../components/productCard.jsx";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12 min-h-screen">
      <div className="flex flex-col mb-10 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-light text-primary mb-4">All Products</h1>
        <p className="text-primary/60 max-w-2xl font-light">
          Browse our full collection of handcrafted miniatures. Each piece is unique and made with love.
        </p>
      </div>

      {isLoading ? (
        <div className="w-full py-32 flex justify-center items-center">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

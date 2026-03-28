import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loading from "../../components/loading";
import ImageSlider from "../../components/imageSlider";
import { useCart } from "../../context/CartContext";

export default function ProductOverviewPage() {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const params = useParams();
  const productId = params.id;
  const [status, setStatus] = useState("loading");
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/products/" + productId)
      .then((response) => {
        setProduct(response.data);
        setStatus("success");
      })
      .catch((err) => {
        console.error(err);
        setStatus("error");
        toast.error("Failed to load product details");
      });
  }, [productId]);

  const handleAddToCart = (e) => {
    if (e) e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleBuyNow = () => {
    addToCart(product);
    navigate("/checkout");
  };

  if (status === "loading") return <div className="py-20 flex justify-center"><Loading /></div>;
  if (status === "error") return <div className="py-20 text-center font-bold text-red-500">Error loading product.</div>;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 md:py-10">
      {status === "success" && product && (
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
          {/* Image Section */}
          <div className="w-full lg:w-1/2 flex justify-center items-center bg-gray-50 rounded-2xl overflow-hidden p-4 sm:p-8">
            <ImageSlider image={product.image} />
          </div>

          {/* Details Section */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-primary/40 bg-primary/5 px-2 py-1 rounded">
                Ref: {product.productId}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-light text-primary mb-2">
              {product.name}
              {product.altNames && product.altNames.length > 0 && (
                <span className="text-primary/30 font-extralight ml-3">
                  | {product.altNames.join(" | ")}
                </span>
              )}
            </h1>

            <div className="flex items-center gap-4 my-6">
              {product.labelledPrice > product.price ? (
                <>
                   <span className="text-3xl font-bold text-primary">Rs. {product.price.toLocaleString()}</span>
                   <span className="text-xl text-primary/30 line-through">Rs. {product.labelledPrice.toLocaleString()}</span>
                   <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase">
                     Save {Math.round(((product.labelledPrice - product.price) / product.labelledPrice) * 100)}%
                   </span>
                </>
              ) : (
                <span className="text-3xl font-bold text-primary">Rs. {product.price.toLocaleString()}</span>
              )}
            </div>

            <p className="text-primary/70 text-lg leading-relaxed font-light mb-8 border-t border-black/5 pt-6">
              {product.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-primary text-white px-8 py-4 rounded-lg hover:bg-secondary transition-all duration-300 shadow-xl shadow-black/10 font-bold uppercase tracking-widest text-xs"
              >
                Add to Cart
              </button>
              <button 
                onClick={handleBuyNow}
                className="flex-1 border-2 border-primary text-primary px-8 py-4 rounded-lg hover:bg-primary hover:text-white transition-all duration-300 font-bold uppercase tracking-widest text-xs"
              >
                Buy Now
              </button>
            </div>

            {/* Features list or additional info could go here */}
            <div className="grid grid-cols-2 gap-4 mt-12 border-t border-black/5 pt-8">
               <div className="flex flex-col">
                 <span className="text-[10px] font-bold uppercase tracking-widest text-primary/40 mb-1">Shipping</span>
                 <p className="text-sm font-medium text-primary">Free delivery on orders over Rs. 5,000</p>
               </div>
               <div className="flex flex-col">
                 <span className="text-[10px] font-bold uppercase tracking-widest text-primary/40 mb-1">Handmade</span>
                 <p className="text-sm font-medium text-primary">Each piece is uniquely sculpted</p>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

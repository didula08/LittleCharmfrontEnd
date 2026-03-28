import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const hasImage = product.image && product.image.length > 0;

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };
  
  return (
    <div className="relative group w-full max-w-[350px] mx-auto mb-10">
      <Link 
        to={`/overview/${product.productId}`} 
        className="block w-full flex flex-col relative z-10 cursor-pointer"
      >
        {/* Large Image Showcase Area (Frameless, Square) */}
        <div className="w-full aspect-square bg-[#F4F4F4] group-hover:bg-[#EFEFEF] transition-colors duration-500 relative overflow-hidden flex items-center justify-center p-8">
          {hasImage ? (
            <img
              src={product.image[0]}
              alt={product.name}
              className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-105 mix-blend-multiply"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center opacity-50">
              <span className="text-primary/40 font-medium tracking-wider text-xs">NO IMAGE</span>
            </div>
          )}
          
          {/* Sale Badge */}
          {product.labelledPrice !== product.price && (
            <div className="absolute top-4 left-4 bg-[#1B211A] text-white text-[10px] font-bold px-3 py-1.5 uppercase tracking-wider z-20">
              Sale
            </div>
          )}

          {/* Hover Quick Action */}
          <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out flex gap-2 justify-center">
            <div className="bg-white text-primary text-[10px] font-bold uppercase tracking-widest px-4 py-3 shadow-lg hover:bg-primary hover:text-white transition-colors border border-black/5 flex-1 text-center">
              View Product
            </div>
            <button 
              onClick={handleQuickAdd}
              className="bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-4 py-3 shadow-lg hover:bg-secondary hover:text-primary transition-colors border border-black/5 flex-1"
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Minimalist Floating Text Below Image */}
        <div className="w-full mt-6 flex flex-col items-center text-center bg-transparent">
          <h2 className="text-xl font-medium text-primary line-clamp-1 truncate w-full mb-2">
            {product.name}
          </h2>
          <div className="flex items-center justify-center gap-3">
             {product.labelledPrice !== product.price ? (
                <>
                  <span className="text-base font-bold text-primary">
                    Rs. {product.price.toLocaleString()}
                  </span>
                  <span className="text-sm font-medium text-primary/40 line-through">
                    Rs. {product.labelledPrice.toLocaleString()}
                  </span>
                </>
              ) : (
                <span className="text-base font-bold text-primary">
                  Rs. {product.price.toLocaleString()}
                </span>
              )}
          </div>
        </div>
      </Link>
    </div>
  );
}

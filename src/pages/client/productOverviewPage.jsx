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
        console.log(response.data);
        setProduct(response.data);
        setStatus("success");
      })
      .catch((err) => {
        console.log(err);
        setStatus("error");
        toast.error("Failed to load product details");
      });
  }, []); // left unchanged

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <>
      {status == "success" && (
        <div className="w-full h-full flex">
          <div className="w-[50%] h-full flex justify-center items-center">
            <ImageSlider image={product.image} />
          </div>
          <div className="w-[50%] h-full justify-center items-centerflex p-10">
            <div className="w-[500px] h-[600px] flex flex-col items-center">

              <h1 className="w-full text-center text-4xl text-primary font-semibold">{product.name}
                {
                  product.altNames.map((altName,index)=>{
                    return(
                      <span key={index} className="text-4xl text-gery-200">{" | "+altName}</span>
                    )
                  })
                }
              </h1>

              <h1 className="w-full text-center my-2 text-md text-gray-600 font-semibold">{product.productId}</h1>
              <p className="w-full text-center my-2 text-md text-gray-600 font-semibold">{product.description}</p>
              {
                product.labelledPrice > product.price ?
                <div>
                  <span className="text-4xl mx-4 text-secondary line-through">{product.labelledPrice.toFixed(2)}</span>
                  <span className="text-4xl mx-4 text-primary font-bold">{product.price.toFixed(2)}</span>
                </div>
                :<span className="text-4xl mx-4 font-bold text-primary">{product.price.toFixed(2)}</span>
              }
              <div className="w-full flex justify-center items-center mt-8">

                <button 
                  onClick={handleAddToCart}
                  className="bg-primary text-white px-8 py-3 rounded-full m-2 hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/20 font-medium"
                >
                  Add to Cart
                </button>
                <button 
                  onClick={() => {
                    handleAddToCart();
                    navigate("/checkout");
                  }}
                  className="border-2 border-primary text-primary px-8 py-3 rounded-full m-2 hover:bg-primary hover:text-white hover:scale-105 transition-all duration-300 font-medium"
                >
                  Buy Now
                </button>

              </div>

            </div>
          </div>
        </div>
      ) }
    </>
  );
}

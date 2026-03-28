import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import ProductPage from "./client/productPage";
import ProductOverviewPage from "./client/productOverviewPage";
import Hero from "../components/Hero";
import FeaturedCollection from "../components/FeaturedCollection";
import Footer from "../components/footer";
import About from "./About";
import Contact from "./Contact";
import Cart from "./client/Cart";
import Checkout from "./client/Checkout";

export default function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <Header />
      {/* pt-[80px] ensures content starts below the fixed header */}
      <div className="w-full flex-1 pt-[100px] pb-10 flex flex-col items-center">
        <Routes>
          <Route index element={
            <div className="w-full flex flex-col items-center bg-white">
              <Hero />
              <FeaturedCollection />
            </div>
          } />
          <Route path="products" element={<ProductPage />} />
          <Route path="overview/:id" element={<ProductOverviewPage />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="*" element={<h1 className="mt-10 text-2xl font-bold text-red-500">404 Not Found</h1>} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

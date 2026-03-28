import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

export default function Checkout() {
    const { cart, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [orderDetails, setOrderDetails] = useState({
        name: '',
        email: '',
        address: '',
        phone: ''
    });

    if (cart.length === 0 && !isConfirmed) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Your cart is empty</h2>
                <Link to="/products" className="px-8 py-3 bg-primary text-white font-medium rounded-full hover:bg-secondary transition-all">
                    Explore Products
                </Link>
            </div>
        );
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOrderDetails(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const token = localStorage.getItem('token');
            const headers = {};
            if (token && token !== "null" && token !== "undefined") {
                headers.Authorization = `Bearer ${token}`;
            }

            const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "/orders", {
                ...orderDetails,
                products: cart.map(item => ({
                    productId: item.productId,
                    qty: item.quantity
                }))
            }, {
                headers: headers
            });

            if (response.status === 200) {
                setIsConfirmed(true);
                clearCart();
                toast.success("Order placed successfully!");
            }
        } catch (err) {
            console.error("Order failed:", err);
            toast.error(err.response?.data?.message || "Failed to place order. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isConfirmed) {
        return (
            <div className="max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-20 text-center animate-fadeIn">
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white border border-black/5 p-8 md:p-12 rounded-3xl md:rounded-[3rem] shadow-2xl shadow-black/5"
                >
                    <div className="w-16 h-16 md:w-24 md:h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8 md:w-12 md:h-12 text-green-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                    </div>
                    <h1 className="text-2xl md:text-4xl font-extrabold text-primary mb-3 md:mb-4">Order Confirmed!</h1>
                    <p className="text-sm md:text-xl text-primary/60 mb-8 md:mb-10 lg:px-10">Thank you for your purchase. We've received your order and will start processing it right away.</p>
                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                        <Link to="/" className="px-8 md:px-10 py-3.5 md:py-4 bg-primary text-white font-bold rounded-xl hover:bg-secondary transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-black/10 uppercase tracking-widest text-xs">
                            Back to Home
                        </Link>
                        <Link to="/products" className="px-8 md:px-10 py-3.5 md:py-4 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-all transform hover:scale-105 active:scale-95 uppercase tracking-widest text-xs">
                            Continue Shopping
                        </Link>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12 w-full animate-fadeIn">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-8 md:mb-10">Checkout</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
                {/* Billing Details Form */}
                <div className="bg-white border border-black/5 p-6 md:p-8 rounded-2xl md:rounded-[2.5rem] shadow-xl shadow-black/5 order-2 lg:order-1">
                    <h2 className="text-xl md:text-2xl font-bold text-primary mb-6 md:mb-8">Shipping Information</h2>
                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                        <div className="space-y-1.5 md:space-y-2">
                            <label className="text-xs md:text-sm font-semibold text-primary/60 ml-1">Full Name</label>
                            <input 
                                required
                                name="name"
                                value={orderDetails.name}
                                onChange={handleInputChange}
                                type="text" 
                                placeholder="John Doe"
                                className="w-full px-5 py-3.5 md:px-6 md:py-4 bg-gray-50 border border-black/5 rounded-xl md:rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all font-medium text-primary text-sm md:text-base"
                            />
                        </div>
                        <div className="space-y-1.5 md:space-y-2">
                            <label className="text-xs md:text-sm font-semibold text-primary/60 ml-1">Email Address</label>
                            <input 
                                required
                                name="email"
                                value={orderDetails.email}
                                onChange={handleInputChange}
                                type="email" 
                                placeholder="john@example.com"
                                className="w-full px-5 py-3.5 md:px-6 md:py-4 bg-gray-50 border border-black/5 rounded-xl md:rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all font-medium text-primary text-sm md:text-base"
                            />
                        </div>
                        <div className="space-y-1.5 md:space-y-2">
                            <label className="text-xs md:text-sm font-semibold text-primary/60 ml-1">Telephone Number</label>
                            <input 
                                required
                                name="phone"
                                value={orderDetails.phone}
                                onChange={handleInputChange}
                                type="tel" 
                                placeholder="+94 7X XXX XXXX"
                                className="w-full px-5 py-3.5 md:px-6 md:py-4 bg-gray-50 border border-black/5 rounded-xl md:rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all font-medium text-primary text-sm md:text-base"
                            />
                        </div>
                        <div className="space-y-1.5 md:space-y-2">
                            <label className="text-xs md:text-sm font-semibold text-primary/60 ml-1">Home Address</label>
                            <textarea 
                                required
                                name="address"
                                value={orderDetails.address}
                                onChange={handleInputChange}
                                rows="3"
                                placeholder="123 Street Name, City, Postal Code"
                                className="w-full px-5 py-3.5 md:px-6 md:py-4 bg-gray-50 border border-black/5 rounded-xl md:rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all font-medium text-primary text-sm md:text-base resize-none"
                            ></textarea>
                        </div>
                        
                        <div className="pt-4 md:pt-6">
                            <button 
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-4 md:py-5 bg-primary text-white font-bold rounded-xl md:rounded-2xl hover:bg-secondary transition-all transform hover:scale-[1.02] active:scale-95 shadow-xl shadow-black/10 disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-3 uppercase tracking-widest text-xs"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Processing...
                                    </>
                                ) : (
                                    "Confirm & Place Order"
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Order Summary Side */}
                <div className="space-y-6 md:space-y-8 order-1 lg:order-2">
                    <div className="bg-gray-50 border border-black/5 p-6 md:p-8 rounded-2xl md:rounded-[2.5rem]">
                        <h2 className="text-xl md:text-2xl font-bold text-primary mb-4 md:mb-6">Order Summary</h2>
                        <div className="space-y-4 max-h-[300px] md:max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                            {cart.map((item) => (
                                <div key={item.productId} className="flex gap-3 md:gap-4 items-center">
                                    <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-lg md:rounded-xl overflow-hidden flex-shrink-0 border border-black/5">
                                        <img src={item.image?.[0]} alt="" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-primary text-xs md:text-sm line-clamp-1">{item.name}</h4>
                                        <p className="text-[10px] md:text-xs text-primary/60">Qty: {item.quantity}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-primary text-xs md:text-sm">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-black/5 space-y-3">
                            <div className="flex justify-between text-primary/60 text-[11px] md:text-sm">
                                <span>Subtotal</span>
                                <span className="font-bold">Rs. {cartTotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-primary/60 text-[11px] md:text-sm">
                                <span>Shipping</span>
                                <span className="font-bold text-green-600">FREE</span>
                            </div>
                            <div className="flex justify-between items-center pt-3 border-t border-black/5 mt-3">
                                <span className="text-base md:text-lg font-bold text-primary">Total Amount</span>
                                <span className="text-xl md:text-2xl font-black text-primary">Rs. {cartTotal.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-4 md:p-6 bg-accent/5 border border-accent/10 rounded-xl md:rounded-2xl flex gap-3 md:gap-4 items-start">
                        <div className="p-1.5 md:p-2 bg-accent/20 rounded-lg text-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 md:w-5 md:h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="font-bold text-primary text-xs md:text-sm mb-1">Secure Transaction</h4>
                            <p className="text-[10px] md:text-xs text-primary/60">Your personal details are safe with us. We use encrypted connections for all data transfers.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

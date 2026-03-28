import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function Cart() {
    const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

    if (cart.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
                <div className="w-20 h-20 md:w-24 md:h-24 mb-6 text-primary/20 bg-primary/5 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-10 h-10 md:w-12 md:h-12 text-primary/40">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.112 11.213a.45.45 0 0 1-.443.46h-11.35a.45.45 0 0 1-.443-.46L3.394 8.507a.45.45 0 0 1 .443-.46h17.113a.45.45 0 0 1 .443.46Z" />
                    </svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Your cart is empty</h2>
                <p className="text-primary/60 mb-8 max-w-md text-sm md:text-base">Looks like you haven't added anything to your cart yet. Explore our collection to find something you'll love.</p>
                <Link to="/products" className="px-8 py-3 bg-primary text-white font-medium rounded-full hover:bg-secondary transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-primary/20">
                    Explore Products
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12 w-full animate-fadeIn">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-8 md:mb-10 flex items-baseline gap-3 md:gap-4">
                Shopping Cart
                <span className="text-sm md:text-lg font-medium text-primary/40">({cartCount} items)</span>
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
                {/* Cart Items List */}
                <div className="lg:col-span-2 space-y-4 md:space-y-6">
                    {cart.map((item) => (
                        <div key={item.productId} className="group relative flex flex-col sm:flex-row gap-4 md:gap-6 p-4 md:p-6 bg-white border border-black/5 rounded-2xl md:rounded-3xl transition-all hover:shadow-xl hover:shadow-black/5">
                            {/* Product Image */}
                            <div className="relative w-full sm:w-32 md:w-40 aspect-square sm:h-auto flex-shrink-0 bg-primary/5 rounded-xl md:rounded-2xl overflow-hidden">
                                <img
                                    src={item.image?.[0] || 'https://via.placeholder.com/150'}
                                    alt={item.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>

                            {/* Product Info */}
                            <div className="flex-1 flex flex-col justify-between py-1">
                                <div>
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-lg md:text-xl font-bold text-primary group-hover:text-primary transition-colors line-clamp-1">{item.name}</h3>
                                        <button 
                                            onClick={() => removeFromCart(item.productId)}
                                            className="p-1.5 text-primary/40 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                                            title="Remove item"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 md:w-5 md:h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                    <p className="text-primary/60 text-xs md:text-sm line-clamp-2 mb-4">{item.description}</p>
                                </div>

                                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-black/5">
                                    {/* Quantity Selector */}
                                    <div className="flex items-center bg-gray-50 border border-black/5 rounded-full p-1 self-start">
                                        <button 
                                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                            className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center text-primary/60 hover:text-primary transition-colors font-bold"
                                        >
                                            -
                                        </button>
                                        <span className="w-8 md:w-10 text-center font-bold text-primary text-sm md:text-base">{item.quantity}</span>
                                        <button 
                                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                            className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center text-primary/60 hover:text-primary transition-colors font-bold"
                                        >
                                            +
                                        </button>
                                    </div>

                                    {/* Subtotal - More prominent on mobile */}
                                    <div className="text-right">
                                        <p className="text-[10px] uppercase tracking-widest text-primary/40 mb-1">Subtotal</p>
                                        <p className="text-lg md:text-xl font-bold text-primary">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24 p-6 md:p-8 bg-white border border-black/5 rounded-3xl shadow-xl shadow-black/5">
                        <h2 className="text-xl md:text-2xl font-bold text-primary mb-6 md:mb-8">Order Summary</h2>
                        
                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-sm md:text-base text-primary/60">
                                <span>Subtotal</span>
                                <span className="font-semibold text-primary">Rs. {cartTotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm md:text-base text-primary/60">
                                <span>Shipping</span>
                                <span className="text-primary/40 italic">Calculated at checkout</span>
                            </div>
                            <div className="pt-4 border-t border-black/5 flex justify-between items-center mt-6">
                                <span className="text-lg md:text-xl font-bold text-primary">Total</span>
                                <span className="text-xl md:text-2xl font-extrabold text-primary">Rs. {cartTotal.toLocaleString()}</span>
                            </div>
                        </div>

                        <Link 
                            to="/checkout"
                            className="block w-full py-4 bg-primary text-white text-center font-bold rounded-xl hover:bg-secondary transition-all transform hover:scale-[1.02] active:scale-95 shadow-xl shadow-black/10 mb-4 uppercase tracking-widest text-xs"
                        >
                            Proceed to Checkout
                        </Link>
                        
                        <div className="text-center text-[10px] md:text-xs text-primary/40 flex items-center justify-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 md:w-4 md:h-4">
                                <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3A5.25 5.25 0 0 0 12 1.5Zm-3.75 5.25a3.75 3.75 0 1 1 7.5 0v3H8.25v-3Z" clipRule="evenodd" />
                            </svg>
                            Secure Checkout Guarantee
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

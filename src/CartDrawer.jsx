import { useState } from 'react';
import { X, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from './CartContext';

export default function CartDrawer({ isOpen, onClose }) {
  const { cart, removeFromCart, getCartTotal, checkoutWhatsApp } = useCart();
  // Added state to remember the name they type
  const [customerName, setCustomerName] = useState("");

  const handleCheckout = () => {
    checkoutWhatsApp(customerName);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-40 cursor-pointer"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl z-50 flex flex-col"
          >
            <div className="p-5 border-b flex justify-between items-center bg-gray-50">
              <h2 className="text-xl font-black flex items-center gap-2 text-[#0A192F]">
                <ShoppingBag /> Your Cart
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
              {cart.length === 0 ? (
                <div className="text-center mt-10 text-gray-400">
                  <ShoppingBag size={48} className="mx-auto mb-4 opacity-20" />
                  <p>Your cart is empty.</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4 border-b pb-4">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg shadow-sm" />
                    <div className="flex-1">
                      <h3 className="font-bold text-sm text-gray-900 leading-tight">{item.name}</h3>
                      <p className="text-blue-600 font-black mt-1">K{item.price}</p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 text-xs mt-2 font-bold hover:underline uppercase tracking-wider"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-5 border-t bg-gray-50">
              {/* THE NEW NAME INPUT FIELD */}
              {cart.length > 0 && (
                <div className="mb-5">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                    Your Name (For Booking)
                  </label>
                  <input 
                    type="text" 
                    placeholder="Type your name here..."
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white text-gray-900"
                  />
                </div>
              )}
              
              <div className="flex justify-between items-center mb-6">
                <span className="font-bold text-gray-500 uppercase tracking-widest text-sm">Total</span>
                <span className="font-black text-3xl text-[#0A192F]">K{getCartTotal()}</span>
              </div>
              
              <button
                onClick={handleCheckout}
                disabled={cart.length === 0 || customerName.trim() === ""}
                className="w-full bg-[#25D366] hover:bg-[#1ebd5a] disabled:bg-gray-300 text-white font-black py-4 rounded-xl transition-colors shadow-lg flex justify-center items-center gap-2 text-lg"
              >
                {customerName.trim() === "" ? "Enter Name to Order" : "Order via WhatsApp"}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
import { useState } from 'react';
import { X, ShoppingBag, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from './CartContext';

export default function CartDrawer({ isOpen, onClose }) {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal, checkoutWhatsApp } = useCart();
  const [customerName, setCustomerName] = useState('');

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-40 cursor-pointer"
          />

          {/* DRAWER */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* HEADER */}
            <div className="p-5 border-b flex justify-between items-center bg-gray-50">
              <h2 className="text-xl font-black flex items-center gap-2 text-[#0A192F]">
                <ShoppingBag /> Your Cart
              </h2>
              <div className="flex items-center gap-1">
                {/* ✅ New: Clear all button */}
                {cart.length > 0 && (
                  <button
                    onClick={clearCart}
                    title="Clear cart"
                    className="p-2 hover:bg-red-50 text-red-400 hover:text-red-600 rounded-full transition"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
                <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition">
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* ITEMS */}
            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
              {cart.length === 0 ? (
                <div className="text-center mt-10 text-gray-400">
                  <ShoppingBag size={48} className="mx-auto mb-4 opacity-20" />
                  <p>Your cart is empty.</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4 border-b pb-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg shadow-sm flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-sm text-gray-900 leading-tight line-clamp-2">{item.name}</h3>
                      <p className="text-blue-600 font-black mt-1">K{item.price * item.quantity}</p>

                      {/* ✅ New: Quantity controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-black text-gray-700 transition text-base"
                        >
                          −
                        </button>
                        <span className="font-black text-sm w-5 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-7 h-7 rounded-lg bg-blue-600 hover:bg-blue-700 flex items-center justify-center font-black text-white transition"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-1 text-red-400 hover:text-red-600 transition"
                          title="Remove item"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* FOOTER */}
            <div className="p-5 border-t bg-gray-50">
              {cart.length > 0 && (
                <div className="mb-5">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                    Your Name (For Booking)
                  </label>
                  <input
                    type="text"
                    placeholder="Type your name here..."
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white text-gray-900"
                  />
                </div>
              )}

              <div className="flex justify-between items-center mb-6">
                <span className="font-bold text-gray-500 uppercase tracking-widest text-sm">Total</span>
                <span className="font-black text-3xl text-[#0A192F]">K{getCartTotal()}</span>
              </div>

              <button
                onClick={() => checkoutWhatsApp(customerName)}
                disabled={cart.length === 0 || customerName.trim() === ''}
                className="w-full bg-[#25D366] hover:bg-[#1ebd5a] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-black py-4 rounded-xl transition-colors shadow-lg flex justify-center items-center gap-2 text-lg"
              >
                {customerName.trim() === '' ? 'Enter Name to Order' : 'Order via WhatsApp'}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

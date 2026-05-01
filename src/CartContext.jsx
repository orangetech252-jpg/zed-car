import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  // ✅ New: increment or decrement quantity. Removes item if it hits 0.
  const updateQuantity = (productId, delta) => {
    setCart(prev =>
      prev
        .map(item => item.id === productId ? { ...item, quantity: item.quantity + delta } : item)
        .filter(item => item.quantity > 0)
    );
  };

  // ✅ New: wipe the whole cart at once
  const clearCart = () => setCart([]);

  const getCartTotal = () => cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const getCartCount = () => cart.reduce((count, item) => count + item.quantity, 0);

  const checkoutWhatsApp = (customerName) => {
    const phone = "260972626617";
    const nameIntro = customerName ? `My name is *${customerName}* and I` : "I";
    let msg = `Hello Zed Car Electronics! ${nameIntro} would like to book an order:\n\n`;
    cart.forEach(item => {
      msg += `- ${item.quantity}x ${item.name} (K${item.price * item.quantity})\n`;
    });
    msg += `\nTotal: *K${getCartTotal()}*\n\nPlease confirm availability and book a day for my installation.`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartCount,
      checkoutWhatsApp,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);

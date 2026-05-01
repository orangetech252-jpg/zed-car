import { useState, useRef } from 'react';
import { ShoppingCart, Settings, ShieldCheck, Wrench, MapPin, Phone, Clock, FacebookIcon, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS } from './data/products';
import { CartProvider, useCart } from './CartContext';
import CartDrawer from './CartDrawer';

function MainApp() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [currentPage, setCurrentPage] = useState('home'); // 'home' or 'products'
  const { addToCart, getCartCount } = useCart();
  
  // Audio reference for the rev sound
  const audioRef = useRef(new Audio('https://www.soundjay.com/transportation/car-revving-1.mp3'));

  const handleEnterSite = () => {
    audioRef.current.play();
    setHasEntered(true);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans text-[#0A192F]">
      
      {/* 1. ENTRY SCREEN (LAMBORGHINI BUTTON) */}
      <AnimatePresence>
        {!hasEntered && (
          <motion.div 
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 z-[100] bg-[#0A192F] flex flex-col items-center justify-center p-6 text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md"
            >
              <h1 className="text-4xl font-black text-white mb-2 tracking-tighter">ZED CAR ELECTRONICS</h1>
              <p className="text-blue-400 font-bold uppercase tracking-[0.2em] text-sm mb-12">Copperbelt's Finest</p>
              
              <button 
                onClick={handleEnterSite}
                className="group relative px-12 py-6 bg-blue-600 rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(37,99,235,0.4)]"
              >
                <div className="relative z-10 flex items-center gap-3 text-white font-black text-xl italic uppercase">
                  Start Engine <ChevronRight />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <p className="mt-6 text-gray-500 text-xs font-bold uppercase tracking-widest">Tap to Ignite Experience</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* 2. NAVIGATION */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-30 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="cursor-pointer" onClick={() => setCurrentPage('home')}>
            <h1 className="text-xl font-black tracking-tighter">
              ZED CAR <span className="text-blue-600">ELECTRONICS</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex gap-6 font-bold text-sm uppercase tracking-widest">
              <button onClick={() => setCurrentPage('home')} className={currentPage === 'home' ? 'text-blue-600' : 'text-gray-400 hover:text-blue-600'}>Home</button>
              <button onClick={() => setCurrentPage('products')} className={currentPage === 'products' ? 'text-blue-600' : 'text-gray-400 hover:text-blue-600'}>Store</button>
            </div>
            <button onClick={() => setIsCartOpen(true)} className="relative p-2 text-[#0A192F] hover:bg-gray-100 rounded-full transition">
              <ShoppingCart size={24} />
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-black rounded-full h-5 w-5 flex items-center justify-center border-2 border-white shadow-md">
                  {getCartCount()}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* 3. PAGE ROUTING LOGIC */}
      <AnimatePresence mode="wait">
        {currentPage === 'home' ? (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* HOME PAGE CONTENT */}
<header className="relative h-[80vh] flex items-center justify-center text-white overflow-hidden">
  {/* The Background Image */}
  <div 
    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 hover:scale-105"
    style={{ 
      backgroundImage: `url('https://images.unsplash.com/photo-1603553329474-99f95f35394f?auto=format&fit=crop&q=80&w=2000')`,
    }}
  />
  
  {/* The Dark Overlay (Makes text pop) */}
  <div className="absolute inset-0 bg-gradient-to-b from-[#0A192F]/80 via-[#0A192F]/40 to-[#0A192F]/90" />

  {/* The Content */}
  <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <span className="bg-blue-600 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.3em] mb-6 inline-block shadow-lg">
        Precision Engineering
      </span>
      <h2 className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter">
        UPGRADE <br />
        <span className="text-blue-500 underline decoration-white/10">YOUR RIDE</span>
      </h2>
      <p className="text-gray-200 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-medium leading-relaxed italic">
        "The Copperbelt's premier destination for high-end Android integration and cinematic car audio."
      </p>
      <div className="flex flex-col md:flex-row items-center justify-center gap-6">
        <button 
          onClick={() => setCurrentPage('products')} 
          className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-black px-12 py-5 rounded-2xl transition-all shadow-[0_20px_50px_rgba(37,99,235,0.3)] uppercase tracking-widest flex items-center justify-center gap-3 group"
        >
          View Catalog <ChevronRight className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  </div>
  
  {/* Bottom Accent Line */}
  <div className="absolute bottom-0 left-0 w-full h-2 bg-blue-600 shadow-[0_-10px_20px_rgba(37,99,235,0.5)]" />
</header>

            <section className="py-24 bg-white">
              <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="text-center p-6">
                  <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-blue-600 shadow-inner"><Tool size={32}/></div>
                  <h4 className="text-xl font-black mb-4 uppercase tracking-tight">Precision Install</h4>
                  <p className="text-gray-500 leading-relaxed">No messy wires. We provide factory-finish installations for every vehicle type.</p>
                </div>
                <div className="text-center p-6 border-y md:border-y-0 md:border-x border-gray-100">
                  <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-blue-600 shadow-inner"><ShieldCheck size={32}/></div>
                  <h4 className="text-xl font-black mb-4 uppercase tracking-tight">Service Warranty</h4>
                  <p className="text-gray-500 leading-relaxed">All products come with our exclusive 6-month shop warranty for peace of mind.</p>
                </div>
                <div className="text-center p-6">
                  <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-blue-600 shadow-inner"><MapPin size={32}/></div>
                  <h4 className="text-xl font-black mb-4 uppercase tracking-tight">Kitwe Base</h4>
                  <p className="text-gray-500 leading-relaxed">Visit us at our central shop for a live demo of any system before you buy.</p>
                </div>
              </div>
            </section>
          </motion.div>
        ) : (
          <motion.div key="store" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="max-w-6xl mx-auto px-4 py-16">
            {/* PRODUCTS PAGE CONTENT */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b-2 border-gray-100 pb-10">
              <div>
                <h3 className="text-5xl font-black text-[#0A192F] tracking-tighter">THE CATALOG</h3>
                <p className="text-blue-600 font-bold uppercase tracking-[0.3em] text-xs mt-2">Premium Inventory / 2026</p>
              </div>
              <button onClick={() => setCurrentPage('home')} className="text-gray-400 font-bold uppercase text-xs tracking-widest flex items-center gap-2 hover:text-gray-900 transition">
                &larr; Back Home
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {PRODUCTS.map((product, index) => (
                <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 group">
                  <div className="overflow-hidden h-56 relative">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute top-4 left-4 bg-[#0A192F] text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{product.category}</div>
                  </div>
                  <div className="p-8">
                    <h4 className="font-bold text-gray-900 mb-6 h-12 line-clamp-2 text-lg leading-tight group-hover:text-blue-600 transition-colors">{product.name}</h4>
                    <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                      <span className="text-2xl font-black text-[#0A192F]">K{product.price}</span>
                      <button onClick={() => addToCart(product)} className="bg-blue-600 text-white w-12 h-12 rounded-2xl flex items-center justify-center font-bold hover:bg-[#0A192F] transition-all shadow-lg active:scale-90">
                        +
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-100 pt-20 pb-10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h4 className="text-xl font-black mb-4">ZED CAR ELECTRONICS</h4>
          <div className="flex justify-center gap-8 mb-10 text-gray-400 font-bold uppercase text-[10px] tracking-widest">
            <div className="flex items-center gap-2"><Phone size={14} className="text-blue-600"/> +260 000 000 000</div>
            <div className="flex items-center gap-2"><Clock size={14} className="text-blue-600"/> Open 08:00 - 17:00</div>
          </div>
          <p className="text-gray-300 text-xs">Developed by Your Agency Name</p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <MainApp />
    </CartProvider>
  );
}

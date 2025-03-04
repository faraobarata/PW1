import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { WiDaySunny } from 'react-icons/wi';
import { IoSearchOutline } from 'react-icons/io5';
import ThemeToggle from './ThemeToggle';
import CitySearchInput from '../Weather/CitySearchInput';
import { useState } from 'react';

function Navbar() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="w-full bg-white/90 dark:bg-gray-900/90 shadow-lg shadow-black/20 backdrop-blur-md">
        <div className="max-w-7xl w-full mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center"
            >
              <Link to="/" className="flex items-center space-x-2">
                <WiDaySunny className="h-8 w-8 text-yellow-500" />
                <span className="text-xl font-bold text-gray-900 dark:text-white">Weather Ceará</span>
              </Link>
            </motion.div>
            
            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  onClick={toggleSearch}
                  className="relative group"
                >
                  <motion.div
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-sm group-hover:blur-md transition-all duration-300"
                    animate={{
                      scale: isSearchVisible ? 1.1 : 1,
                      opacity: isSearchVisible ? 0.8 : 0.5,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.span
                    className="relative flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-medium hover:from-blue-400 hover:to-purple-400 transition-all duration-300"
                    whileHover={{
                      textShadow: "0 0 8px rgb(59, 130, 246, 0.5)"
                    }}
                    animate={{
                      scale: [1, 1.05, 1],
                      transition: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }
                    }}
                  >
                    <IoSearchOutline className={`w-5 h-5 transition-transform duration-300 ${isSearchVisible ? 'rotate-90' : 'rotate-0'}`} />
                    Buscar Cidade
                  </motion.span>
                </button>
              </motion.div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      <CitySearchInput 
        isVisible={isSearchVisible}
        onClose={() => setIsSearchVisible(false)}
        placeholder="Digite o nome da cidade..."
      />
    </header>
  );
}

export default Navbar; 
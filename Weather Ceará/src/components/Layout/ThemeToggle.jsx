import { useState, useEffect } from 'react';
import { WiMoonAltWaningCrescent4, WiDaySunny } from 'react-icons/wi';
import { motion } from 'framer-motion';

function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 rounded-full bg-gray-800/50 dark:bg-white/10 text-yellow-500 dark:text-blue-400 hover:bg-gray-700/50 dark:hover:bg-white/20 transition-colors"
      aria-label="Alternar tema"
    >
      {darkMode ? (
        <WiMoonAltWaningCrescent4 className="w-6 h-6" />
      ) : (
        <WiDaySunny className="w-6 h-6" />
      )}
    </motion.button>
  );
}

export default ThemeToggle; 
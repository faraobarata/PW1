import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { IoLocationSharp } from 'react-icons/io5';
import { debounce } from 'lodash';

const API_KEY = import.meta.env.VITE_ACCUWEATHER_API_KEY;
const BASE_URL = 'https://dataservice.accuweather.com';

function CitySearchInput({ isVisible = false, onClose, placeholder = "Buscar cidade..." }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  useEffect(() => {
    if (isVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isVisible]);

  // Função para buscar cidades com debounce
  const searchCities = debounce(async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/locations/v1/cities/BR/CE/search`, {
        params: {
          apikey: API_KEY,
          q: query,
          language: 'pt-br'
        }
      });
      setSuggestions(response.data || []);
    } catch (error) {
      console.error('Erro ao buscar sugestões:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, 300);

  useEffect(() => {
    searchCities(searchTerm);
    return () => searchCities.cancel();
  }, [searchTerm]);

  // Fecha as sugestões quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target) &&
          inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setShowSuggestions(true);
  };

  const handleCitySelect = (city) => {
    setSearchTerm(city.LocalizedName);
    setShowSuggestions(false);
    navigate(`/clima/${encodeURIComponent(city.LocalizedName)}`);
    if (onClose) onClose();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ 
            opacity: 0, 
            y: -20, 
            scale: 0.9,
            transition: { duration: 0.2 }
          }}
          className="fixed top-20 left-0 right-0 z-50 px-4 max-w-2xl mx-auto"
        >
          <div className="relative w-full">
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl opacity-50 blur-sm group-hover:opacity-75 animate-gradient-xy"
              animate={{
                scale: [1, 1.02, 1],
                rotate: [0, 360],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              onFocus={() => setShowSuggestions(true)}
              placeholder={placeholder}
              className="relative w-full px-6 py-4 text-lg bg-gray-900/90 border-2 border-transparent rounded-2xl text-white placeholder-blue-200/70 focus:outline-none focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 backdrop-blur-sm"
            />

            <AnimatePresence>
              {showSuggestions && (searchTerm.trim() || isLoading) && (
                <motion.div
                  ref={suggestionsRef}
                  initial={{ opacity: 0, y: -10, scaleY: 0.8 }}
                  animate={{ opacity: 1, y: 0, scaleY: 1 }}
                  exit={{ opacity: 0, y: -10, scaleY: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute w-full mt-2 py-2 bg-gray-800/95 backdrop-blur-md rounded-xl shadow-xl z-50 border border-gray-700 overflow-hidden"
                >
                  {isLoading ? (
                    <motion.div 
                      className="px-4 py-3 text-gray-400"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      Buscando...
                    </motion.div>
                  ) : suggestions.length > 0 ? (
                    suggestions.map((city, index) => (
                      <motion.button
                        key={city.Key}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => handleCitySelect(city)}
                        className="w-full px-4 py-3 text-left hover:bg-gray-700/50 flex items-center gap-3 text-gray-200 transition-colors"
                      >
                        <IoLocationSharp className="text-blue-400" />
                        <span>{city.LocalizedName}, CE - Brasil</span>
                      </motion.button>
                    ))
                  ) : searchTerm.trim() ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="px-4 py-3 text-gray-400"
                    >
                      Nenhuma cidade encontrada
                    </motion.div>
                  ) : null}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CitySearchInput; 
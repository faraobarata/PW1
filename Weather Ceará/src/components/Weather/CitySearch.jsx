import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { WiDaySunny, WiCloud, WiRain, WiStrongWind } from 'react-icons/wi';
import toast from 'react-hot-toast';
import { weatherService } from '../../services/weatherService';
import CitySearchInput from './CitySearchInput';

function CitySearch() {
  const [cidade, setCidade] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cidade.trim()) return;

    setIsSearching(true);
    try {
      // Verifica se a cidade existe antes de navegar
      await weatherService.getCoordinates(cidade.trim());
      navigate(`/clima/${encodeURIComponent(cidade.trim())}`);
    } catch (error) {
      toast.error('Cidade não encontrada. Verifique o nome e tente novamente.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleCityClick = (selectedCity) => {
    navigate(`/clima/${encodeURIComponent(selectedCity)}`);
  };

  const popularCities = [
    { name: 'Fortaleza', icon: <WiDaySunny className="text-3xl text-yellow-400" /> },
    { name: 'Juazeiro do Norte', icon: <WiCloud className="text-3xl text-gray-300" /> },
    { name: 'Sobral', icon: <WiRain className="text-3xl text-blue-400" /> },
    { name: 'Caucaia', icon: <WiStrongWind className="text-3xl text-green-400" /> }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Elementos decorativos de fundo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Conteúdo principal */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <WiDaySunny className="text-6xl text-yellow-400 mr-4" />
            <h1 className="text-5xl font-bold text-white">Weather Ceará</h1>
          </div>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Sua fonte confiável para previsão do tempo no Ceará. Informações precisas e atualizadas para todas as cidades do estado.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-xl mb-12"
        >
          <CitySearchInput placeholder="Digite o nome da cidade..." />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="w-full max-w-4xl"
        >
          <h2 className="text-xl text-blue-200 mb-6 text-center">Principais cidades</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularCities.map((city) => (
              <motion.button
                key={city.name}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCityClick(city.name)}
                className="group relative overflow-hidden p-6 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-between">
                  <span className="text-lg font-medium text-white">{city.name}</span>
                  {city.icon}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="absolute bottom-0 left-0 right-0 text-center p-8 text-sm text-blue-200/80"
        >
          <p className="mb-2">© 2024 Weather Ceará. Todos os direitos reservados.</p>
          <div className="flex items-center justify-center space-x-4">
            <a href="#" className="hover:text-white transition-colors">Sobre</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">Termos</a>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}

export default CitySearch; 
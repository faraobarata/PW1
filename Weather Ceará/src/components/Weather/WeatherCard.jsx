import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { motion } from 'framer-motion';
import { WiThermometer } from 'react-icons/wi';

function WeatherCard({ weather }) {
  if (!weather) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99]
      }}
      className="relative w-full max-w-xl rounded-[2rem] p-1 overflow-hidden"
    >
      {/* Gradiente de fundo animado */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-purple-600/30 to-pink-600/30 animate-gradient-slow rounded-[2rem]" />
      
      {/* Efeito de brilho */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-transparent to-purple-400/10 backdrop-blur-xl rounded-[2rem]" />
      
      {/* Conteúdo principal com efeito glassmorphism */}
      <div className="relative bg-white/10 backdrop-blur-xl rounded-[2rem] p-8 overflow-hidden">
        {/* Elementos decorativos */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl transform translate-x-20 -translate-y-20" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl transform -translate-x-20 translate-y-20" />

        <div className="relative flex flex-col z-10">
          {/* Cabeçalho */}
          <div className="flex justify-between items-start mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                {weather.name}, CE
              </h1>
              <p className="text-blue-100/80">
                {format(new Date(), "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR })}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-light text-blue-100"
            >
              {format(new Date(), 'HH:mm')}
            </motion.div>
          </div>

          {/* Informações do clima */}
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex-1"
            >
              <div className="relative">
                <div className="text-8xl font-light mb-4 text-white">
                  {Math.round(weather.main.temp)}
                  <span className="text-5xl align-top">°C</span>
                </div>
                <div className="flex items-center space-x-4 text-blue-100/80">
                  <div className="flex items-center">
                    <WiThermometer className="w-6 h-6 mr-1" />
                    <span>{Math.round(weather.main.temp_max)}° / {Math.round(weather.main.temp_min)}°</span>
                  </div>
                  <span>•</span>
                  <span className="capitalize">{weather.weather[0].description}</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                delay: 0.5,
                type: "spring",
                stiffness: 100
              }}
              className="flex-shrink-0 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full filter blur-md" />
              <img
                src={weather.weather[0].icon}
                alt={weather.weather[0].description}
                className="w-40 h-40 object-contain drop-shadow-2xl"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default WeatherCard; 
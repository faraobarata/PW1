import { WiThermometer, WiRaindrop, WiStrongWind, WiHumidity } from 'react-icons/wi';
import { BsSunFill } from 'react-icons/bs';
import { motion } from 'framer-motion';

function WeatherDetails({ weather }) {
  if (!weather) return null;

  const details = [
    {
      label: 'Sensação térmica',
      value: `${Math.round(weather.main.feels_like)}°C`,
      icon: <WiThermometer className="w-8 h-8" />
    },
    {
      label: 'Probabilidade de chuva',
      value: `${weather.precipitation_probability}%`,
      icon: <WiRaindrop className="w-8 h-8" />
    },
    {
      label: 'Velocidade do vento',
      value: `${Math.round(weather.wind.speed)} km/h`,
      icon: <WiStrongWind className="w-8 h-8" />
    },
    {
      label: 'Umidade do ar',
      value: `${weather.main.humidity}%`,
      icon: <WiHumidity className="w-8 h-8" />
    },
    {
      label: 'Índice UV',
      value: Math.round(weather.uv_index),
      icon: <BsSunFill className="w-6 h-6" />
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="w-full"
    >
      <h2 className="text-xl font-semibold text-blue-100 mb-6">Detalhes do clima hoje</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {details.map((detail, index) => (
          <motion.div
            key={detail.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="glass-card p-4 rounded-2xl relative overflow-hidden group hover:bg-white/20 transition-all duration-300"
          >
            {/* Gradiente de fundo */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative flex items-center justify-between z-10">
              <div className="flex items-center gap-4">
                <div className="text-blue-300 group-hover:text-blue-200 transition-colors duration-300">
                  {detail.icon}
                </div>
                <div>
                  <p className="text-sm text-blue-200/80 group-hover:text-blue-100 transition-colors duration-300">
                    {detail.label}
                  </p>
                  <p className="text-xl font-semibold text-white">
                    {detail.value}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default WeatherDetails; 
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { weatherService } from '../../services/weatherService';
import { WiDaySunny, WiCloudy, WiRain, WiDayCloudy, WiSnow, WiThunderstorm } from 'react-icons/wi';
import toast from 'react-hot-toast';
import { format, addDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';

function WeatherForecast({ city }) {
  const { data: forecast, isLoading } = useQuery({
    queryKey: ['forecast', city],
    queryFn: () => weatherService.getForecast(city),
    onError: () => {
      toast.error('Erro ao carregar previsão do tempo');
    }
  });

  if (isLoading || !forecast) return null;

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'Clear':
        return <WiDaySunny className="w-8 h-8 text-yellow-400" />;
      case 'Clouds':
        return <WiCloudy className="w-8 h-8 text-gray-400" />;
      case 'Rain':
        return <WiRain className="w-8 h-8 text-blue-400" />;
      case 'Snow':
        return <WiSnow className="w-8 h-8 text-blue-200" />;
      case 'Thunderstorm':
        return <WiThunderstorm className="w-8 h-8 text-yellow-500" />;
      default:
        return <WiDayCloudy className="w-8 h-8 text-gray-400" />;
    }
  };

  const days = forecast.list.map((day, index) => {
    if (index === 0) return 'Amanhã';
    return format(addDays(new Date(), index + 1), 'EEEE', { locale: ptBR });
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="w-full max-w-md"
    >
      <h2 className="text-xl text-gray-400 mb-4">Previsão para 5 dias</h2>
      <div className="grid grid-cols-5 gap-2">
        {forecast.list.slice(1).map((day, index) => (
          <div
            key={day.dt}
            className="flex flex-col items-center bg-gray-800/50 rounded-2xl p-4"
          >
            <span className="text-sm text-gray-400 mb-2">{days[index]}</span>
            {getWeatherIcon(day.weather[0].main)}
            <div className="mt-2 text-center">
              <div className="text-white">{Math.round(day.main.temp)}°C</div>
              <div className="text-xs text-gray-400">{Math.round(day.main.temp_min)}°C</div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default WeatherForecast; 
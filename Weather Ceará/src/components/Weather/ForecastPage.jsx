import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { WiThermometer, WiHumidity, WiStrongWind } from 'react-icons/wi';
import { weatherService } from '../../services/weatherService';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import toast from 'react-hot-toast';

function ForecastPage() {
  const { cidade } = useParams();

  const { data: forecast, isLoading, error } = useQuery({
    queryKey: ['forecast', cidade],
    queryFn: () => weatherService.getForecast(cidade),
    onError: (err) => {
      toast.error('Erro ao carregar previsão do tempo');
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Erro ao carregar dados</h2>
        <Link to="/" className="text-blue-500 hover:underline">Voltar para busca</Link>
      </div>
    );
  }

  // Agrupa previsões por dia
  const groupedForecast = forecast.list.reduce((acc, item) => {
    const date = format(new Date(item.dt * 1000), 'yyyy-MM-dd');
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Previsão para {forecast.city.name}</h1>
            <p className="text-xl">Próximos 5 dias</p>
          </div>

          <div className="space-y-6">
            {Object.entries(groupedForecast).slice(0, 5).map(([date, forecasts]) => {
              const dayForecast = forecasts[0];
              return (
                <div key={date} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">
                    {format(new Date(date), "EEEE, d 'de' MMMM", { locale: ptBR })}
                  </h3>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex items-center space-x-3">
                      <WiThermometer className="text-3xl text-red-500" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Temperatura</p>
                        <p className="font-semibold">
                          {Math.round(dayForecast.main.temp)}°C
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <WiHumidity className="text-3xl text-blue-500" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Umidade</p>
                        <p className="font-semibold">
                          {dayForecast.main.humidity}%
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <WiStrongWind className="text-3xl text-green-500" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Vento</p>
                        <p className="font-semibold">
                          {Math.round(dayForecast.wind.speed * 3.6)} km/h
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {dayForecast.weather[0].description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex justify-between">
            <Link
              to={`/clima/${cidade}`}
              className="text-blue-500 hover:underline"
            >
              Voltar para clima atual
            </Link>
            <Link
              to="/"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Nova busca
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default ForecastPage; 
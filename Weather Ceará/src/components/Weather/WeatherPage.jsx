import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { weatherService } from '../../services/weatherService';
import toast from 'react-hot-toast';
import WeatherCard from './WeatherCard';
import WeatherDetails from './WeatherDetails';
import WeatherForecast from './WeatherForecast';
import CitySearchInput from './CitySearchInput';

function WeatherPage() {
  const { cidade } = useParams();
  const navigate = useNavigate();

  const { data: weather, isLoading, error } = useQuery({
    queryKey: ['weather', cidade],
    queryFn: () => weatherService.getCurrentWeather(cidade),
    onError: (err) => {
      toast.error('Erro ao carregar dados do clima');
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Erro ao carregar dados</h2>
        <button
          onClick={() => navigate('/')}
          className="text-blue-500 hover:underline"
        >
          Voltar para página inicial
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="w-full lg:w-auto">
            <div className="mb-6">
              <CitySearchInput />
            </div>
            <WeatherCard weather={weather} />
          </div>
          
          <div className="flex-1 space-y-8">
            <WeatherDetails weather={weather} />
            <WeatherForecast city={cidade} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherPage; 
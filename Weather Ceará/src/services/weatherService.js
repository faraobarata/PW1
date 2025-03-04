import axios from 'axios';
import { cacheService } from './cacheService';

const API_KEY = import.meta.env.VITE_ACCUWEATHER_API_KEY;
const BASE_URL = 'https://dataservice.accuweather.com';

export const weatherService = {
  async getLocationKey(city) {
    const cacheKey = cacheService.getCacheKey(city, 'location');
    const cachedData = cacheService.getItem(cacheKey);
    
    if (cachedData) {
      return cachedData;
    }

    try {
      const response = await axios.get(`${BASE_URL}/locations/v1/cities/BR/CE/search`, {
        params: {
          apikey: API_KEY,
          q: city,
          language: 'pt-br'
        }
      });

      if (!response.data?.length) {
        throw new Error('Cidade não encontrada no Ceará');
      }

      const locationData = response.data[0];
      cacheService.setItem(cacheKey, locationData);
      return locationData;
    } catch (error) {
      console.error('Erro na busca:', error);
      if (error.response?.status === 401) {
        throw new Error('Erro de autenticação com a API');
      }
      throw new Error('Erro ao buscar dados da cidade');
    }
  },

  async getCurrentWeather(city) {
    const cacheKey = cacheService.getCacheKey(city, 'current');
    const cachedData = cacheService.getItem(cacheKey);
    
    if (cachedData) {
      return cachedData;
    }

    try {
      const location = await this.getLocationKey(city);
      
      const [currentResponse, forecastResponse] = await Promise.all([
        axios.get(`${BASE_URL}/currentconditions/v1/${location.Key}`, {
          params: {
            apikey: API_KEY,
            language: 'pt-br',
            details: true
          }
        }),
        axios.get(`${BASE_URL}/forecasts/v1/daily/1day/${location.Key}`, {
          params: {
            apikey: API_KEY,
            language: 'pt-br',
            metric: true,
            details: true
          }
        })
      ]);

      const current = currentResponse.data[0];
      const forecast = forecastResponse.data;

      const weatherData = {
        name: location.LocalizedName,
        admin1: location.AdministrativeArea.LocalizedName,
        country: location.Country.LocalizedName,
        main: {
          temp: current.Temperature.Metric.Value,
          feels_like: current.RealFeelTemperature.Metric.Value,
          temp_min: forecast.DailyForecasts[0].Temperature.Minimum.Value,
          temp_max: forecast.DailyForecasts[0].Temperature.Maximum.Value,
          humidity: current.RelativeHumidity
        },
        wind: {
          speed: current.Wind.Speed.Metric.Value,
          direction: current.Wind.Direction.Localized
        },
        weather: [{
          main: this.getWeatherCondition(current.WeatherIcon),
          description: current.WeatherText.toLowerCase(),
          icon: `https://www.accuweather.com/images/weathericons/${current.WeatherIcon.toString().padStart(2, '0')}.svg`
        }],
        uv_index: current.UVIndex,
        precipitation_probability: forecast.DailyForecasts[0].Day.PrecipitationProbability || 0,
        visibility: current.Visibility.Metric.Value,
        pressure: current.Pressure.Metric.Value
      };

      cacheService.setItem(cacheKey, weatherData);
      return weatherData;
    } catch (error) {
      console.error('Erro no clima:', error);
      if (error.response?.status === 401) {
        throw new Error('Erro de autenticação com a API');
      }
      throw new Error('Erro ao buscar dados do clima');
    }
  },

  async getForecast(city) {
    const cacheKey = cacheService.getCacheKey(city, 'forecast');
    const cachedData = cacheService.getItem(cacheKey);
    
    if (cachedData) {
      return cachedData;
    }

    try {
      const location = await this.getLocationKey(city);
      
      const response = await axios.get(`${BASE_URL}/forecasts/v1/daily/5day/${location.Key}`, {
        params: {
          apikey: API_KEY,
          language: 'pt-br',
          metric: true,
          details: true
        }
      });

      const forecastData = {
        city: {
          name: location.LocalizedName,
          country: location.Country.LocalizedName
        },
        list: response.data.DailyForecasts.map(day => ({
          dt: new Date(day.Date).getTime() / 1000,
          date: day.Date,
          main: {
            temp: day.Temperature.Maximum.Value,
            temp_min: day.Temperature.Minimum.Value,
            temp_max: day.Temperature.Maximum.Value,
            humidity: day.Day.RelativeHumidity,
            feels_like: day.RealFeelTemperature.Maximum.Value
          },
          weather: [{
            main: this.getWeatherCondition(day.Day.Icon),
            description: day.Day.IconPhrase.toLowerCase(),
            icon: `https://www.accuweather.com/images/weathericons/${day.Day.Icon.toString().padStart(2, '0')}.svg`
          }],
          precipitation_probability: day.Day.PrecipitationProbability,
          wind: {
            speed: day.Day.Wind.Speed.Value,
            direction: day.Day.Wind.Direction.Localized
          },
          details: {
            cloud_cover: day.Day.CloudCover,
            uv_index: day.AirAndPollen.find(item => item.Name === 'UVIndex')?.Value || 0,
            rain_amount: day.Day.Rain.Value,
            snow_amount: day.Day.Snow.Value,
            ice_amount: day.Day.Ice.Value
          }
        }))
      };

      cacheService.setItem(cacheKey, forecastData);
      return forecastData;
    } catch (error) {
      console.error('Erro na previsão:', error);
      if (error.response?.status === 401) {
        throw new Error('Erro de autenticação com a API');
      }
      throw new Error('Erro ao buscar previsão do tempo');
    }
  },

  // Mapeia os ícones do AccuWeather para condições climáticas
  getWeatherCondition(iconNumber) {
    // Sunny
    if ([1, 2, 3].includes(iconNumber)) return 'Clear';
    // Cloudy
    if ([4, 5, 6, 7, 8].includes(iconNumber)) return 'Clouds';
    // Rain
    if ([12, 13, 14, 15, 16, 17, 18].includes(iconNumber)) return 'Rain';
    // Snow
    if ([19, 20, 21, 22, 23, 24, 25, 26, 29].includes(iconNumber)) return 'Snow';
    // Thunder
    if ([15, 16, 17, 41, 42].includes(iconNumber)) return 'Thunderstorm';
    return 'Clouds';
  },

  // Mapeia os ícones do AccuWeather para ícones do OpenWeather
  getWeatherIcon(iconNumber) {
    // Converte o número do ícone para string com dois dígitos
    const icon = iconNumber.toString().padStart(2, '0');
    return `https://developer.accuweather.com/sites/default/files/${icon}-s.png`;
  }
}; 
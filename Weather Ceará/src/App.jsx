import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Layout/Navbar';
import WeatherPage from './components/Weather/WeatherPage';
import ForecastPage from './components/Weather/ForecastPage';
import CitySearch from './components/Weather/CitySearch';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="flex flex-col min-h-screen w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <Toaster position="top-right" />
          <Navbar />
          <main className="flex-1 w-full mt-16">
            <div className="min-h-[calc(100vh-4rem)] w-full">
              <Routes>
                <Route path="/" element={<CitySearch />} />
                <Route path="/clima/:cidade" element={<WeatherPage />} />
                <Route path="/previsao/:cidade" element={<ForecastPage />} />
              </Routes>
            </div>
          </main>
          <footer className="w-full py-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm mt-auto border-t border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 lg:px-8">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  © 2024 WeatherApp. Todos os direitos reservados.
                </div>
                <div className="flex space-x-6">
                  <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                    Sobre
                  </a>
                  <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                    Privacidade
                  </a>
                  <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                    Termos
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
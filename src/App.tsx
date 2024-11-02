import { HashRouter, Routes, Route} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "react-query";

import './App.css';

import Dashboard from './components/Dashboard'
import OverviewPage from './pages/OverviewPage';
import LoginPage from './pages/LoginPage';
import MapPage from './pages/MapPage';
import SocialPage from './pages/SocialPage';
import { useEffect } from 'react';

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    const userLatitude = localStorage.getItem('latitude');
    const userLongitude = localStorage.getItem('longitude')

    if (!userLatitude) localStorage.setItem('latitude', '27.7')
    if (!userLongitude) localStorage.setItem('longitude', '-77')

  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <Routes>
          <Route path='/' element={<Dashboard />}>
            <Route index element={<OverviewPage />} />
            <Route path='map' element={<MapPage />} />
            <Route path='social' element={<SocialPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </QueryClientProvider>
  );
}

export default App;

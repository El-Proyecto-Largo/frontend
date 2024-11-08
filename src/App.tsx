import { Routes, Route, BrowserRouter, HashRouter} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "react-query";

import './App.css';

import Dashboard from './components/Dashboard'
import OverviewPage from './pages/OverviewPage';
import LoginPage from './pages/LoginPage';
import MapPage from './pages/MapPage';
import SocialPage from './pages/SocialPage';
import { useEffect } from 'react';
import PostPage from './pages/PostPage';
import RegisterPage from './pages/RegisterPage';

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
      <BrowserRouter>
        <Routes>
          <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<RegisterPage />} />
          <Route path='/' element={<Dashboard />}>
            <Route index element={<SocialPage />} />
            <Route path='map' element={<MapPage />} />
            <Route path='posts' element={<SocialPage />} />
            <Route path='posts/:id' element={<PostPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

import { Routes, Route, BrowserRouter, Navigate, Outlet} from 'react-router-dom';
import { QueryClient, QueryClientProvider, useMutation, useQuery, useQueryClient } from "react-query";
import { useState } from 'react';

import './App.css';

import Dashboard from './components/Dashboard'
// import OverviewPage from './pages/OverviewPage';
import LoginPage from './pages/LoginPage';
import MapPage from './pages/MapPage';
import SocialPage from './pages/SocialPage';
import { useEffect } from 'react';
import PostPage from './pages/PostPage';
import RegisterPage from './pages/RegisterPage';

const queryClient = new QueryClient();
import axios from 'axios';

function App() {
  const [isValidToken, setIsValidToken] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  function PrivateRoute() {
    if (!isLoading) {
      return isValidToken ? <Outlet /> : <Navigate to="/login" replace />;
    }
    else if (isLoading) {
      return <></>
    }
  }
  
  function AnonymousRoute() {
    return isValidToken ? <Navigate to="/" replace /> : <Outlet />;
  }

  useEffect(() => {
    const userDataString = localStorage.getItem("userData");
    const userData = userDataString ? JSON.parse(userDataString) : null;
    const token = userData ? userData["token"] : null;
    const userId = userData ? userData["userId"] : null;

    const checkToken = async () => {
      if (token && userId) {
        setIsLoading(true);
        try {
          const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer: ${token}`,
          }
          const response = await axios.get("http://localhost:5000/api/authenticate", {
            headers: headers,
          });
    
          if (response.status === 200) {
            setIsValidToken(true);
            setIsLoading(false);
          }
          else {
            setIsValidToken(false);
            setIsLoading(false);
          }
        } catch (error) {
          console.log(error);
        }
      }
      else {
        setIsValidToken(false);
        setIsLoading(false);
      }
    }

    checkToken();

  }, [])

  useEffect(() => {
    const userLatitude = localStorage.getItem('latitude');
    const userLongitude = localStorage.getItem('longitude')
    const zipCode = localStorage.getItem('zip');

    if (!userLatitude) localStorage.setItem('latitude', '27.7');
    if (!userLongitude) localStorage.setItem('longitude', '-77');
    if (!zipCode) localStorage.setItem('zip', '32826');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path='/' element={<Dashboard />}>
              <Route index element={<SocialPage />} />
              <Route path='map' element={<MapPage />} />
              <Route path='posts' element={<SocialPage />} />
              <Route path='posts/:id' element={<PostPage />} />
            </Route>
          </Route>
          <Route element={<AnonymousRoute />}>
            <Route path='login' element={<LoginPage />} />
            <Route path='register' element={<RegisterPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

import { Routes, Route, BrowserRouter, HashRouter, Navigate, Outlet} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "react-query";
import { useState } from 'react';

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
import axios from 'axios';

function App() {
  const [isValidToken, setIsValidToken] = useState(false);

  function PrivateRoute() {
    return isValidToken ? <Outlet /> : <Navigate to="/login" replace />;
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
        try {
          const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer: ${token}`,
          }
          const response = await axios.post("http://localhost:5000/api/authenticate", {"userId": userId}, {
            headers: headers,
          });
    
          if (response.status === 200) {
            setIsValidToken(true);
          }
          else {
            setIsValidToken(false);
          }
        } catch (error) {
          console.log(error);
        }
      }
      else {
        setIsValidToken(false);
      }
    }

    if (token) {
      checkToken();
    }

  }, [])

  useEffect(() => {
    const userLatitude = localStorage.getItem('latitude');
    const userLongitude = localStorage.getItem('longitude')

    if (!userLatitude) localStorage.setItem('latitude', '27.7')
    if (!userLongitude) localStorage.setItem('longitude', '-77')
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
          {/* <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<RegisterPage />} />
          <Route path='/' element={<Dashboard />}>
            <Route index element={<SocialPage />} />
            <Route path='map' element={<MapPage />} />
            <Route path='posts' element={<SocialPage />} />
            <Route path='posts/:id' element={<PostPage />} />
          </Route> */}
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

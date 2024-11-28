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
import OverviewPage from './pages/OverviewPage';

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

  function isValidJSON(json: string | null) {
    try {
      JSON.parse(json);
    }
    catch (e) {
      return false
    }
    return true;
  }

  useEffect(() => {
    const userDataString = localStorage.getItem("userData");
    const userData = isValidJSON(userDataString) ? JSON.parse(userDataString) : null;
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
          const response = await axios.get(`${import.meta.env.BASE_URL}/api/authenticate`, {
            headers: headers,
          });
    
          if (response.status === 200) {
            setIsValidToken(true);
            setIsLoading(false);
          }
          else if (response.status == 403) {
            setIsValidToken(false);
            setIsLoading(false);
            localStorage.removeItem('userData');
          }
          else {
            setIsValidToken(false);
            setIsLoading(false);
          }
        } catch (error) {
          localStorage.removeItem('userData');
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
    const locationMetadata = localStorage.getItem('locationMetadata');

    if (!userLatitude) localStorage.setItem('latitude', '28.567');
    if (!userLongitude) localStorage.setItem('longitude', '-81.208');
    if (!locationMetadata) localStorage.setItem('locationMetadata', '{"place_id":279873444,"licence":"Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright","osm_type":"node","osm_id":154012096,"lat":"28.5667957","lon":"-81.2076407","class":"place","type":"village","place_rank":19,"importance":0.3935662231745403,"addresstype":"village","name":"Alafaya","display_name":"Alafaya, Orange County, Florida, 32826, United States","boundingbox":["28.5467957","28.5867957","-81.2276407","-81.1876407"]}');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path='/' element={<Dashboard />}>
              <Route index element={<OverviewPage />} />
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

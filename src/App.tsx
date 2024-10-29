import { HashRouter, Routes, Route} from 'react-router-dom';
import './App.css';

import CardPage from './pages/CardPage';
import Dashboard from './components/Dashboard'
import OverviewPage from './pages/OverviewPage';
import LoginPage from './pages/LoginPage';
import MapPage from './pages/MapPage';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Dashboard />}>
          <Route index element={<OverviewPage />} />
          <Route path='map' element={<MapPage />} />
          <Route path='social' element={<LoginPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;

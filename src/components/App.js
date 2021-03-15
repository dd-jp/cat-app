import axios from 'axios';
import { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { API_KEY } from '../constants/AppRouter';
import AppNav from './app-nav/AppNav';
import AppRouter from './AppRouter';

const App = () => {
  useEffect(() => {
    axios.interceptors.request.use((req) => {
      req.headers['x-api-key'] = API_KEY;
      return req;
    });
  }, []);

  return (
    <div data-testid="app" className="app-container">
      <Router>
        <AppNav />
        <AppRouter />
      </Router>
    </div>
  );
};

export default App;

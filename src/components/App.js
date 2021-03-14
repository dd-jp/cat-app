import { BrowserRouter as Router } from 'react-router-dom';
import AppNav from './app-nav/AppNav';
import AppRouter from './AppRouter';

const App = () => (
  <div data-testid="app" className="app-container">
    <Router>
      <AppNav />
      <AppRouter />
    </Router>
  </div>
);

export default App;

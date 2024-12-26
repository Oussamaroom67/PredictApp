import './App.css';
import { useState } from 'react';
//import RefrshHandler from './components/RefrshHandler';
import AppRoutes from './components/AppRoutes';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="App">
      
      <AppRoutes isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
    </div>
  );
}

export default App;


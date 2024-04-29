import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import DashboardPage from './pages/DashboardPage';
import Prediction from './pages/Prediction';
function App() {
  return (
    <div className="App">
     <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/predict" element={<Prediction />} />
        </Routes>
     </Router>
    </div>
  );
}

export default App;

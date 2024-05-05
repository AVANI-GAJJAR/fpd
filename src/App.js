import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route ,Navigate} from 'react-router-dom';
import Login from './pages/Login';
import DashboardPage from './pages/DashboardPage';
import Prediction from './pages/Prediction';
import Statistics from './pages/Statistics';
function App() {
  const token = localStorage.getItem('token')
  return (
    <div className="App">
     <Router>
        <Routes>
          <Route path="/" element={token?<Navigate to="/dashboard" />:<Navigate to="/predict" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/predict" element={<Prediction />} />
          <Route path="/statistics" element={<Statistics />} />
        </Routes>
     </Router>
    </div>
  );
}

export default App;

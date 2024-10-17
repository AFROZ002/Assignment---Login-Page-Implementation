import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './components/Login';
import Dashboard from "./components/Dashboard";
import ErrorBoundary from "./components/ErrorBoundary";
import OfflineChecker from "./components/OfflineChecker";
import Offline from "./components/Offline";
import './components/All.css';
import './App.css';

const App = () => {
  return (
    <Router>
      <ErrorBoundary>
        <OfflineChecker />
        <div className="container">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/offline" element={<Offline/>}/>
          </Routes>
        </div>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
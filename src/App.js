import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Metrics from './pages/metrics';
import Logs from './pages/logs';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Metrics />} exact />
        <Route path="/logs" element={<Logs />} exact />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

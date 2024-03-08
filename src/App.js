import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Metrics from './pages/metrics/Metrics';
import Logs from './pages/logs/Logs';
import ChartComponent from './pages/chartjs/ChartJs';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Metrics />} exact />
        <Route path="/logs" element={<Logs />} />
        <Route path="/chart" element={<ChartComponent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import OhmLaw from './components/OhmLaw';
import NewtonLaw from './components/NewtonLaw';
import CarMaintenance from './components/CarMaintenance';
import DerivadaRaiz from './components/DerivadaRaiz';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ohm-law" element={<OhmLaw />} />
        <Route path="/newton-law" element={<NewtonLaw />} />
        <Route path="/car-maintenance" element={<CarMaintenance />} />
        <Route path="/derivada-raiz" element={<DerivadaRaiz />} />
      </Routes>
    </Router>
  );
}

export default App;

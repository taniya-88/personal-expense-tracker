import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';

export default function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <nav style={{ marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
          <Link to="/">Dashboard</Link>
          <Link to="/reports">Reports</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

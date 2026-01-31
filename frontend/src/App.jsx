import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import CitizenDashboard from './pages/CitizenDashboard';
import AuthorityDashboard from './pages/AuthorityDashboard';
import ReportComplaint from './pages/ReportComplaint';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null; // Wait for auth check
  return user ? children : <Navigate to="/login" />;
};

const Home = () => {
  const { user, loading } = useAuth();

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface-warm)' }}>
      <div style={{ color: 'var(--sandal-dark)', fontWeight: '700' }}>Synchronizing...</div>
    </div>
  );

  if (!user) return <Navigate to="/login" />;
  if (user.role === 'AUTHORITY' || user.role === 'ADMIN') return <AuthorityDashboard />;
  return <CitizenDashboard />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={
            <PrivateRoute>
              <>
                <Navbar />
                <Home />
              </>
            </PrivateRoute>
          } />

          <Route path="/report" element={
            <PrivateRoute>
              <>
                <Navbar />
                <ReportComplaint />
              </>
            </PrivateRoute>
          } />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home          from './pages/Home';
import About         from './pages/About';
import Training      from './pages/Training';
import Placement     from './pages/Placement';
import Testimonials  from './pages/Testimonials';
import Contact       from './pages/Contact';
import Verify        from './pages/Verify';
import AdminLogin    from './pages/admin/AdminLogin';
import AdminLayout   from './pages/admin/AdminLayout';
import CandidateList from './pages/admin/CandidateList';
import AddEditCandidate from './pages/admin/AddEditCandidate';
import { AuthProvider, useAuth } from './context/AuthContext';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
}

function PublicLayout() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-[72px]">
        <Routes>
          <Route path="/"             element={<Home />} />
          <Route path="/about"        element={<About />} />
          <Route path="/training"     element={<Training />} />
          <Route path="/placement"    element={<Placement />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact"      element={<Contact />} />
          <Route path="/verify"       element={<Verify />} />
          <Route path="/verify/:certNumber" element={<Verify />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Navigate to="/admin/candidates" replace />
            </ProtectedRoute>
          }
        />
        {/* Public routes */}
        <Route path="/*" element={<PublicLayout />} />
      </Routes>
    </AuthProvider>
  );
}

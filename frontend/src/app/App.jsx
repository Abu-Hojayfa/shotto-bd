import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import { Landing } from './components/pages/Landing';
import { ReportFlow } from './components/pages/ReportFlow';
import { Dashboard } from './components/pages/Dashboard';
import { OfficeRating } from './components/pages/OfficeRating';
import { Chatbot } from './components/pages/Chatbot';
import { EmergencyMode } from './components/pages/EmergencyMode';
import { Profile } from './components/pages/Profile';
import { MyReports } from './components/pages/MyReports';
import { DesignSystem } from './components/pages/DesignSystem';
import { Login } from './components/pages/Login';
import { Signup } from './components/pages/Signup';
import { ForgotPassword } from './components/pages/ForgotPassword';
import { GovernmentProfile } from './components/pages/GovernmentProfile';
import { AdminLogin } from './components/pages/AdminLogin';
import { AdminDashboard } from './components/pages/AdminDashboard';
import { ThemeProvider } from 'next-themes';

// --- Protected Route Components ---

// 1. General Protected Route (Requires any login)
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

// 2. Admin Protected Route (Requires Admin login)
const AdminRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  
  if (!isLoggedIn) return <Navigate to="/admin-login" replace />;
  if (!isAdmin) return <Navigate to="/dashboard" replace />;
  
  return children;
};

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/report" element={<ReportFlow />} />
          
          {/* Protected Citizen Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/my-reports" element={
            <ProtectedRoute>
              <MyReports />
            </ProtectedRoute>
          } />

          {/* Protected Admin Routes */}
          <Route path="/admin-dashboard" element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } />

          {/* Other Public/Utility Routes */}
          <Route path="/office-rating" element={<OfficeRating />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/emergency" element={<EmergencyMode />} />
          <Route path="/government-profile/:id" element={<GovernmentProfile />} />
          <Route path="/design-system" element={<DesignSystem />} />
          
          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

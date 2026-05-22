import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import { Landing } from './components/pages/Landing';
import { ReportFlow } from './components/pages/ReportFlow';
import { Dashboard } from './components/pages/Dashboard';
import { OfficeRating } from './components/pages/OfficeRating';
import { Chatbot } from './components/pages/Chatbot';
import { EmergencyMode } from './components/pages/EmergencyMode';
import { Profile } from './components/pages/Profile';
import { DesignSystem } from './components/pages/DesignSystem';
import { Login } from './components/pages/Login';
import { Signup } from './components/pages/Signup';
import { ForgotPassword } from './components/pages/ForgotPassword';
import { GovernmentProfile } from './components/pages/GovernmentProfile';
import { Settings } from './components/pages/Settings';

export default function App() {
  return (
    <div className="dark min-h-screen bg-background">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/report" element={<ReportFlow />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/office-rating" element={<OfficeRating />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/emergency" element={<EmergencyMode />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/government-profile/:id" element={<GovernmentProfile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/design-system" element={<DesignSystem />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

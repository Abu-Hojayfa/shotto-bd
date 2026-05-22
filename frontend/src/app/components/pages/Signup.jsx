import { useState } from 'react';
import { Link } from 'react-router';
import { Shield, Eye, EyeOff, AlertCircle, CheckCircle, User, Building2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { GlassCard } from '../shared/GlassCard';
import { motion } from 'motion/react';

export function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState('citizen'); // 'citizen' or 'official'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    department: '',
    governmentId: '',
    agreeTerms: false
  });
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);

  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    setPasswordStrength(strength);
  };

  const handlePasswordChange = (value) => {
    setFormData({ ...formData, password: value });
    checkPasswordStrength(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all required fields');
      return;
    }

    if (role === 'official' && (!formData.department || !formData.governmentId)) {
      setError('Please fill in your Department and Government ID');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (passwordStrength < 2) {
      setError('Please choose a stronger password');
      return;
    }

    if (!formData.agreeTerms) {
      setError('Please accept the terms and conditions');
      return;
    }

    try {
        const response = await fetch('http://localhost:5000/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fullName: formData.name,
            email: formData.email,
            password: formData.password,
            role: role,
            phone: formData.phone || "",
            organization: formData.department || "",
            nationalId: formData.governmentId || "",
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || 'Registration failed');
          return;
      }

      

      // Store session info
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', formData.email);
      localStorage.setItem('userName', formData.name);
      localStorage.setItem('userRole', role);

      if (role === 'official') {
        localStorage.setItem('isAdmin', 'true');
        localStorage.setItem('officialId', formData.governmentId);
        localStorage.setItem('department', formData.department);
      }

      // Optional token save
      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      window.location.href =
        role === 'official'
          ? '/admin-dashboard'
          : '/dashboard';

    } catch (error) {
      console.error(error);
      setError('Server error');
    }
  };

  const getStrengthColor = () => {
    if (passwordStrength === 0) return 'bg-muted';
    if (passwordStrength === 1) return 'bg-destructive';
    if (passwordStrength === 2) return 'bg-yellow-500';
    if (passwordStrength === 3) return 'bg-blue-500';
    return 'bg-primary';
  };

  const getStrengthText = () => {
    if (passwordStrength === 0) return '';
    if (passwordStrength === 1) return 'Weak';
    if (passwordStrength === 2) return 'Fair';
    if (passwordStrength === 3) return 'Good';
    return 'Strong';
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-background via-background to-primary/5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo Section */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center justify-center space-x-3 group mb-4">
            <div className="relative">
              <Shield className="w-12 h-12 text-primary transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 blur-xl bg-primary/30 group-hover:bg-primary/50 transition-all" />
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">Create Account</h1>
          <p className="text-muted-foreground">নিবন্ধন করুন — Join the transparency platform</p>
        </div>

        {/* Signup Card */}
        <GlassCard className="p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center space-x-2 p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            {/* ── Role Selector ── */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                I am signing up as <span className="text-destructive">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                {/* Citizen Option */}
                <button
                  type="button"
                  onClick={() => setRole('citizen')}
                  className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer
                    ${role === 'citizen'
                      ? 'border-primary bg-primary/10 shadow-lg shadow-primary/10'
                      : 'border-border bg-card/40 hover:border-primary/40 hover:bg-card/60'
                    }`}
                >
                  <div className={`p-2.5 rounded-full transition-colors ${role === 'citizen' ? 'bg-primary/20' : 'bg-muted'}`}>
                    <User className={`w-6 h-6 transition-colors ${role === 'citizen' ? 'text-primary' : 'text-muted-foreground'}`} />
                  </div>
                  <span className={`text-sm font-semibold ${role === 'citizen' ? 'text-primary' : 'text-foreground'}`}>
                    Citizen
                  </span>
                  <span className="text-[10px] text-muted-foreground leading-tight text-center">
                    নাগরিক — Report &amp; track issues
                  </span>
                  {role === 'citizen' && (
                    <motion.div
                      layoutId="roleCheck"
                      className="absolute top-2 right-2"
                    >
                      <CheckCircle className="w-4 h-4 text-primary" />
                    </motion.div>
                  )}
                </button>

                {/* Government Official Option */}
                <button
                  type="button"
                  onClick={() => setRole('official')}
                  className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer
                    ${role === 'official'
                      ? 'border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/10'
                      : 'border-border bg-card/40 hover:border-blue-500/40 hover:bg-card/60'
                    }`}
                >
                  <div className={`p-2.5 rounded-full transition-colors ${role === 'official' ? 'bg-blue-500/20' : 'bg-muted'}`}>
                    <Building2 className={`w-6 h-6 transition-colors ${role === 'official' ? 'text-blue-400' : 'text-muted-foreground'}`} />
                  </div>
                  <span className={`text-sm font-semibold ${role === 'official' ? 'text-blue-400' : 'text-foreground'}`}>
                    Govt. Official
                  </span>
                  <span className="text-[10px] text-muted-foreground leading-tight text-center">
                    কর্মকর্তা — Respond &amp; manage
                  </span>
                  {role === 'official' && (
                    <motion.div
                      layoutId="roleCheck"
                      className="absolute top-2 right-2"
                    >
                      <CheckCircle className="w-4 h-4 text-blue-400" />
                    </motion.div>
                  )}
                </button>
              </div>
            </div>

            {/* Full Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-foreground">
                Full Name <span className="text-destructive">*</span>
              </label>
              <Input
                id="name"
                type="text"
                placeholder="আপনার নাম / Your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-input border-border text-foreground"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email Address <span className="text-destructive">*</span>
              </label>
              <Input
                id="email"
                type="email"
                placeholder={role === 'official' ? 'your.name@gov.bd' : 'your@email.com'}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-input border-border text-foreground"
              />
            </div>

            {/* ── Government-only fields ── */}
            {role === 'official' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-5"
              >
                <div className="space-y-2">
                  <label htmlFor="department" className="text-sm font-medium text-foreground">
                    Department / Ministry <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="department"
                    type="text"
                    placeholder="e.g. Ministry of Public Administration"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="bg-input border-border text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="governmentId" className="text-sm font-medium text-foreground">
                    Government ID <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="governmentId"
                    type="text"
                    placeholder="Your official employee ID"
                    value={formData.governmentId}
                    onChange={(e) => setFormData({ ...formData, governmentId: e.target.value })}
                    className="bg-input border-border text-foreground"
                  />
                </div>
              </motion.div>
            )}

            {/* Phone (Optional) */}
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium text-foreground">
                Phone Number <span className="text-xs text-muted-foreground">(Optional)</span>
              </label>
              <Input
                id="phone"
                type="tel"
                placeholder="+880 1XXX-XXXXXX"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="bg-input border-border text-foreground"
              />
            </div>

            {/* Organization (Optional) */}
            <div className="space-y-2">
              <label
                htmlFor="department"
                className="text-sm font-medium text-foreground"
              >
                Organization{" "}
                <span className="text-xs text-muted-foreground">
                  (Optional)
                </span>
              </label>

              <Input
                id="department"
                type="text"
                placeholder="Enter your organization"
                value={formData.department}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    department: e.target.value,
                  })
                }
                className="bg-input border-border text-foreground"
              />
            </div>

            {/* Government ID (Optional) */}
            <div className="space-y-2">
              <label
                htmlFor="governmentId"
                className="text-sm font-medium text-foreground"
              >
                Government ID{" "}
                <span className="text-xs text-muted-foreground">
                  (Optional)
                </span>
              </label>

              <Input
                id="governmentId"
                type="text"
                placeholder="Enter your government ID"
                value={formData.governmentId}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    governmentId: e.target.value,
                  })
                }
                className="bg-input border-border text-foreground"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-foreground">
                Password <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  className="bg-input border-border text-foreground pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {formData.password && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Password strength:</span>
                    <span className={`font-semibold ${passwordStrength <= 1 ? 'text-destructive' :
                      passwordStrength === 2 ? 'text-yellow-500' :
                        passwordStrength === 3 ? 'text-blue-500' : 'text-primary'
                      }`}>
                      {getStrengthText()}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className={`h-1 flex-1 rounded-full transition-all ${level <= passwordStrength ? getStrengthColor() : 'bg-muted'
                          }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
                Confirm Password <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="bg-input border-border text-foreground pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {formData.confirmPassword && (
                <div className="flex items-center space-x-1 text-xs">
                  {formData.password === formData.confirmPassword ? (
                    <>
                      <CheckCircle className="w-3 h-3 text-primary" />
                      <span className="text-primary">Passwords match</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-3 h-3 text-destructive" />
                      <span className="text-destructive">Passwords do not match</span>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                id="agreeTerms"
                checked={formData.agreeTerms}
                onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                className="mt-1 w-4 h-4 rounded border-border bg-input text-primary focus:ring-2 focus:ring-primary focus:ring-offset-0"
              />
              <label htmlFor="agreeTerms" className="text-xs text-muted-foreground">
                I agree to the{' '}
                <Link to="/terms" className="text-primary hover:text-primary/80">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-primary hover:text-primary/80">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className={`w-full font-semibold ${role === 'official'
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-900/30'
                : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                }`}
            >
              {role === 'official' ? 'Register as Official' : 'Create Citizen Account'}
            </Button>
          </form>

          {/* Sign In Link */}
          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link to="/login" className="text-primary hover:text-primary/80 font-semibold transition-colors">
              Login here
            </Link>
          </div>
        </GlassCard>

        {/* Bottom Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-center space-y-3"
        >
          <p className="text-sm text-muted-foreground">
            Want to report anonymously?{' '}
            <Link to="/report" className="text-primary hover:text-primary/80 font-semibold">
              No account needed
            </Link>
          </p>
          <p className="text-sm text-muted-foreground">
            Already a Government Official?{' '}
            <Link to="/admin-login" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
              Admin Login
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}


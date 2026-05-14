import { Link, useNavigate } from 'react-router';
import { Shield, Menu, X, AlertTriangle, User, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group">
            <div className="relative">
              <Shield className="w-7 h-7 sm:w-8 sm:h-8 text-primary transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 blur-lg bg-primary/30 group-hover:bg-primary/50 transition-all" />
            </div>
            <div>
              <h1 className="font-bold text-lg sm:text-xl text-foreground">Shotto BD</h1>
              <p className="text-[10px] sm:text-xs text-muted-foreground -mt-1">সত্য প্রকাশ করুন</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link to="/office-rating" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Office Ratings
            </Link>
            <Link to="/chatbot" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Legal Help
            </Link>
            <Link to="/profile" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              My Reports
            </Link>
            <Link
              to="/emergency"
              className="flex items-center space-x-2 px-4 py-2 bg-destructive/10 border border-destructive/30 rounded-lg text-sm text-destructive hover:bg-destructive/20 transition-colors"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Emergency</span>
            </Link>
            {isLoggedIn ? (
              <>
                <Link
                  to="/report"
                  className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/30"
                >
                  Report Now
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-destructive transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/30"
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-border bg-background/95 backdrop-blur-xl overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-6 space-y-4">
              <Link
                to="/dashboard"
                className="block text-muted-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/office-rating"
                className="block text-muted-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Office Ratings
              </Link>
              <Link
                to="/chatbot"
                className="block text-muted-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Legal Help
              </Link>
              <Link
                to="/profile"
                className="block text-muted-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                My Reports
              </Link>
              <Link
                to="/emergency"
                className="flex items-center space-x-2 px-4 py-3 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive"
                onClick={() => setIsMenuOpen(false)}
              >
                <AlertTriangle className="w-4 h-4" />
                <span>Emergency Mode</span>
              </Link>
              {isLoggedIn ? (
                <>
                  <Link
                    to="/report"
                    className="block w-full text-center px-5 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Report Now
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center justify-center space-x-2 w-full px-5 py-3 border border-destructive/30 rounded-lg text-destructive hover:bg-destructive/10 transition-all"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block w-full text-center px-5 py-3 border border-border rounded-lg text-foreground hover:bg-card/60 transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block w-full text-center px-5 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

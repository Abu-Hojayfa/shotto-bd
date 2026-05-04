import { Link, useLocation } from 'react-router';
import { Shield, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/office-rating', label: 'Ratings' },
    { path: '/legal-assistant', label: 'Legal Help' },
    { path: '/profile', label: 'Profile' },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full group-hover:bg-primary/30 transition-all"></div>
              <Shield className="w-8 h-8 text-primary relative z-10" />
            </div>
            <div>
              <span className="text-xl font-bold text-foreground">Shotto BD</span>
              <div className="text-[10px] text-muted-foreground -mt-1">Transparency Platform</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg transition-all ${
                  location.pathname === item.path
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <Link
            to="/report"
            className="hidden md:block bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg transition-all shadow-lg shadow-primary/20 hover:shadow-primary/30"
          >
            Report Now
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-foreground p-2"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <nav className="flex flex-col p-4 gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-lg transition-all ${
                  location.pathname === item.path
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/report"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-3 rounded-lg text-center mt-2"
            >
              Report Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

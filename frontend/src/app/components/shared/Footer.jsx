import { Link } from 'react-router';
import { Shield, Phone, Mail, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-background/30 border-t border-border/40 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Shield className="w-6 h-6 text-primary" />
              <h3 className="font-bold text-base text-foreground tracking-tight">Shotto BD</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
              Empowering citizens to fight corruption and build a transparent Bangladesh through technology.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors p-1">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors p-1">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors p-1">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mb-4">Platform</h4>
            <ul className="space-y-2">
              <li><Link to="/dashboard" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Dashboard</Link></li>
              <li><Link to="/office-rating" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Office Ratings</Link></li>
              <li><Link to="/chatbot" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Legal Assistant</Link></li>
              <li><Link to="/profile" className="text-xs text-muted-foreground hover:text-foreground transition-colors">My Reports</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">How to Report</a></li>
              <li><a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Safety Guidelines</a></li>
              <li><a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Know Your Rights</a></li>
              <li><a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Emergency Contacts */}
          <div>
            <h4 className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mb-4">Hotlines</h4>
            <ul className="space-y-2.5">
              <li className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Phone className="w-3 h-3 text-primary" />
                <span>999 (National Emergency)</span>
              </li>
              <li className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Phone className="w-3 h-3 text-primary" />
                <span>106 (Anti-Corruption)</span>
              </li>
              <li className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Mail className="w-3 h-3 text-primary" />
                <span className="truncate">help@shottobd.gov.bd</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-muted-foreground">
            © 2026 Shotto BD. Government Transparency Initiative.
          </p>
          <div className="flex items-center gap-5">
            <a href="#" className="text-[10px] text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="text-[10px] text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

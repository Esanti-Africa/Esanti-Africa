import { useState } from 'react';
import { Menu, X, User, ShoppingBag, BookOpen, Newspaper, Briefcase, Info, Heart, LogIn } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import esantiLogo from '../assets/6073016e94328581a129c7018a395de985b00448.png';


import { getCurrentUser, User as AuthUser } from '../data/auth';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isLoggedIn: boolean;
  citizenId?: string;
  donorRank?: string;
  user?: AuthUser | null;
}


export function Navbar({ currentPage, onNavigate, isLoggedIn, citizenId, donorRank, user }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: null },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'blog', label: 'Blog', icon: Newspaper },
    { id: 'about', label: 'About', icon: Info },
  ];

  if (user && (user.role === 'admin' || user.role === 'editor')) {
    navItems.push({ id: 'admin', label: 'Admin', icon: Briefcase });
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate('home')}>
            <img src={esantiLogo} alt="Esanti Africa Logo" className="w-14 h-14 object-contain" />
            <div className="flex flex-col">
              <span className="text-lg leading-tight" style={{ color: 'var(--esanti-dark-green)' }}>Esanti Africa</span>
              <span className="text-xs text-gray-600 leading-tight">The Digital Nation</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-3 py-2 rounded-md transition-colors flex items-center space-x-1 ${currentPage === item.id
                    ? 'bg-gradient-to-r from-[var(--esanti-green)] to-[var(--esanti-dark-green)] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <Button
              onClick={() => onNavigate('donate')}
              className="bg-gradient-to-r from-[var(--esanti-orange)] to-[var(--esanti-red)] text-white hover:opacity-90"
            >
              <Heart className="w-4 h-4 mr-2" />
              Donate
            </Button>

            {isLoggedIn ? (
              <div className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-lg cursor-pointer" onClick={() => onNavigate('dashboard')}>
                <User className="w-5 h-5" style={{ color: 'var(--esanti-dark-green)' }} />
                <div className="flex flex-col">
                  <span className="text-xs text-gray-600">Citizen ID</span>
                  <span className="text-sm">{citizenId}</span>
                </div>
                {donorRank && (
                  <Badge className="bg-gradient-to-r from-[var(--esanti-yellow)] to-[var(--esanti-orange)] text-white border-0">
                    {donorRank}
                  </Badge>
                )}
              </div>
            ) : (
              <>
                <Button variant="outline" onClick={() => onNavigate('login')}>
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Button>
                <Button
                  onClick={() => onNavigate('signup')}
                  className="bg-gradient-to-r from-[var(--esanti-green)] to-[var(--esanti-dark-green)] text-white"
                >
                  Become a Citizen
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-gray-200">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors flex items-center space-x-2 ${currentPage === item.id
                    ? 'bg-gradient-to-r from-[var(--esanti-green)] to-[var(--esanti-dark-green)] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  <span>{item.label}</span>
                </button>
              );
            })}
            <div className="pt-4 space-y-2">
              <Button className="w-full bg-gradient-to-r from-[var(--esanti-orange)] to-[var(--esanti-red)] text-white" onClick={() => onNavigate('donate')}>
                <Heart className="w-4 h-4 mr-2" />
                Donate Now
              </Button>
              {!isLoggedIn && (
                <>
                  <Button variant="outline" className="w-full" onClick={() => onNavigate('login')}>
                    <LogIn className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                  <Button className="w-full bg-gradient-to-r from-[var(--esanti-green)] to-[var(--esanti-dark-green)] text-white" onClick={() => onNavigate('signup')}>
                    Become a Citizen
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

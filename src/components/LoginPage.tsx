import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader } from './ui/card';
import { Checkbox } from './ui/checkbox';

interface LoginPageProps {
  onNavigate: (page: string) => void;
  onLogin: () => void;
}

export function LoginPage({ onNavigate, onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would authenticate the user
    onLogin();
    onNavigate('dashboard');
  };

  const handleGoogleLogin = () => {
    // In production, this would initiate OAuth flow with Google
    // For demo purposes, we'll simulate a successful login
    console.log('Google login initiated');
    onLogin();
    onNavigate('dashboard');
  };

  const handleFacebookLogin = () => {
    // In production, this would initiate OAuth flow with Facebook
    console.log('Facebook login initiated');
    onLogin();
    onNavigate('dashboard');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center space-x-3 mb-8 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[var(--esanti-red)] via-[var(--esanti-yellow)] to-[var(--esanti-green)] flex items-center justify-center">
              <span className="text-white text-lg">EA</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl leading-tight" style={{ color: 'var(--esanti-dark-green)' }}>Esanti Africa</span>
              <span className="text-xs text-gray-600 leading-tight">The Digital Nation</span>
            </div>
          </div>

          <div className="mb-8">
            <h1 className="mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to access your citizen account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer">
                  Remember me
                </label>
              </div>
              <button type="button" className="text-sm hover:underline" style={{ color: 'var(--esanti-green)' }}>
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[var(--esanti-green)] to-[var(--esanti-dark-green)] text-white hover:opacity-90"
              size="lg"
            >
              Sign In
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            <div className="text-center">
              <span className="text-gray-600">Don't have an account? </span>
              <button
                type="button"
                onClick={() => onNavigate('signup')}
                className="hover:underline"
                style={{ color: 'var(--esanti-green)' }}
              >
                Become a Citizen
              </button>
            </div>
          </form>

          {/* Social Login */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <Button variant="outline" type="button" onClick={handleGoogleLogin} className="hover:bg-gray-50">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </Button>
              <Button variant="outline" type="button" onClick={handleFacebookLogin} className="hover:bg-gray-50">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Gradient & Info */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[var(--esanti-red)] via-[var(--esanti-yellow)] to-[var(--esanti-green)] p-12 items-center justify-center relative overflow-hidden">
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="login-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="5" cy="5" r="2" fill="white" />
              <circle cx="15" cy="15" r="2" fill="white" />
              <rect x="8" y="8" width="4" height="4" fill="white" transform="rotate(45 10 10)" />
            </pattern>
            <rect width="100" height="100" fill="url(#login-pattern)" />
          </svg>
        </div>

        <div className="relative text-white max-w-md">
          <h2 className="text-4xl mb-6">Join the Digital Nation</h2>
          <p className="text-xl mb-8 text-white/90">
            Access marketplace discounts, back community projects, download free books, and become part of Africa's digital future.
          </p>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <span className="text-lg">✓</span>
              </div>
              <div>
                <h4 className="mb-1">Verified Marketplace</h4>
                <p className="text-white/80 text-sm">Shop from curated African creators and businesses</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <span className="text-lg">✓</span>
              </div>
              <div>
                <h4 className="mb-1">Free Book Library</h4>
                <p className="text-white/80 text-sm">Access thousands of African books and audiobooks</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <span className="text-lg">✓</span>
              </div>
              <div>
                <h4 className="mb-1">Impact Projects</h4>
                <p className="text-white/80 text-sm">Support transparent community development initiatives</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

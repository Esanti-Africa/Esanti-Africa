import { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Phone, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface SignupPageProps {
  onNavigate: (page: string) => void;
  onSignup: (email?: string) => void;
}

export function SignupPage({ onNavigate, onSignup }: SignupPageProps) {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [step, setStep] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      // In production, this would create the user account
      onSignup(formData.email);
      onNavigate('dashboard');
    }
  };


  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Gradient & Info */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[var(--esanti-green)] via-[var(--esanti-yellow)] to-[var(--esanti-orange)] p-12 items-center justify-center relative overflow-hidden">
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="signup-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="5" cy="5" r="2" fill="white" />
              <circle cx="15" cy="15" r="2" fill="white" />
              <rect x="8" y="8" width="4" height="4" fill="white" transform="rotate(45 10 10)" />
            </pattern>
            <rect width="100" height="100" fill="url(#signup-pattern)" />
          </svg>
        </div>

        <div className="relative text-white max-w-md">
          <h2 className="text-4xl mb-6">Become a Citizen</h2>
          <p className="text-xl mb-8 text-white/90">
            Join thousands of Africans and diaspora building the future together.
          </p>

          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h3 className="mb-4">What You Get</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start space-x-2">
                  <span className="text-white/80">•</span>
                  <span className="text-white/90">Unique Citizen ID and digital identity</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-white/80">•</span>
                  <span className="text-white/90">Access to curated marketplace with citizen-only discounts</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-white/80">•</span>
                  <span className="text-white/90">Free African book library and audiobooks</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-white/80">•</span>
                  <span className="text-white/90">Support and track community projects</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-white/80">•</span>
                  <span className="text-white/90">Create your own store and sell products</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-white/80">•</span>
                  <span className="text-white/90">Earn credits through engagement</span>
                </li>
              </ul>
            </div>

            <div className="text-center">
              <p className="text-sm text-white/80">Loving God • Loving Others • Loving Self</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
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
            <h1 className="mb-2">Create Your Account</h1>
            <p className="text-gray-600">Step {step} of 2 - {step === 1 ? 'Personal Information' : 'Account Security'}</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm" style={{ color: step >= 1 ? 'var(--esanti-green)' : 'gray' }}>Personal Info</span>
              <span className="text-sm" style={{ color: step >= 2 ? 'var(--esanti-green)' : 'gray' }}>Security</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[var(--esanti-green)] to-[var(--esanti-dark-green)] transition-all duration-300"
                style={{ width: step === 1 ? '50%' : '100%' }}
              ></div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 ? (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) => updateFormData('firstName', e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => updateFormData('lastName', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => updateFormData('email', e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number (Optional)</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+254 700 000 000"
                      value={formData.phone}
                      onChange={(e) => updateFormData('phone', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                    <Select value={formData.country} onValueChange={(value) => updateFormData('country', value)}>
                      <SelectTrigger className="pl-10">
                        <SelectValue placeholder="Select your country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ke">Kenya</SelectItem>
                        <SelectItem value="ng">Nigeria</SelectItem>
                        <SelectItem value="gh">Ghana</SelectItem>
                        <SelectItem value="za">South Africa</SelectItem>
                        <SelectItem value="tz">Tanzania</SelectItem>
                        <SelectItem value="ug">Uganda</SelectItem>
                        <SelectItem value="rw">Rwanda</SelectItem>
                        <SelectItem value="et">Ethiopia</SelectItem>
                        <SelectItem value="us">United States (Diaspora)</SelectItem>
                        <SelectItem value="uk">United Kingdom (Diaspora)</SelectItem>
                        <SelectItem value="ca">Canada (Diaspora)</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[var(--esanti-green)] to-[var(--esanti-dark-green)] text-white hover:opacity-90"
                  size="lg"
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(e) => updateFormData('password', e.target.value)}
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
                  <p className="text-xs text-gray-500">At least 8 characters with letters and numbers</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={agreeToTerms}
                    onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer leading-relaxed">
                    I agree to the Terms of Service and Privacy Policy, and I commit to the values of the Esanti Africa digital nation
                  </label>
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={!agreeToTerms}
                    className="flex-1 bg-gradient-to-r from-[var(--esanti-green)] to-[var(--esanti-dark-green)] text-white hover:opacity-90 disabled:opacity-50"
                    size="lg"
                  >
                    Create Account
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </>
            )}

            <div className="text-center">
              <span className="text-gray-600">Already have an account? </span>
              <button
                type="button"
                onClick={() => onNavigate('login')}
                className="hover:underline"
                style={{ color: 'var(--esanti-green)' }}
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

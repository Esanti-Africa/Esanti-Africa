import { Button } from './ui/button';
import { ArrowRight, ShoppingBag, Heart, Globe, BookOpen, Megaphone, TrendingUp, Users, Shield, Zap } from 'lucide-react';
import { Card, CardContent } from './ui/card';

interface HeroProps {
  onNavigate: (page: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  return (
    <>
      <div className="relative min-h-[600px] overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--esanti-red)] via-[var(--esanti-orange)] via-[var(--esanti-yellow)] to-[var(--esanti-green)]">
          {/* Africa Pattern Overlay */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <pattern id="african-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="5" cy="5" r="2" fill="white" />
                <circle cx="15" cy="15" r="2" fill="white" />
                <rect x="8" y="8" width="4" height="4" fill="white" transform="rotate(45 10 10)" />
              </pattern>
              <rect width="100" height="100" fill="url(#african-pattern)" />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center space-y-8">
            {/* Main Headline */}
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                <Globe className="w-4 h-4 text-white" />
                <span className="text-white text-sm">Building the Digital Nation</span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl text-white max-w-4xl mx-auto leading-tight">
                Esanti Africa
              </h1>

              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
                The Digital Nation for Africans and the Diaspora
              </p>
            </div>

            {/* Tagline */}
            <div className="flex items-center justify-center space-x-2 text-white/90 text-lg md:text-xl">
              <span>Loving God</span>
              <span className="w-1 h-1 rounded-full bg-white/60"></span>
              <span>Loving Others</span>
              <span className="w-1 h-1 rounded-full bg-white/60"></span>
              <span>Loving Self</span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <Button
                size="lg"
                onClick={() => onNavigate('signup')}
                className="bg-white text-[var(--esanti-dark-green)] hover:bg-white/90 shadow-xl group"
              >
                Become a Citizen
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => onNavigate('marketplace')}
                className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20"
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                Explore Marketplace
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => onNavigate('donate')}
                className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20"
              >
                <Heart className="w-4 h-4 mr-2" />
                Donate Now
              </Button>
            </div>

            {/* Impact Statement */}
            <div className="pt-8 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-center mb-4">
                  <Globe className="w-8 h-8 text-white mr-3 animate-pulse" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white">Our Vision 2043</h2>
                </div>
                <p className="text-xl md:text-2xl text-white font-light leading-relaxed">
                  "Aiming for <span className="font-bold text-[var(--esanti-yellow)]">1 billion dollars</span> worth of positive impact made within the next 18 years."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 md:h-20">
            <path d="M0,60 C200,100 400,20 600,60 C800,100 1000,20 1200,60 L1200,120 L0,120 Z" fill="white" />
          </svg>
        </div>
      </div>

      {/* Why Choose Esanti Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 rounded-full mb-4 bg-gradient-to-r from-[var(--esanti-yellow)]/20 to-[var(--esanti-orange)]/20">
              <span style={{ color: 'var(--esanti-dark-green)' }}>Why Esanti Africa?</span>
            </div>
            <h2 className="mb-4" style={{ color: 'var(--esanti-dark-green)' }}>More Than a Platform—A Digital Nation</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We combine the trustworthiness of an NGO with the innovation of a tech startup, creating a unified ecosystem for African empowerment.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-t-4 hover:shadow-xl transition-shadow cursor-pointer" style={{ borderTopColor: 'var(--esanti-green)' }} onClick={() => onNavigate('marketplace')}>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto rounded-full mb-4 bg-gradient-to-br from-[var(--esanti-green)] to-[var(--esanti-dark-green)] flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8 text-white" />
                </div>
                <h3 className="mb-3" style={{ color: 'var(--esanti-dark-green)' }}>Curated Marketplace</h3>
                <p className="text-gray-600 mb-4">
                  Shop from verified African creators and businesses. Every seller is vetted, every product is quality-checked. Support authentic African entrepreneurship.
                </p>
                <div className="flex items-center justify-center space-x-2 text-sm" style={{ color: 'var(--esanti-green)' }}>
                  <Shield className="w-4 h-4" />
                  <span>Verified Sellers Only</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-t-4 hover:shadow-xl transition-shadow cursor-pointer" style={{ borderTopColor: 'var(--esanti-orange)' }} onClick={() => onNavigate('books')}>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto rounded-full mb-4 bg-gradient-to-br from-[var(--esanti-orange)] to-[var(--esanti-red)] flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="mb-3" style={{ color: 'var(--esanti-dark-green)' }}>Free Book Library</h3>
                <p className="text-gray-600 mb-4">
                  Access thousands of African books for free. We support authors through our partnership program—offering publishing, marketing, and audiobook production.
                </p>
                <div className="flex items-center justify-center space-x-2 text-sm" style={{ color: 'var(--esanti-orange)' }}>
                  <Users className="w-4 h-4" />
                  <span>Author Partnership</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-t-4 hover:shadow-xl transition-shadow cursor-pointer" style={{ borderTopColor: 'var(--esanti-red)' }} onClick={() => onNavigate('projects')}>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto rounded-full mb-4 bg-gradient-to-br from-[var(--esanti-red)] to-[var(--esanti-orange)] flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="mb-3" style={{ color: 'var(--esanti-dark-green)' }}>Result-Based Projects</h3>
                <p className="text-gray-600 mb-4">
                  Fund community projects with complete transparency. Track every milestone, verify every result. Your donations create real, measurable impact.
                </p>
                <div className="flex items-center justify-center space-x-2 text-sm" style={{ color: 'var(--esanti-red)' }}>
                  <Zap className="w-4 h-4" />
                  <span>Milestone Tracking</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 rounded-full mb-4 bg-gradient-to-r from-[var(--esanti-green)]/20 to-[var(--esanti-yellow)]/20">
              <span style={{ color: 'var(--esanti-dark-green)' }}>Getting Started</span>
            </div>
            <h2 className="mb-4" style={{ color: 'var(--esanti-dark-green)' }}>Join in 3 Simple Steps</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Become a citizen of Esanti Africa and unlock access to our entire ecosystem
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="relative">
              <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br from-[var(--esanti-green)] to-[var(--esanti-dark-green)] flex items-center justify-center text-white shadow-lg">
                  <span>1</span>
                </div>
                <h4 className="mb-3 mt-2" style={{ color: 'var(--esanti-dark-green)' }}>Create Your Account</h4>
                <p className="text-gray-600">
                  Sign up for free and receive your unique Esanti Africa Citizen ID. Join thousands of Africans building the future together.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br from-[var(--esanti-yellow)] to-[var(--esanti-orange)] flex items-center justify-center text-white shadow-lg">
                  <span>2</span>
                </div>
                <h4 className="mb-3 mt-2" style={{ color: 'var(--esanti-dark-green)' }}>Explore & Engage</h4>
                <p className="text-gray-600">
                  Shop the marketplace, download books, read verified news, and discover community projects that need your support.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br from-[var(--esanti-orange)] to-[var(--esanti-red)] flex items-center justify-center text-white shadow-lg">
                  <span>3</span>
                </div>
                <h4 className="mb-3 mt-2" style={{ color: 'var(--esanti-dark-green)' }}>Make an Impact</h4>
                <p className="text-gray-600">
                  Support projects, earn credits, climb donor ranks from Bronze to Platinum, and participate in platform governance.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              onClick={() => onNavigate('signup')}
              className="bg-gradient-to-r from-[var(--esanti-green)] to-[var(--esanti-dark-green)] text-white hover:opacity-90"
            >
              Get Started Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

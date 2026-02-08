import { Target, Users, Globe, Heart, Shield, TrendingUp, Award, Lightbulb } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { BackButton } from './BackButton';
import esantiLogo from '../assets/6073016e94328581a129c7018a395de985b00448.png';


interface AboutPageProps {
  onBack?: () => void;
  canGoBack?: boolean;
}

export function AboutPage({ onBack = () => { }, canGoBack = false }: AboutPageProps) {
  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton onBack={onBack} canGoBack={canGoBack} />
      </div>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[var(--esanti-red)] via-[var(--esanti-yellow)] to-[var(--esanti-green)] py-20 overflow-hidden">
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="about-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="5" cy="5" r="2" fill="white" />
              <circle cx="15" cy="15" r="2" fill="white" />
              <rect x="8" y="8" width="4" height="4" fill="white" transform="rotate(45 10 10)" />
            </pattern>
            <rect width="100" height="100" fill="url(#about-pattern)" />
          </svg>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-5xl mb-6">About Esanti Africa</h1>
          <p className="text-xl md:text-2xl text-white/90 mb-4">
            Building the Digital Nation for Africans and the Diaspora
          </p>
          <div className="flex items-center justify-center space-x-2 text-lg">
            <span>Loving God</span>
            <span className="w-1 h-1 rounded-full bg-white/60"></span>
            <span>Loving Others</span>
            <span className="w-1 h-1 rounded-full bg-white/60"></span>
            <span>Loving Self</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 -mt-16 mb-16">
          <Card className="shadow-xl">
            <CardContent className="p-8">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[var(--esanti-orange)] to-[var(--esanti-red)] flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h2 className="mb-4">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed">
                To create a unified digital platform that empowers Africans and the diaspora through commerce, education,
                transparent community development, and cultural preservation. We are building more than a platform—we are
                building a nation united by values, not borders.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-xl">
            <CardContent className="p-8">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[var(--esanti-green)] to-[var(--esanti-dark-green)] flex items-center justify-center mb-4">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <h2 className="mb-4">Our Vision</h2>
              <p className="text-gray-700 leading-relaxed">
                A thriving digital nation where every African, wherever they are, has access to economic opportunities,
                quality education, trusted information, and the ability to drive positive change in their communities
                through transparent, result-based collaboration.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Logo Statement Section */}
        <div className="mb-16">
          <div className="bg-white rounded-2xl shadow-2xl p-12 md:p-20 text-center border-4 border-gray-100">
            <div className="max-w-2xl mx-auto">
              <div className="mb-8">
                <img
                  src={esantiLogo}
                  alt="Esanti Africa Logo"
                  className="w-48 h-48 md:w-64 md:h-64 mx-auto object-contain drop-shadow-2xl"
                />
              </div>
              <h2 className="text-4xl md:text-5xl mb-4" style={{ color: 'var(--esanti-dark-green)' }}>
                Esanti Africa
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 mb-2">
                Strive and Thrive
              </p>
              <div className="h-1 w-24 mx-auto bg-gradient-to-r from-[var(--esanti-red)] via-[var(--esanti-yellow)] to-[var(--esanti-dark-green)] rounded-full"></div>
            </div>
          </div>
        </div>

        {/* What is Esanti */}
        <div className="mb-16">
          <Card className="overflow-hidden shadow-xl">
            <CardContent className="p-0">
              <div className="bg-gradient-to-br from-[var(--esanti-red)] via-[var(--esanti-orange)] via-[var(--esanti-yellow)] via-[var(--esanti-green)] to-[var(--esanti-dark-green)] p-12 text-center text-white">
                <h2 className="text-3xl md:text-4xl mb-6">What is Esanti?</h2>
                <div className="max-w-3xl mx-auto">
                  <p className="text-xl md:text-2xl mb-4">
                    <span className="font-medium">Strive and Thrive</span>
                  </p>
                  <p className="text-lg text-white/90 mb-2">
                    Put in a lot of effort and prosper
                  </p>
                  <p className="text-base text-white/80 max-w-2xl mx-auto">
                    From <span className="font-medium">S</span> and <span className="font-medium">T</span>, Esanti embodies the African spirit of resilience, hard work, and ultimate prosperity
                  </p>
                </div>
              </div>

              <div className="p-8 md:p-12">
                <h3 className="text-center mb-8" style={{ color: 'var(--esanti-dark-green)' }}>The Colors of Our Journey</h3>
                <div className="grid md:grid-cols-5 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto rounded-full mb-4 shadow-lg" style={{ backgroundColor: 'var(--esanti-red)' }}></div>
                    <h4 className="mb-2 text-sm">Red</h4>
                    <p className="text-sm text-gray-600">Our Struggles</p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto rounded-full mb-4 shadow-lg" style={{ backgroundColor: 'var(--esanti-orange)' }}></div>
                    <h4 className="mb-2 text-sm">Orange</h4>
                    <p className="text-sm text-gray-600">The Efforts</p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto rounded-full mb-4 shadow-lg" style={{ backgroundColor: 'var(--esanti-yellow)' }}></div>
                    <h4 className="mb-2 text-sm">Yellow</h4>
                    <p className="text-sm text-gray-600">The Vision</p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto rounded-full mb-4 shadow-lg" style={{ backgroundColor: 'var(--esanti-green)' }}></div>
                    <h4 className="mb-2 text-sm">Light Green</h4>
                    <p className="text-sm text-gray-600">The Renewal</p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto rounded-full mb-4 shadow-lg" style={{ backgroundColor: 'var(--esanti-dark-green)' }}></div>
                    <h4 className="mb-2 text-sm">Dark Green</h4>
                    <p className="text-sm text-gray-600">The Prosperity</p>
                  </div>
                </div>

                <div className="mt-8 p-6 rounded-lg bg-gray-50 text-center">
                  <p className="text-gray-700 leading-relaxed">
                    These colors tell our story—from the struggles we've endured, through the efforts we put forth,
                    guided by our vision, experiencing renewal, and ultimately achieving prosperity. Every element of
                    Esanti Africa reflects this journey from striving to thriving.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These principles guide every decision we make and every feature we build
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-t-4 hover:shadow-lg transition-shadow" style={{ borderTopColor: 'var(--esanti-red)' }}>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-[var(--esanti-red)] to-[var(--esanti-orange)] flex items-center justify-center mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="mb-3" style={{ color: 'var(--esanti-dark-green)' }}>Loving God</h3>
                <p className="text-gray-700">
                  We ground our work in faith and spiritual principles that guide our mission to serve with integrity,
                  compassion, and purpose.
                </p>
              </CardContent>
            </Card>

            <Card className="border-t-4 hover:shadow-lg transition-shadow" style={{ borderTopColor: 'var(--esanti-yellow)' }}>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-[var(--esanti-yellow)] to-[var(--esanti-orange)] flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="mb-3" style={{ color: 'var(--esanti-dark-green)' }}>Loving Others</h3>
                <p className="text-gray-700">
                  Community and service are at the heart of everything we do. We build tools that empower people to
                  support and uplift one another.
                </p>
              </CardContent>
            </Card>

            <Card className="border-t-4 hover:shadow-lg transition-shadow" style={{ borderTopColor: 'var(--esanti-green)' }}>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-[var(--esanti-green)] to-[var(--esanti-dark-green)] flex items-center justify-center mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="mb-3" style={{ color: 'var(--esanti-dark-green)' }}>Loving Self</h3>
                <p className="text-gray-700">
                  We promote self-development, economic empowerment, and individual growth. Every citizen deserves
                  tools to build their future.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Digital Nation Manifesto */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 rounded-full mb-4" style={{ backgroundColor: 'var(--esanti-yellow)', opacity: 0.2 }}>
              <span style={{ color: 'var(--esanti-dark-green)' }}>The Digital Nation</span>
            </div>
            <h2 className="mb-4">Our Manifesto</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Esanti Africa reimagines what it means to belong. We are not bound by geography but united by shared
              values, heritage, and vision. As citizens of this digital nation, we commit to:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: Globe,
                color: 'var(--esanti-green)',
                title: 'Building Sustainable Solutions',
                description: 'Creating community-driven solutions to African challenges through technology, collaboration, and innovation'
              },
              {
                icon: Award,
                color: 'var(--esanti-yellow)',
                title: 'Promoting African Culture',
                description: 'Celebrating and sharing African literature, art, knowledge, and heritage with the world'
              },
              {
                icon: Shield,
                color: 'var(--esanti-orange)',
                title: 'Ensuring Transparency',
                description: 'Maintaining accountability in all funded projects, marketplace transactions, and platform operations'
              },
              {
                icon: TrendingUp,
                color: 'var(--esanti-red)',
                title: 'Creating Economic Opportunities',
                description: 'Empowering African creators, entrepreneurs, and communities to build sustainable livelihoods'
              },
            ].map((item, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: item.color, opacity: 0.1 }}>
                      <item.icon className="w-6 h-6" style={{ color: item.color }} />
                    </div>
                    <div>
                      <h4 className="mb-2" style={{ color: 'var(--esanti-dark-green)' }}>{item.title}</h4>
                      <p className="text-gray-700 text-sm">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Platform Pillars */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="mb-4">Four Pillars of Our Platform</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Each module serves a unique purpose in building our digital nation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 mx-auto rounded-full mb-4 bg-gradient-to-br from-[var(--esanti-green)] to-[var(--esanti-dark-green)] flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h4 className="mb-2">Marketplace</h4>
                <p className="text-sm text-gray-600">Curated products and services from verified African creators</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 mx-auto rounded-full mb-4 bg-gradient-to-br from-[var(--esanti-orange)] to-[var(--esanti-red)] flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h4 className="mb-2">Books</h4>
                <p className="text-sm text-gray-600">Free library and author partnership program for African literature</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 mx-auto rounded-full mb-4 bg-gradient-to-br from-[var(--esanti-yellow)] to-[var(--esanti-orange)] flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <h4 className="mb-2">News</h4>
                <p className="text-sm text-gray-600">Verified creator channels sharing stories and perspectives</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 mx-auto rounded-full mb-4 bg-gradient-to-br from-[var(--esanti-red)] to-[var(--esanti-orange)] flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h4 className="mb-2">Projects</h4>
                <p className="text-sm text-gray-600">Result-based crowdfunding for community development</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Transparency Section */}
        <Card className="mb-16 border-l-4" style={{ borderLeftColor: 'var(--esanti-green)' }}>
          <CardContent className="p-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[var(--esanti-green)] to-[var(--esanti-dark-green)] flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="mb-4">Transparency & Accountability</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We publish quarterly financial reports, project updates, and impact assessments. Every donation,
                  every project milestone, and every marketplace transaction is tracked and verified. Citizens have
                  the right to vote on governance decisions and platform policies.
                </p>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="p-4 rounded-lg bg-gray-50">
                    <h4 className="mb-2" style={{ color: 'var(--esanti-dark-green)' }}>Financial Reports</h4>
                    <p className="text-gray-600">Published quarterly with full breakdown of funds</p>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-50">
                    <h4 className="mb-2" style={{ color: 'var(--esanti-dark-green)' }}>Project Tracking</h4>
                    <p className="text-gray-600">Real-time updates with milestone verification</p>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-50">
                    <h4 className="mb-2" style={{ color: 'var(--esanti-dark-green)' }}>Citizen Governance</h4>
                    <p className="text-gray-600">Vote on policies and platform decisions</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        {/* Impact Goal */}
        <div className="mt-16 text-center max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-[var(--esanti-green)] to-[var(--esanti-dark-green)] rounded-2xl p-10 text-white shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
            <div className="flex items-center justify-center mb-6">
              <Globe className="w-10 h-10 text-[var(--esanti-yellow)] mr-4 animate-pulse" />
              <h2 className="text-3xl md:text-4xl font-bold">Our Vision 2043</h2>
            </div>
            <p className="text-xl md:text-3xl font-light leading-relaxed">
              "Aiming for <span className="font-bold text-[var(--esanti-yellow)]">1 billion dollars</span> worth of positive impact made within the next 18 years."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

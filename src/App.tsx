import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MarketplacePage } from './components/MarketplacePage';
import { BooksPage } from './components/BooksPage';
import { NewsPage } from './components/NewsPage';
import { ProjectsPage } from './components/ProjectsPage';
import { CitizenDashboard } from './components/CitizenDashboard';
import { LoginPage } from './components/LoginPage';
import { SignupPage } from './components/SignupPage';
import { AboutPage } from './components/AboutPage';
import { Toaster } from './components/ui/sonner';
import esantiLogo from 'figma:asset/6073016e94328581a129c7018a395de985b00448.png';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // Demo: set to false initially
  const [navigationHistory, setNavigationHistory] = useState<string[]>(['home']);

  // Demo citizen data
  const citizenData = {
    id: 'ES-2025-00234',
    donorRank: 'Gold',
  };

  const handleNavigate = (page: string) => {
    setNavigationHistory(prev => [...prev, page]);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (navigationHistory.length > 1) {
      const newHistory = [...navigationHistory];
      newHistory.pop(); // Remove current page
      const previousPage = newHistory[newHistory.length - 1];
      setNavigationHistory(newHistory);
      setCurrentPage(previousPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleSignup = () => {
    setIsLoggedIn(true);
  };

  const canGoBack = navigationHistory.length > 1 && currentPage !== 'home';

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Hero onNavigate={handleNavigate} />;
      case 'marketplace':
        return <MarketplacePage onBack={handleBack} canGoBack={canGoBack} />;
      case 'books':
        return <BooksPage onBack={handleBack} canGoBack={canGoBack} />;
      case 'news':
        return <NewsPage onBack={handleBack} canGoBack={canGoBack} />;
      case 'projects':
        return <ProjectsPage onBack={handleBack} canGoBack={canGoBack} />;
      case 'dashboard':
        return <CitizenDashboard onBack={handleBack} canGoBack={canGoBack} />;
      case 'about':
        return <AboutPage onBack={handleBack} canGoBack={canGoBack} />;
      case 'donate':
        return <DonatePage onBack={handleBack} canGoBack={canGoBack} />;
      case 'login':
        return <LoginPage onNavigate={handleNavigate} onLogin={handleLogin} />;
      case 'signup':
        return <SignupPage onNavigate={handleNavigate} onSignup={handleSignup} />;
      default:
        return <Hero onNavigate={handleNavigate} />;
    }
  };

  // Show login/signup pages without navbar/footer
  if (currentPage === 'login' || currentPage === 'signup') {
    return (
      <div className="min-h-screen bg-white">
        {renderPage()}
        <Toaster />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isLoggedIn={isLoggedIn}
        citizenId={isLoggedIn ? citizenData.id : undefined}
        donorRank={isLoggedIn ? citizenData.donorRank : undefined}
      />
      
      {renderPage()}
      
      <Footer onNavigate={handleNavigate} />
      <Toaster />
    </div>
  );
}

function DonatePage({ onBack = () => {}, canGoBack = false }: { onBack?: () => void; canGoBack?: boolean }) {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {canGoBack && (
          <button
            onClick={onBack}
            className="mb-4 flex items-center text-gray-600 hover:text-gray-900"
          >
            <span className="mr-2">←</span> Back
          </button>
        )}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="mb-6">Support Esanti Africa</h1>
          
          <div className="space-y-8">
            <section>
              <p className="text-gray-700 leading-relaxed mb-6">
                Your donations help us maintain this platform, support African authors, verify creators, and provide free
                access to educational resources. Choose your donation amount and become part of our donor community.
              </p>
            </section>

            <section>
              <h2 className="mb-4">Donor Ranks</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-6 border-l-4 border-amber-700">
                  <div className="flex items-center justify-between mb-2">
                    <h3 style={{ color: 'var(--esanti-dark-green)' }}>Bronze</h3>
                    <div className="px-3 py-1 rounded-full bg-amber-700 text-white text-sm">KES 0 - 10K</div>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Citizen dashboard access</li>
                    <li>• Marketplace credits</li>
                    <li>• Monthly newsletter</li>
                  </ul>
                </div>

                <div className="border rounded-lg p-6 border-l-4 border-gray-400">
                  <div className="flex items-center justify-between mb-2">
                    <h3 style={{ color: 'var(--esanti-dark-green)' }}>Silver</h3>
                    <div className="px-3 py-1 rounded-full bg-gray-400 text-white text-sm">KES 10K - 25K</div>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• All Bronze benefits</li>
                    <li>• 10% marketplace discount</li>
                    <li>• Early project access</li>
                  </ul>
                </div>

                <div className="border rounded-lg p-6 border-l-4 border-yellow-500">
                  <div className="flex items-center justify-between mb-2">
                    <h3 style={{ color: 'var(--esanti-dark-green)' }}>Gold</h3>
                    <div className="px-3 py-1 rounded-full bg-yellow-500 text-white text-sm">KES 25K - 50K</div>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• All Silver benefits</li>
                    <li>• 20% marketplace discount</li>
                    <li>• Governance voting rights</li>
                  </ul>
                </div>

                <div className="border rounded-lg p-6 border-l-4 border-purple-600">
                  <div className="flex items-center justify-between mb-2">
                    <h3 style={{ color: 'var(--esanti-dark-green)' }}>Platinum</h3>
                    <div className="px-3 py-1 rounded-full bg-purple-600 text-white text-sm">KES 50K+</div>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• All Gold benefits</li>
                    <li>• VIP support</li>
                    <li>• Platform advisory board seat</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="border-t pt-8">
              <h2 className="mb-4">Make a Donation</h2>
              <div className="bg-gradient-to-br from-[var(--esanti-red)] via-[var(--esanti-yellow)] to-[var(--esanti-green)] p-8 rounded-lg text-white text-center">
                <h3 className="mb-4">Payment Integration</h3>
                <p className="mb-6 opacity-90">
                  In production, this would integrate with mobile money (M-Pesa, MTN MoMo, Airtel Money) and card payments
                  via Flutterwave or Paystack.
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <div className="bg-white/20 px-4 py-2 rounded-full text-sm">M-Pesa</div>
                  <div className="bg-white/20 px-4 py-2 rounded-full text-sm">MTN MoMo</div>
                  <div className="bg-white/20 px-4 py-2 rounded-full text-sm">Airtel Money</div>
                  <div className="bg-white/20 px-4 py-2 rounded-full text-sm">Visa/Mastercard</div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

function Footer({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <footer className="bg-gradient-to-br from-[var(--esanti-dark-green)] to-[var(--esanti-green)] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img src={esantiLogo} alt="Esanti Africa Logo" className="w-10 h-10 object-contain" />
              <h3>Esanti Africa</h3>
            </div>
            <p className="text-white/80 text-sm">
              Building the digital nation for Africans and the diaspora.
            </p>
          </div>

          <div>
            <h4 className="mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li><button onClick={() => onNavigate('marketplace')} className="hover:text-white">Marketplace</button></li>
              <li><button onClick={() => onNavigate('books')} className="hover:text-white">Books</button></li>
              <li><button onClick={() => onNavigate('news')} className="hover:text-white">News</button></li>
              <li><button onClick={() => onNavigate('projects')} className="hover:text-white">Projects</button></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4">Community</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li><button onClick={() => onNavigate('about')} className="hover:text-white">About Us</button></li>
              <li><button className="hover:text-white">Contact</button></li>
              <li><button className="hover:text-white">Transparency Reports</button></li>
              <li><button className="hover:text-white">Governance</button></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li><button className="hover:text-white">Privacy Policy</button></li>
              <li><button className="hover:text-white">Terms of Service</button></li>
              <li><button className="hover:text-white">Cookie Policy</button></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-white/80 mb-4 md:mb-0">
              © 2025 Esanti Africa. All rights reserved.
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-white/80">Loving God</span>
              <span className="w-1 h-1 rounded-full bg-white/60"></span>
              <span className="text-sm text-white/80">Loving Others</span>
              <span className="w-1 h-1 rounded-full bg-white/60"></span>
              <span className="text-sm text-white/80">Loving Self</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

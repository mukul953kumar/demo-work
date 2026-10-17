import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import DiscoverScreen from './pages/DiscoverScreen';
import MentorshipsScreen from './pages/MentorshipsScreen';
import VerificationQueueScreen from './pages/VerificationQueueScreen';
import RecommendationsScreen from './pages/RecommendationsScreen';
import ProfileSettingsScreen from './pages/ProfileSettingsScreen';
import LandingScreen from './pages/LandingScreen';
import ProScreen from './pages/ProScreen';
import ProfileModal from './components/ProfileModal';
import AuthModal from './components/AuthModal';
import { api } from './services/api';

const DEFAULT_DEMO_ACCOUNT = {
  email: 'student1@northstar.edu',
  password: 'StudentDemo123!'
};

export default function App() {
  const [activeTab, setActiveTab] = useState('landing');
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Perform login for a given demo account credentials
  const handleSwitchUser = async (credentials) => {
    try {
      const res = await api.auth.login({
        email: credentials.email,
        password: credentials.password
      });

      if (res.success && res.data) {
        localStorage.setItem('alumniconnect_token', res.data.token);
        localStorage.setItem('alumniconnect_user', JSON.stringify(res.data.user));
        setCurrentUser(res.data.user);
        showToast(`Signed in as ${res.data.user.name} (${res.data.user.role.toUpperCase()})`);

        // Automatic role-based default dashboard on login
        if (res.data.user.role === 'admin') {
          setActiveTab('verifications');
        } else if (res.data.user.role === 'alumni') {
          setActiveTab('mentorships');
        } else if (res.data.user.role === 'student') {
          setActiveTab('discover');
        }
      }
    } catch (err) {
      console.error('Switch user error:', err);
      showToast(`Login failed: ${err.message}`);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('alumniconnect_token');
    localStorage.removeItem('alumniconnect_user');
    setCurrentUser(null);
    setActiveTab('landing'); // Return to public landing on sign-out
    showToast('Signed out of academic session.');
  };

  const handleAuthSuccess = (user, message) => {
    setCurrentUser(user);
    showToast(message || `Welcome, ${user.name}`);
    if (user.role === 'admin') {
      setActiveTab('verifications');
    } else if (user.role === 'alumni') {
      setActiveTab('mentorships');
    } else if (user.role === 'student') {
      setActiveTab('discover');
    }
  };

  // Rule: If user is logged in, NEVER show landing page; redirect to role-specific dashboard
  useEffect(() => {
    if (currentUser) {
      if (activeTab === 'landing') {
        if (currentUser.role === 'admin') setActiveTab('verifications');
        else if (currentUser.role === 'alumni') setActiveTab('mentorships');
        else setActiveTab('discover');
      } else if (activeTab === 'verifications' && currentUser.role !== 'admin') {
        setActiveTab('discover');
      } else if (activeTab === 'profile-settings' && currentUser.role !== 'alumni') {
        setActiveTab('discover');
      } else if (activeTab === 'recommendations' && currentUser.role !== 'student') {
        setActiveTab('discover');
      }
    }
  }, [currentUser, activeTab]);

  // Check saved session or auto-login default student persona
  useEffect(() => {
    const savedUser = localStorage.getItem('alumniconnect_user');
    const savedToken = localStorage.getItem('alumniconnect_token');
    if (savedUser && savedToken) {
      try {
        const parsed = JSON.parse(savedUser);
        setCurrentUser(parsed);
        if (parsed.role === 'admin') setActiveTab('verifications');
        else if (parsed.role === 'alumni') setActiveTab('mentorships');
        else setActiveTab('discover');
        return;
      } catch (e) {
        // Fall through
      }
    }
    // Default to initial demo student
    handleSwitchUser(DEFAULT_DEMO_ACCOUNT);
  }, []);

  return (
    <div className="min-h-screen bg-[#faf9f5] text-[#1b1c1a] font-sans flex flex-col selection:bg-primary-container selection:text-white">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#18251f] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-[#245c46] animate-bounce-short">
          <span className="material-symbols-outlined text-[20px] text-primary-fixed">info</span>
          <span className="text-xs font-medium">{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 text-white/60 hover:text-white">
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* Persistent Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        onSwitchUser={handleSwitchUser}
        onSearchFocus={() => {
          setActiveTab('discover');
          const el = document.getElementById('alumni-search-input');
          if (el) el.focus();
        }}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onSignOut={handleSignOut}
      />

      {/* Main Content Area */}
      <main className="flex-1 pt-24 pb-16">
        {activeTab === 'landing' && (
          <LandingScreen
            onNavigate={setActiveTab}
            onOpenAuth={() => setIsAuthModalOpen(true)}
            currentUser={currentUser}
          />
        )}

        {activeTab === 'discover' && (
          <DiscoverScreen onSelectAlumni={setSelectedAlumni} />
        )}

        {activeTab === 'mentorships' && (
          <MentorshipsScreen currentUser={currentUser} onNavigate={setActiveTab} />
        )}

        {activeTab === 'pro' && (
          <ProScreen currentUser={currentUser} onNavigate={setActiveTab} />
        )}

        {activeTab === 'verifications' && (
          <VerificationQueueScreen currentUser={currentUser} />
        )}

        {activeTab === 'recommendations' && (
          <RecommendationsScreen onSelectAlumni={setSelectedAlumni} />
        )}

        {activeTab === 'profile-settings' && (
          <ProfileSettingsScreen
            currentUser={currentUser}
            onProfileUpdated={() => {
              showToast('Profile updated across network.');
            }}
          />
        )}
      </main>

      {/* Selected Alumni Profile Detail & Mentorship Form Modal */}
      {selectedAlumni && (
        <ProfileModal
          alumni={selectedAlumni}
          currentUser={currentUser}
          onClose={() => setSelectedAlumni(null)}
          onRequestSuccess={() => {
            showToast('Mentorship request successfully dispatched!');
          }}
        />
      )}

      {/* Login & Registration Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Academic Editorial Footer */}
      <footer className="border-t border-[#e4e2da] bg-white py-10 mt-auto">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-on-surface-variant">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-primary text-white flex items-center justify-center font-serif text-xs font-bold">
              A
            </div>
            <span className="font-serif text-sm font-medium text-on-surface">
              AlumniConnect AI
            </span>
            <span className="text-outline">·</span>
            <span>IIIT Delhi Editorial UI</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            {!currentUser && (
              <>
                <button
                  onClick={() => setActiveTab('landing')}
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('discover')}
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  Alumni Registry
                </button>
                <button
                  onClick={() => setActiveTab('pro')}
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  Pro Pass (₹199)
                </button>
              </>
            )}

            {currentUser && currentUser.role === 'student' && (
              <>
                <button
                  onClick={() => setActiveTab('discover')}
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  Directory
                </button>
                <button
                  onClick={() => setActiveTab('recommendations')}
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  AI Match Engine
                </button>
                <button
                  onClick={() => setActiveTab('mentorships')}
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  My Mentorships
                </button>
                <button
                  onClick={() => setActiveTab('pro')}
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  Pro Pass (₹199)
                </button>
              </>
            )}

            {currentUser && currentUser.role === 'alumni' && (
              <>
                <button
                  onClick={() => setActiveTab('mentorships')}
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  Session Workspace & Revenue
                </button>
                <button
                  onClick={() => setActiveTab('profile-settings')}
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  My Profile Dossier
                </button>
                <button
                  onClick={() => setActiveTab('discover')}
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  Alumni Network
                </button>
              </>
            )}

            {currentUser && currentUser.role === 'admin' && (
              <>
                <button
                  onClick={() => setActiveTab('verifications')}
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  Registrar Audit Queue
                </button>
                <button
                  onClick={() => setActiveTab('mentorships')}
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  Session Ledger
                </button>
                <button
                  onClick={() => setActiveTab('discover')}
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  Master Registry
                </button>
              </>
            )}
            <a
              href="#top"
              className="hover:text-primary transition-colors flex items-center gap-1"
            >
              <span>Back to Top</span>
              <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
            </a>
          </div>

          <p className="text-[11px] text-outline text-center sm:text-right">
            Verification policy: College identity verification and employer claims remain strictly separate.
          </p>
        </div>
      </footer>
    </div>
  );
}

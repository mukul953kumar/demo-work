import React, { useState } from 'react';

export default function Header({
  activeTab,
  setActiveTab,
  currentUser,
  onSwitchUser,
  onSearchFocus,
  onOpenAuthModal,
  onSignOut
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [showTokenModal, setShowTokenModal] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#faf9f5]/95 backdrop-blur-md border-b border-[#e4e2da] shadow-[0_1px_6px_rgba(24,37,31,0.03)]">
      <div className="h-18 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">

        {/* Brand Logo & Subtitle */}
        <div className="flex items-center gap-4 shrink-0">
          <div
            className="flex items-center gap-2.5 cursor-pointer group"
            onClick={() => {
              if (!currentUser) setActiveTab('landing');
              else if (currentUser.role === 'student') setActiveTab('discover');
              else if (currentUser.role === 'alumni') setActiveTab('mentorships');
              else if (currentUser.role === 'admin') setActiveTab('verifications');
            }}
          >
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-xs group-hover:bg-primary-container transition-colors shrink-0">
              <span className="material-symbols-outlined text-[22px]">school</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg font-semibold text-on-surface leading-none tracking-tight whitespace-nowrap">
                  AlumniConnect
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-secondary-fixed text-on-secondary-fixed-variant leading-none">
                  IIIT Delhi
                </span>
              </div>
              <span className="text-[11px] text-on-surface-variant font-medium leading-tight mt-0.5 whitespace-nowrap">
                Official Verified Alumni Network
              </span>
            </div>
          </div>
        </div>

        {/* Center Desktop Navigation Tabs - STRICTLY ROLE-BASED */}
        <nav className="hidden lg:flex items-center gap-1.5">
          {/* Guest Persona (Not logged in) */}
          {!currentUser && (
            <>
              <button
                onClick={() => setActiveTab('landing')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === 'landing'
                    ? 'bg-primary-container text-on-primary shadow-xs'
                    : 'text-on-surface-variant hover:bg-[#efeeea] hover:text-on-surface'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('discover')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === 'discover'
                    ? 'bg-primary-container text-on-primary shadow-xs'
                    : 'text-on-surface-variant hover:bg-[#efeeea] hover:text-on-surface'
                }`}
              >
                Alumni Registry
              </button>
              <button
                onClick={() => setActiveTab('pro')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeTab === 'pro'
                    ? 'bg-primary-container text-on-primary shadow-xs'
                    : 'text-on-surface-variant hover:bg-[#efeeea] hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[15px] text-[#b88b4a]">toll</span>
                <span>Pro Pass (₹199)</span>
              </button>
            </>
          )}

          {/* Student Persona */}
          {currentUser && currentUser.role === 'student' && (
            <>
              <button
                onClick={() => setActiveTab('discover')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === 'discover'
                    ? 'bg-primary-container text-on-primary shadow-xs'
                    : 'text-on-surface-variant hover:bg-[#efeeea] hover:text-on-surface'
                }`}
              >
                Directory
              </button>
              <button
                onClick={() => setActiveTab('recommendations')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === 'recommendations'
                    ? 'bg-primary-container text-on-primary shadow-xs'
                    : 'text-on-surface-variant hover:bg-[#efeeea] hover:text-on-surface'
                }`}
              >
                AI Match
              </button>
              <button
                onClick={() => setActiveTab('mentorships')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === 'mentorships'
                    ? 'bg-primary-container text-on-primary shadow-xs'
                    : 'text-on-surface-variant hover:bg-[#efeeea] hover:text-on-surface'
                }`}
              >
                My Mentorships
              </button>
              <button
                onClick={() => setActiveTab('pro')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeTab === 'pro'
                    ? 'bg-primary-container text-on-primary shadow-xs'
                    : 'text-on-surface-variant hover:bg-[#efeeea] hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[15px] text-[#b88b4a]">toll</span>
                <span>Pro Pass (₹199)</span>
              </button>
            </>
          )}

          {/* Alumni Persona (Workspace, Profile, Revenue) */}
          {currentUser && currentUser.role === 'alumni' && (
            <>
              <button
                onClick={() => setActiveTab('mentorships')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${activeTab === 'mentorships'
                    ? 'bg-primary-container text-on-primary shadow-xs'
                    : 'text-on-surface-variant hover:bg-[#efeeea] hover:text-on-surface'
                  }`}
              >
                <span>Session Workspace & Revenue</span>
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              </button>
              <button
                onClick={() => setActiveTab('profile-settings')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${activeTab === 'profile-settings'
                    ? 'bg-primary-container text-on-primary shadow-xs'
                    : 'text-on-surface-variant hover:bg-[#efeeea] hover:text-on-surface'
                  }`}
              >
                My Profile Dossier
              </button>
              <button
                onClick={() => setActiveTab('discover')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${activeTab === 'discover'
                    ? 'bg-primary-container text-on-primary shadow-xs'
                    : 'text-on-surface-variant hover:bg-[#efeeea] hover:text-on-surface'
                  }`}
              >
                Alumni Network
              </button>
            </>
          )}

          {/* Admin Persona (Audit Queue, Session Ledger, Directory) */}
          {currentUser && currentUser.role === 'admin' && (
            <>
              <button
                onClick={() => setActiveTab('verifications')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${activeTab === 'verifications'
                    ? 'bg-primary-container text-on-primary shadow-xs'
                    : 'text-on-surface-variant hover:bg-[#efeeea] hover:text-on-surface'
                  }`}
              >
                <span>Registrar Audit Queue</span>
                <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed"></span>
              </button>
              <button
                onClick={() => setActiveTab('mentorships')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${activeTab === 'mentorships'
                    ? 'bg-primary-container text-on-primary shadow-xs'
                    : 'text-on-surface-variant hover:bg-[#efeeea] hover:text-on-surface'
                  }`}
              >
                Institute Session Ledger
              </button>
              <button
                onClick={() => setActiveTab('discover')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${activeTab === 'discover'
                    ? 'bg-primary-container text-on-primary shadow-xs'
                    : 'text-on-surface-variant hover:bg-[#efeeea] hover:text-on-surface'
                  }`}
              >
                Master Registry
              </button>
            </>
          )}
        </nav>

        {/* Right Controls: Quick Search + User Account Pill */}
        <div className="flex items-center gap-2.5 shrink-0">

          {/* Compact Quick Search Trigger */}
          <button
            onClick={onSearchFocus}
            className="flex items-center bg-[#f5f4f0] hover:bg-[#efeeea] px-3 py-1.5 rounded-xl border border-[#e4e2da] text-on-surface-variant gap-2 transition-colors"
            title="Search directory (⌘K)"
          >
            <span className="material-symbols-outlined text-[17px] text-outline">search</span>
            <span className="hidden sm:inline text-xs text-on-surface-variant">Search</span>
            <kbd className="hidden sm:inline text-[10px] px-1 py-0.2 bg-[#e9e8e4] text-on-surface-variant rounded border border-[#c0c9c2]">⌘K</kbd>
          </button>

          {/* Token & Pro Pass Indicator (Students Only) */}
          {currentUser && currentUser.role === 'student' && (
            <button
              onClick={() => setActiveTab('pro')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl transition-all shadow-xs cursor-pointer group ${
                activeTab === 'pro'
                  ? 'bg-primary text-white border border-primary'
                  : 'bg-[#f6f2e8] hover:bg-[#ece6d8] border border-[#dfd5c0] text-[#7d571b]'
              }`}
              title="Open IIIT Delhi Student Pro Pass Hub & Token Economics"
            >
              <span className={`material-symbols-outlined text-[17px] group-hover:rotate-12 transition-transform ${activeTab === 'pro' ? 'text-white' : 'text-[#b88b4a]'}`}>toll</span>
              <span className={`text-xs font-bold font-mono ${activeTab === 'pro' ? 'text-white' : 'text-[#7d571b]'}`}>2 Tokens</span>
              <span className={`hidden sm:inline-block text-[9px] font-bold px-1.5 py-0.2 rounded uppercase ${activeTab === 'pro' ? 'bg-white/20 text-white' : 'bg-[#7d571b]/15 text-[#7d571b]'}`}>PRO</span>
            </button>
          )}

          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 bg-[#f5f4f0] hover:bg-[#efeeea] border border-[#e4e2da] rounded-xl px-2.5 py-1.5 transition-all text-left"
              >
                <div className="w-6 h-6 rounded-full bg-primary-container text-on-primary flex items-center justify-center text-xs font-bold uppercase shrink-0">
                  {currentUser.name ? currentUser.name[0] : 'U'}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-on-surface leading-tight truncate max-w-[90px] sm:max-w-[120px]">
                    {currentUser.name.split(' ')[0]}
                  </span>
                  <span className="text-[9px] text-secondary font-bold uppercase tracking-wider leading-none">
                    {currentUser.role}
                  </span>
                </div>
                <span className="material-symbols-outlined text-[16px] text-outline">
                  {userDropdownOpen ? 'arrow_drop_up' : 'arrow_drop_down'}
                </span>
              </button>

              {/* Account Dropdown Menu */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white border border-[#e4e2da] rounded-2xl shadow-xl p-3 z-50 animate-fade-in">
                  <div className="px-2 py-2 border-b border-[#e4e2da] mb-2">
                    <div className="font-serif text-sm font-medium text-on-surface">
                      {currentUser.name}
                    </div>
                    <div className="text-[11px] text-on-surface-variant truncate">
                      {currentUser.email}
                    </div>
                    <div className="mt-1 flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-primary/10 text-primary">
                        {currentUser.role}
                      </span>
                      <span className="text-[10px] text-outline">IIIT Delhi Account</span>
                    </div>
                  </div>

                  {currentUser.role === 'student' && (
                    <button
                      onClick={() => {
                        setActiveTab('pro');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-2.5 py-2 rounded-xl hover:bg-[#f5f4f0] text-xs font-semibold text-on-surface flex items-center gap-2 mb-1"
                    >
                      <span className="material-symbols-outlined text-[16px] text-secondary">toll</span>
                      <span>Student Pro Pass & Tokens</span>
                    </button>
                  )}

                  {currentUser.role === 'alumni' && (
                    <button
                      onClick={() => {
                        setActiveTab('profile-settings');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-2.5 py-2 rounded-xl hover:bg-[#f5f4f0] text-xs font-semibold text-on-surface flex items-center gap-2 mb-1"
                    >
                      <span className="material-symbols-outlined text-[16px] text-primary">badge</span>
                      My Profile & Verification
                    </button>
                  )}

                  {currentUser.role === 'admin' && (
                    <button
                      onClick={() => {
                        setActiveTab('verifications');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-2.5 py-2 rounded-xl hover:bg-[#f5f4f0] text-xs font-semibold text-on-surface flex items-center gap-2 mb-1"
                    >
                      <span className="material-symbols-outlined text-[16px] text-secondary">fact_check</span>
                      Registrar Audit Queue
                    </button>
                  )}

                  <div className="px-2 py-1 text-[10px] font-bold text-outline uppercase tracking-wider mt-2 mb-1">
                    Quick Persona Switcher
                  </div>

                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        onSwitchUser({ email: 'student1@northstar.edu', password: 'StudentDemo123!' });
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#f5f4f0] text-xs flex items-center justify-between"
                    >
                      <span className="text-on-surface">Alex Rivera</span>
                      <span className="text-[10px] px-1 py-0.2 bg-[#f5f4f0] text-outline rounded">Student</span>
                    </button>
                    <button
                      onClick={() => {
                        onSwitchUser({ email: 'marcus.vance@northstar.edu', password: 'AlumniDemo123!' });
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#f5f4f0] text-xs flex items-center justify-between"
                    >
                      <span className="text-on-surface">Marcus Vance</span>
                      <span className="text-[10px] px-1 py-0.2 bg-[#b5efd2] text-[#002115] rounded font-bold">Alumni</span>
                    </button>
                    <button
                      onClick={() => {
                        onSwitchUser({ email: 'sarah.chen@northstar.edu', password: 'AlumniDemo123!' });
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#f5f4f0] text-xs flex items-center justify-between"
                    >
                      <span className="text-on-surface">Sarah Chen</span>
                      <span className="text-[10px] px-1 py-0.2 bg-[#fdc981]/50 text-secondary rounded">Audit</span>
                    </button>
                    <button
                      onClick={() => {
                        onSwitchUser({ email: 'admin@northstar.edu', password: 'AdminDemo123!' });
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#f5f4f0] text-xs flex items-center justify-between"
                    >
                      <span className="text-on-surface">Dean Eleanor Vance</span>
                      <span className="text-[10px] px-1 py-0.2 bg-[#fdc981] text-[#785216] rounded font-bold">Admin</span>
                    </button>
                  </div>

                  <div className="pt-2 mt-2 border-t border-[#e4e2da] flex items-center justify-between">
                    <button
                      onClick={() => {
                        onOpenAuthModal();
                        setUserDropdownOpen(false);
                      }}
                      className="text-xs text-primary hover:underline font-semibold"
                    >
                      Switch Account
                    </button>
                    <button
                      onClick={() => {
                        onSignOut();
                        setUserDropdownOpen(false);
                      }}
                      className="text-xs text-[#ba1a1a] hover:underline font-semibold flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[14px]">logout</span>
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="px-3.5 py-1.5 bg-primary hover:bg-primary-container text-on-primary rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-xs flex items-center gap-1.5 whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-[16px]">login</span>
              <span>Sign In</span>
            </button>
          )}

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-on-surface hover:bg-[#f5f4f0] rounded-xl border border-[#e4e2da]"
          >
            <span className="material-symbols-outlined text-[20px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>

      </div>

      {/* Mobile Drawer Navigation - STRICTLY ROLE-BASED */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#e4e2da] bg-white px-4 py-4 space-y-2 shadow-lg animate-fade-in">
          {/* Guest Persona */}
          {!currentUser && (
            <>
              <button
                onClick={() => { setActiveTab('landing'); setMobileMenuOpen(false); }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold ${
                  activeTab === 'landing' ? 'bg-primary-container text-on-primary' : 'text-on-surface'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => { setActiveTab('discover'); setMobileMenuOpen(false); }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold ${
                  activeTab === 'discover' ? 'bg-primary-container text-on-primary' : 'text-on-surface'
                }`}
              >
                Alumni Registry
              </button>
              <button
                onClick={() => { setActiveTab('pro'); setMobileMenuOpen(false); }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                  activeTab === 'pro' ? 'bg-primary-container text-on-primary' : 'text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[16px] text-secondary">toll</span>
                <span>Pro Pass (₹199)</span>
              </button>
            </>
          )}

          {/* Student Persona */}
          {currentUser && currentUser.role === 'student' && (
            <>
              <button
                onClick={() => { setActiveTab('discover'); setMobileMenuOpen(false); }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold ${
                  activeTab === 'discover' ? 'bg-primary-container text-on-primary' : 'text-on-surface'
                }`}
              >
                Directory
              </button>
              <button
                onClick={() => { setActiveTab('recommendations'); setMobileMenuOpen(false); }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold ${
                  activeTab === 'recommendations' ? 'bg-primary-container text-on-primary' : 'text-on-surface'
                }`}
              >
                AI Match
              </button>
              <button
                onClick={() => { setActiveTab('mentorships'); setMobileMenuOpen(false); }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold ${
                  activeTab === 'mentorships' ? 'bg-primary-container text-on-primary' : 'text-on-surface'
                }`}
              >
                My Mentorships
              </button>
              <button
                onClick={() => { setActiveTab('pro'); setMobileMenuOpen(false); }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between ${
                  activeTab === 'pro' ? 'bg-primary-container text-on-primary' : 'text-on-surface'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-secondary">toll</span>
                  <span>Pro Pass Hub</span>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded font-mono font-bold bg-secondary/15 text-secondary">2 Tokens</span>
              </button>
            </>
          )}

          {/* Alumni Persona */}
          {currentUser && currentUser.role === 'alumni' && (
            <>
              <button
                onClick={() => { setActiveTab('mentorships'); setMobileMenuOpen(false); }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold ${activeTab === 'mentorships' ? 'bg-primary-container text-on-primary' : 'text-on-surface'
                  }`}
              >
                Session Workspace & Revenue
              </button>
              <button
                onClick={() => { setActiveTab('profile-settings'); setMobileMenuOpen(false); }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold ${activeTab === 'profile-settings' ? 'bg-primary-container text-on-primary' : 'text-on-surface'
                  }`}
              >
                My Profile Dossier
              </button>
              <button
                onClick={() => { setActiveTab('discover'); setMobileMenuOpen(false); }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold ${activeTab === 'discover' ? 'bg-primary-container text-on-primary' : 'text-on-surface'
                  }`}
              >
                Alumni Network
              </button>
            </>
          )}

          {/* Admin Persona */}
          {currentUser && currentUser.role === 'admin' && (
            <>
              <button
                onClick={() => { setActiveTab('verifications'); setMobileMenuOpen(false); }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold ${activeTab === 'verifications' ? 'bg-primary-container text-on-primary' : 'text-on-surface'
                  }`}
              >
                Registrar Audit Queue
              </button>
              <button
                onClick={() => { setActiveTab('mentorships'); setMobileMenuOpen(false); }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold ${activeTab === 'mentorships' ? 'bg-primary-container text-on-primary' : 'text-on-surface'
                  }`}
              >
                Institute Session Ledger
              </button>
              <button
                onClick={() => { setActiveTab('discover'); setMobileMenuOpen(false); }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold ${activeTab === 'discover' ? 'bg-primary-container text-on-primary' : 'text-on-surface'
                  }`}
              >
                Master Registry
              </button>
            </>
          )}
        </div>
      )}

      {/* IIIT Delhi Student Pro Pass (₹199/mo) Modal */}
      {showTokenModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-[#e4e2da] rounded-2xl max-w-md w-full p-6 shadow-2xl relative flex flex-col gap-4 animate-fade-in">
            <div className="flex items-center justify-between border-b border-[#e4e2da] pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#b88b4a] text-[24px]">toll</span>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-on-surface">
                    AlumniConnect Pro Pass
                  </h3>
                  <span className="text-[10px] text-secondary font-mono uppercase tracking-wider font-bold">
                    IIIT Delhi Placement & Career Edition
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowTokenModal(false)}
                className="w-7 h-7 rounded-lg hover:bg-[#f5f4f0] flex items-center justify-center text-on-surface-variant cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Token Balance Highlight Card */}
            <div className="bg-gradient-to-br from-[#faf8f4] to-[#f2ede2] border border-[#dfd5c0] rounded-xl p-4 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
                  Available Monthly Balance
                </span>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-3xl font-serif font-bold text-[#7d571b]">2</span>
                  <span className="text-xs font-medium text-on-surface">Mentorship Tokens</span>
                </div>
                <span className="text-[11px] text-[#245c46] font-semibold mt-1 block">
                  ✓ Active Plan · ₹199 / Month
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-secondary/15 flex items-center justify-center text-secondary border border-secondary/20">
                <span className="material-symbols-outlined text-[28px]">verified</span>
              </div>
            </div>

            {/* What is Included */}
            <div className="flex flex-col gap-2.5 text-xs text-on-surface font-sans">
              <div className="font-bold text-on-surface-variant uppercase text-[10px] tracking-wider">
                Pro Pass Unit Economics & Perks
              </div>
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-primary text-[16px] shrink-0 mt-0.5">check_circle</span>
                <span><strong>2x 1-on-1 Mentorship Sessions</strong> (30-45 mins mock interview or resume teardown with verified alumni).</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-primary text-[16px] shrink-0 mt-0.5">check_circle</span>
                <span><strong>₹99 Effective Cost:</strong> Over 90% cheaper than market coaching rates (₹1,500+).</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-primary text-[16px] shrink-0 mt-0.5">check_circle</span>
                <span><strong>Unlimited AI Matching:</strong> Instant skill-gap analysis against Stripe, Google, and Microsoft standards.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-primary text-[16px] shrink-0 mt-0.5">check_circle</span>
                <span><strong>TPO Ethics Protection:</strong> Strict anti-ghosting code of conduct for both students and mentors.</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#e4e2da] flex items-center justify-between">
              <span className="text-[11px] text-on-surface-variant font-mono">
                Renews automatically next month
              </span>
              <button
                onClick={() => setShowTokenModal(false)}
                className="px-4 py-2 bg-primary hover:bg-[#1b4434] text-white text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

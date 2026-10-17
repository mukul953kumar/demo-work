import React, { useState } from 'react';
import { api } from '../services/api';

const DEMO_PRESETS = [
  { role: 'student', name: 'Alex Rivera', email: 'student1@northstar.edu', password: 'StudentDemo123!', label: 'Student Persona' },
  { role: 'alumni', name: 'Marcus Vance', email: 'marcus.vance@northstar.edu', password: 'AlumniDemo123!', label: 'Verified Alumni' },
  { role: 'alumni', name: 'Sarah Chen', email: 'sarah.chen@northstar.edu', password: 'AlumniDemo123!', label: 'Pending Audit Alumni' },
  { role: 'admin', name: 'Dean Eleanor Vance', email: 'admin@northstar.edu', password: 'AdminDemo123!', label: 'Registrar Admin' }
];

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('student');
  const [department, setDepartment] = useState('Computer Science & Engineering');
  const [graduationYear, setGraduationYear] = useState(2023);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === 'login') {
        const res = await api.auth.login({ email: email.trim(), password });
        if (res.success && res.data) {
          localStorage.setItem('alumniconnect_token', res.data.token);
          localStorage.setItem('alumniconnect_user', JSON.stringify(res.data.user));
          onAuthSuccess(res.data.user, 'Signed in successfully');
          onClose();
        }
      } else {
        const payload = {
          name: name.trim(),
          email: email.trim(),
          password,
          role
        };
        if (role === 'alumni') {
          payload.department = department;
          payload.graduationYear = Number(graduationYear);
        }

        const res = await api.auth.register(payload);
        if (res.success && res.data) {
          localStorage.setItem('alumniconnect_token', res.data.token);
          localStorage.setItem('alumniconnect_user', JSON.stringify(res.data.user));
          onAuthSuccess(res.data.user, 'Account registered and signed in');
          onClose();
        }
      }
    } catch (err) {
      setError(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectDemo = async (preset) => {
    setEmail(preset.email);
    setPassword(preset.password);
    setError(null);
    setLoading(true);

    try {
      const res = await api.auth.login({ email: preset.email, password: preset.password });
      if (res.success && res.data) {
        localStorage.setItem('alumniconnect_token', res.data.token);
        localStorage.setItem('alumniconnect_user', JSON.stringify(res.data.user));
        onAuthSuccess(res.data.user, `Switched to ${preset.label} (${preset.name})`);
        onClose();
      }
    } catch (err) {
      setError(err.message || 'Quick login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-white rounded-3xl border border-[#e4e2da] shadow-[0_12px_40px_rgba(24,37,31,0.12)] p-6 sm:p-8 overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-on-surface-variant hover:text-on-surface p-1 rounded-full hover:bg-[#f5f4f0] transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-primary text-on-primary flex items-center justify-center mx-auto mb-3 shadow-sm">
            <span className="material-symbols-outlined text-[26px]">school</span>
          </div>
          <h2 className="font-serif text-2xl font-normal text-on-surface">
            {mode === 'login' ? 'Academic Portal Sign In' : 'Join AlumniConnect AI'}
          </h2>
          <p className="text-xs text-on-surface-variant mt-1">
            IIIT Delhi · Indraprastha Institute of Information Technology
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-[#f5f4f0] p-1 rounded-xl mb-6 border border-[#e4e2da]">
          <button
            type="button"
            onClick={() => { setMode('login'); setError(null); }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              mode === 'login'
                ? 'bg-white text-on-surface shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setMode('register'); setError(null); }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              mode === 'register'
                ? 'bg-white text-on-surface shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-5 bg-[#ffdad6] text-[#ba1a1a] p-3 rounded-xl border border-[#ba1a1a]/20 text-xs flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] shrink-0">error</span>
            <span>{error}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Maya Lin"
                  className="w-full px-3.5 py-2.5 bg-[#faf9f5] border border-[#e4e2da] rounded-xl text-xs sm:text-sm text-on-surface focus:outline-none focus:border-primary focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">
                  Account Role
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole('student')}
                    className={`py-2 px-3 text-xs font-semibold rounded-xl border flex items-center justify-center gap-1.5 transition-all ${
                      role === 'student'
                        ? 'bg-primary-container text-on-primary border-primary'
                        : 'bg-[#faf9f5] text-on-surface border-[#e4e2da]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">school</span>
                    Student
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('alumni')}
                    className={`py-2 px-3 text-xs font-semibold rounded-xl border flex items-center justify-center gap-1.5 transition-all ${
                      role === 'alumni'
                        ? 'bg-primary-container text-on-primary border-primary'
                        : 'bg-[#faf9f5] text-on-surface border-[#e4e2da]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">workspace_premium</span>
                    Alumni
                  </button>
                </div>
                <p className="text-[10px] text-outline mt-1 italic">
                  Note: Administrator accounts are restricted and managed by the Registrar.
                </p>
              </div>

              {role === 'alumni' && (
                <div className="grid grid-cols-2 gap-3 p-3 bg-[#faf9f5] rounded-xl border border-[#e4e2da]">
                  <div>
                    <label className="block text-[11px] font-bold text-on-surface-variant mb-1">
                      Department
                    </label>
                    <input
                      type="text"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#e4e2da] rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-on-surface-variant mb-1">
                      Graduation Year
                    </label>
                    <input
                      type="number"
                      min="1970"
                      max="2030"
                      value={graduationYear}
                      onChange={(e) => setGraduationYear(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#e4e2da] rounded-lg"
                    />
                  </div>
                </div>
              )}
            </>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">
              Institutional Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@northstar.edu"
              className="w-full px-3.5 py-2.5 bg-[#faf9f5] border border-[#e4e2da] rounded-xl text-xs sm:text-sm text-on-surface focus:outline-none focus:border-primary focus:bg-white transition-colors"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[11px] text-secondary hover:underline"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 8 characters"
              className="w-full px-3.5 py-2.5 bg-[#faf9f5] border border-[#e4e2da] rounded-xl text-xs sm:text-sm text-on-surface focus:outline-none focus:border-primary focus:bg-white transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 bg-primary hover:bg-primary-container text-on-primary rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-[0_2px_8px_rgba(4,68,48,0.2)] disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                Authenticating...
              </>
            ) : (
              <>
                <span>{mode === 'login' ? 'Sign In to Portal' : 'Register & Enter Network'}</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </>
            )}
          </button>
        </form>

        {/* Demo Accounts Quick-Select Drawer */}
        <div className="mt-6 pt-5 border-t border-[#e4e2da]">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[11px] uppercase font-bold tracking-wider text-on-surface-variant flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-secondary">flash_on</span>
              1-Click Demo Evaluation Profiles
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {DEMO_PRESETS.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectDemo(preset)}
                disabled={loading}
                className="p-2 rounded-xl bg-[#faf9f5] hover:bg-[#efeeea] border border-[#e4e2da] text-left transition-colors flex flex-col justify-center"
              >
                <span className="text-xs font-semibold text-on-surface leading-tight truncate">
                  {preset.name}
                </span>
                <span className="text-[10px] text-on-surface-variant truncate">
                  {preset.label}
                </span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

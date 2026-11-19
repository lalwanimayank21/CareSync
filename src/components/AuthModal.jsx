import React, { useState } from 'react';
import { X, Lock, Mail, User, Phone, ShieldCheck, ArrowRight, Stethoscope } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function AuthModal({ isOpen, onClose, initialMode = 'login', onAuthSuccess }) {
  const { t, isHindi } = useLanguage();
  const [mode, setMode] = useState(initialMode); // 'login' or 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (mode === 'login') {
      if (!email || !password) {
        setError('Please enter both email and password.');
        return;
      }
      const user = {
        name: email.split('@')[0].replace('.', ' '),
        email,
        role: email.includes('admin') ? 'Admin' : email.includes('doc') ? 'Doctor' : 'Patient',
        phone: '+91 98201 54321',
        abhaId: '91-4521-8901-2345'
      };
      onAuthSuccess(user);
      onClose();
    } else {
      if (!name || !email || !password) {
        setError('Please fill in all required fields.');
        return;
      }
      const user = {
        name,
        email,
        phone: phone || '+91 98765 43210',
        role: 'Patient',
        abhaId: '91-9988-7766-5544'
      };
      onAuthSuccess(user);
      onClose();
    }
  };

  const handleDemoLogin = (role) => {
    if (role === 'admin') {
      onAuthSuccess({
        name: 'Dr. Katherine Cole (Chief Medical Officer)',
        email: 'admin@caresync.in',
        role: 'Admin',
        phone: '+91 80 4920 1100'
      });
    } else if (role === 'doctor') {
      onAuthSuccess({
        name: isHindi ? 'डॉ. राजेश्वरी शर्मा' : 'Dr. Rajeshwari Sharma',
        email: 'rajeshwari.sharma@caresync.in',
        role: 'Doctor',
        phone: '+91 98450 99881'
      });
    } else {
      onAuthSuccess({
        name: 'Aarav Patel',
        email: 'aarav.patel@example.com',
        role: 'Patient',
        phone: '+91 98201 54321',
        abhaId: '91-4521-8901-2345'
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-white dark:bg-darkbg-card rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-200 transition-colors">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-300 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="bg-gradient-to-r from-teal-800 via-teal-700 to-slate-900 p-6 text-white text-center">
          <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300 mx-auto mb-3">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold">
            {mode === 'login' ? 'CareSync Portal Login' : 'Register New Patient'}
          </h3>
          <p className="text-xs text-teal-200 mt-1">
            Access live OPD tokens, digital records & tele-consultations
          </p>

          {/* Mode Switch Tabs */}
          <div className="mt-4 inline-flex p-1 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15">
            <button
              onClick={() => { setMode('login'); setError(''); }}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                mode === 'login' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-200 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setMode('register'); setError(''); }}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                mode === 'register' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-200 hover:text-white'
              }`}
            >
              Register
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4">
          
          {error && (
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {mode === 'register' && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Full Legal Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Aarav Sharma"
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Mobile Number (+91)</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">Password</label>
                {mode === 'login' && (
                  <span className="text-[11px] text-teal-600 dark:text-teal-400 hover:underline cursor-pointer">
                    Forgot password?
                  </span>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-teal-600 hover:bg-teal-700 active:scale-[0.99] transition-all shadow-md shadow-teal-600/30 flex items-center justify-center gap-2 mt-2"
            >
              <span>{mode === 'login' ? 'Sign In' : 'Create Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* 1-Click Fast Demo Logins */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 text-center mb-2.5">
              Instant 1-Click Demo Access
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleDemoLogin('patient')}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-teal-400 bg-slate-50 dark:bg-slate-900 text-left transition-all"
              >
                <div className="flex items-center gap-1 text-xs font-bold text-slate-800 dark:text-white">
                  <User className="w-3 h-3 text-teal-600" />
                  <span>Patient</span>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">Aarav Patel</p>
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('doctor')}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-teal-400 bg-slate-50 dark:bg-slate-900 text-left transition-all"
              >
                <div className="flex items-center gap-1 text-xs font-bold text-slate-800 dark:text-white">
                  <Stethoscope className="w-3 h-3 text-teal-600" />
                  <span>Doctor</span>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">Dr. Rajeshwari</p>
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('admin')}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-teal-400 bg-slate-50 dark:bg-slate-900 text-left transition-all"
              >
                <div className="flex items-center gap-1 text-xs font-bold text-slate-800 dark:text-white">
                  <ShieldCheck className="w-3 h-3 text-teal-600" />
                  <span>Admin</span>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">Dr. Cole</p>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

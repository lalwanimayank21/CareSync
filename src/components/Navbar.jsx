import React, { useState } from 'react';
import { 
  Calendar, 
  User, 
  Menu, 
  X, 
  ShieldCheck, 
  ChevronRight,
  LogOut,
  Stethoscope,
  Sun,
  Moon,
  Globe,
  Activity
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export default function Navbar({ 
  onOpenBooking, 
  onOpenAuth, 
  currentUser, 
  onLogout, 
  currentView, 
  onViewChange, 
  onOpenPatientPortal,
  onOpenDoctorPortal
}) {
  const { lang, toggleLanguage, t } = useLanguage();
  const { toggleTheme, isDark } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);

  const navLinks = [
    { label: t('navHome'), href: '#hero', action: () => { onViewChange('landing'); scrollToId('hero'); } },
    { label: t('navDoctors'), href: '#doctors', action: () => { onViewChange('landing'); scrollToId('doctors'); } },
    { label: t('navClinics'), href: '#clinics', action: () => { onViewChange('landing'); scrollToId('clinics'); } },
    { label: t('navTokenTracker'), href: '#token-tracker', action: () => { onViewChange('landing'); scrollToId('token-tracker'); } },
    { label: t('navServices'), href: '#services', action: () => { onViewChange('landing'); scrollToId('services'); } },
  ];

  const scrollToId = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-[#0a0f1d]/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-200">
      
      {/* Top Demo Notification Strip */}
      <div className="bg-teal-700 dark:bg-teal-950 text-white text-[11px] py-1 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-teal-300 animate-ping" />
        <span>{t('demoNotice')}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <button 
            onClick={() => { onViewChange('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-3 group text-left focus:outline-none"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-teal-600 to-teal-400 dark:from-teal-500 dark:to-cyan-400 flex items-center justify-center text-white shadow-md shadow-teal-500/25 group-hover:scale-105 transition-transform duration-200">
              <Stethoscope className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  Care<span className="text-teal-600 dark:text-teal-400">Sync</span>
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 border border-teal-200/80 dark:border-teal-800">
                  India
                </span>
              </div>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold tracking-wider uppercase">
                {t('brandTagline')}
              </p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={link.action}
                className="px-3 py-2 text-xs xl:text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
              >
                {link.label}
              </button>
            ))}

            {/* Portal Switchers */}
            <button
              onClick={() => onViewChange(currentView === 'admin' ? 'landing' : 'admin')}
              className={`ml-2 px-3 py-1.5 text-xs font-bold rounded-xl flex items-center gap-1.5 border transition-all ${
                currentView === 'admin'
                  ? 'bg-slate-900 text-white dark:bg-teal-600 border-slate-900 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-teal-500 dark:text-teal-300" />
              <span>{currentView === 'admin' ? t('navHome') : t('navAdminPortal')}</span>
            </button>

            <button
              onClick={onOpenDoctorPortal}
              className="px-2.5 py-1.5 text-xs font-bold rounded-xl flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
            >
              <Activity className="w-3.5 h-3.5 text-teal-500" />
              <span>{t('navDoctorPortal')}</span>
            </button>
          </nav>

          {/* Right Action Icons: Language, Theme & Auth */}
          <div className="hidden sm:flex items-center gap-2.5">
            
            {/* Language Switcher Button (EN / हिंदी) */}
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-darkbg-card hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 shadow-2xs transition-colors"
              title="Switch Language / भाषा बदलें"
            >
              <Globe className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span>{lang === 'en' ? 'हिंदी' : 'English'}</span>
            </button>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-darkbg-card hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-2xs transition-colors"
              title={isDark ? t('themeToggleLight') : t('themeToggleDark')}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400 hover:rotate-90 transition-transform" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600 hover:-rotate-12 transition-transform" />
              )}
            </button>

            {/* Auth / Profile */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdown(!userDropdown)}
                  className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full border border-slate-200 dark:border-slate-700 hover:border-teal-400 bg-white dark:bg-darkbg-card transition-all text-left"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-teal-500 to-blue-500 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                    {currentUser.name.charAt(0)}
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-slate-900 dark:text-white leading-tight line-clamp-1">{currentUser.name}</p>
                    <p className="text-[10px] text-teal-600 dark:text-teal-400 font-medium">{currentUser.role || 'Patient'}</p>
                  </div>
                </button>

                {/* Dropdown Menu */}
                {userDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-darkbg-card rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 py-1.5 z-50">
                    <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                      <p className="text-xs font-bold text-slate-900 dark:text-white">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{currentUser.email}</p>
                      <p className="text-[10px] text-teal-600 font-mono mt-0.5">ABHA: 91-4521-8901</p>
                    </div>
                    <button
                      onClick={() => { setUserDropdown(false); onOpenPatientPortal(); }}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-slate-800 hover:text-teal-700 flex items-center gap-2"
                    >
                      <Calendar className="w-3.5 h-3.5 text-teal-600" />
                      {t('navPatientPortal')}
                    </button>
                    {currentUser.role === 'Admin' && (
                      <button
                        onClick={() => { setUserDropdown(false); onViewChange('admin'); }}
                        className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-slate-800 flex items-center gap-2"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                        {t('navAdminPortal')}
                      </button>
                    )}
                    <button
                      onClick={() => { setUserDropdown(false); onLogout(); }}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 flex items-center gap-2 border-t border-slate-100 dark:border-slate-800 mt-1"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      {t('navSignOut')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => onOpenAuth('login')}
                className="px-3.5 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-teal-600 dark:hover:text-teal-400 transition-colors flex items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>{t('navSignIn')}</span>
              </button>
            )}

            {/* Primary Action Button */}
            <button
              onClick={() => onOpenBooking(null)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-teal-600 hover:bg-teal-700 active:scale-[0.98] transition-all shadow-md shadow-teal-600/30"
            >
              <Calendar className="w-4 h-4" />
              <span>{t('navBookAppointment')}</span>
            </button>
          </div>

          {/* Mobile Menu & Quick Buttons */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300"
            >
              {lang === 'en' ? 'हि' : 'EN'}
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#0a0f1d]/95 backdrop-blur-md px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={link.action}
                className="text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-teal-50 dark:hover:bg-slate-800 hover:text-teal-700"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onViewChange(currentView === 'admin' ? 'landing' : 'admin'); }}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
            >
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                {currentView === 'admin' ? 'Switch to Public Website' : t('navAdminPortal')}
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => { setMobileMenuOpen(false); onOpenDoctorPortal(); }}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
            >
              <span className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-teal-600" />
                {t('navDoctorPortal')}
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            {currentUser ? (
              <div className="space-y-1.5 pt-2">
                <div className="px-3 py-1 text-xs text-slate-500 font-medium">
                  Signed in as <span className="font-bold text-slate-800 dark:text-white">{currentUser.name}</span>
                </div>
                <button
                  onClick={() => { setMobileMenuOpen(false); onOpenPatientPortal(); }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" /> {t('navPatientPortal')}
                </button>
                <button
                  onClick={() => { setMobileMenuOpen(false); onLogout(); }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" /> {t('navSignOut')}
                </button>
              </div>
            ) : (
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenAuth('login'); }}
                className="w-full text-center px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                {t('navSignIn')}
              </button>
            )}

            <button
              onClick={() => { setMobileMenuOpen(false); onOpenBooking(null); }}
              className="w-full text-center px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-teal-600 shadow-md shadow-teal-600/30"
            >
              {t('navBookAppointment')}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

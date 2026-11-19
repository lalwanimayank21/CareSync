import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Star, 
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Activity
} from 'lucide-react';
import { SPECIALTIES, SPECIALTIES_HI } from '../data/doctorsData';
import { CITIES } from '../data/clinicsData';
import { useLanguage } from '../context/LanguageContext';

export default function Hero({ onSearchSubmit, onOpenBooking }) {
  const { t, isHindi } = useLanguage();
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [searchDoctorName, setSearchDoctorName] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearchSubmit({
      specialty: selectedSpecialty,
      city: selectedCity,
      query: searchDoctorName
    });

    const doctorsSection = document.getElementById('doctors');
    if (doctorsSection) {
      doctorsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative pt-8 pb-20 md:pt-14 md:pb-28 overflow-hidden bg-gradient-to-b from-teal-50/50 via-white to-slate-50 dark:from-[#0a1224] dark:via-[#070b14] dark:to-[#070b14] transition-colors">
      
      {/* Background Decorative Glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-tr from-teal-200/30 via-sky-200/20 to-blue-200/20 dark:from-teal-600/10 dark:via-cyan-600/10 dark:to-blue-600/10 blur-3xl -z-10 rounded-full pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-teal-300/15 dark:bg-teal-500/10 blur-2xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading, Subtitle, Search */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-darkbg-card border border-teal-200 dark:border-teal-800 shadow-sm text-teal-800 dark:text-teal-300 text-xs sm:text-sm font-semibold">
              <span className="flex h-2 w-2 rounded-full bg-teal-500 animate-pulse" />
              <Sparkles className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>{t('heroBadge')}</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
              {t('heroTitleLine1')} <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-teal-600 via-teal-700 to-sky-700 dark:from-teal-400 dark:via-cyan-400 dark:to-sky-400 bg-clip-text text-transparent">
                {t('heroTitleLine2')}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {t('heroSubtitle')}
            </p>

            {/* Quick Doctor Search Box */}
            <div className="pt-2">
              <form 
                onSubmit={handleSearch}
                className="bg-white dark:bg-darkbg-card p-3 sm:p-5 rounded-3xl shadow-xl dark:shadow-card-dark border border-slate-200/90 dark:border-slate-800 max-w-2xl mx-auto lg:mx-0 transition-colors"
              >
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                  
                  {/* Doctor Name Search Input */}
                  <div className="sm:col-span-4 relative">
                    <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 text-left px-1">
                      {isHindi ? 'डॉक्टर / कीवर्ड' : 'Doctor / Keyword'}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={searchDoctorName}
                        onChange={(e) => setSearchDoctorName(e.target.value)}
                        placeholder={t('heroSearchDoctorPlaceholder')}
                        className="w-full pl-8 pr-3 py-2 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-100 bg-slate-50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                      />
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5 text-slate-400">
                        <Search className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>

                  {/* Specialty Selector */}
                  <div className="sm:col-span-4 relative">
                    <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 text-left px-1">
                      {t('heroSpecialtyLabel')}
                    </label>
                    <div className="relative">
                      <select
                        value={selectedSpecialty}
                        onChange={(e) => setSelectedSpecialty(e.target.value)}
                        className="w-full pl-3 pr-8 py-2 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-100 bg-slate-50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors cursor-pointer appearance-none"
                      >
                        {SPECIALTIES.map((spec) => (
                          <option key={spec} value={spec} className="bg-white dark:bg-slate-900">
                            {isHindi ? (SPECIALTIES_HI[spec] || spec) : spec}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-500">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* City Selector */}
                  <div className="sm:col-span-4 relative">
                    <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 text-left px-1">
                      {t('heroLocationLabel')}
                    </label>
                    <div className="relative">
                      <select
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        className="w-full pl-3 pr-8 py-2 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-100 bg-slate-50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors cursor-pointer appearance-none"
                      >
                        {CITIES.map((c) => (
                          <option key={c} value={c} className="bg-white dark:bg-slate-900">{c}</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-500">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                    </div>
                  </div>

                </div>

                {/* Search Button & Popular tags */}
                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-slate-400">{t('heroPopularSearches')}</span>
                    {['Cardiology', 'Pediatrics', 'Dermatology', 'Neurology'].map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => {
                          setSelectedSpecialty(tag);
                          onSearchSubmit({ specialty: tag, city: selectedCity, query: '' });
                          const el = document.getElementById('doctors');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-teal-950 hover:text-teal-700 dark:hover:text-teal-300 text-slate-600 dark:text-slate-300 transition-colors text-xs"
                      >
                        {isHindi ? SPECIALTIES_HI[tag] : tag}
                      </button>
                    ))}
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto py-2.5 px-6 rounded-2xl font-bold text-xs sm:text-sm text-white bg-teal-600 hover:bg-teal-700 active:scale-[0.98] transition-all shadow-md shadow-teal-600/30 flex items-center justify-center gap-2"
                  >
                    <Search className="w-4 h-4" />
                    <span>{t('heroSearchBtn')}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Trust Highlights */}
            <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400 flex-shrink-0" />
                <span className="font-medium">AIIMS & Premier Specialists</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400 flex-shrink-0" />
                <span className="font-medium">Live OPD Token Tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400 flex-shrink-0" />
                <span className="font-medium">Zero Wait Time Check-in</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Graphic with Floating Badges */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Main Visual Container */}
            <div className="relative w-full max-w-md lg:max-w-none">
              
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/20 to-sky-500/20 dark:from-teal-500/30 dark:to-sky-500/30 rounded-3xl transform rotate-2 scale-95 blur-xl -z-10" />

              {/* Doctor Main Image Card */}
              <div className="relative rounded-3xl overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl bg-white dark:bg-darkbg-card">
                <img
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800"
                  alt="CareSync Leading Indian Doctor"
                  className="w-full h-[380px] sm:h-[460px] object-cover object-top"
                />

                {/* Gradient Overlay for Bottom Info */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/95 via-slate-900/60 to-transparent p-6 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs font-bold uppercase tracking-wider text-teal-300">
                      {t('heroAvailableToday')}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold">
                    {isHindi ? 'डॉ. राजेश्वरी शर्मा' : 'Dr. Rajeshwari Sharma'}
                  </h3>
                  <p className="text-xs text-slate-300">
                    Chief of Cardiology • AIIMS Gold Medalist • ₹900 OPD
                  </p>
                </div>
              </div>

              {/* Floating Badge 1: Verified Top Doctor Rating */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-white/95 dark:bg-darkbg-card/95 backdrop-blur-md rounded-2xl p-3.5 shadow-xl border border-slate-100 dark:border-slate-800 flex items-center gap-3 animate-bounce [animation-duration:4s]">
                <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-center justify-center text-amber-500">
                  <Star className="w-5 h-5 fill-amber-400 stroke-amber-400" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-slate-900 dark:text-white text-sm">4.96 / 5.0</span>
                    <span className="text-xs text-slate-400">(45,000+ reviews)</span>
                  </div>
                  <p className="text-[11px] text-teal-700 dark:text-teal-400 font-semibold">Pan-India Patient Rating</p>
                </div>
              </div>

              {/* Floating Badge 2: Live OPD Queue Token */}
              <div className="absolute -bottom-6 -right-2 sm:-right-6 bg-white/95 dark:bg-darkbg-card/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-slate-100 dark:border-slate-800 max-w-[240px]">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-900 dark:text-white">Live OPD Token</p>
                    <p className="text-[10px] text-teal-600 dark:text-teal-400 font-semibold font-mono">Serving Token #15</p>
                  </div>
                </div>
                <button
                  onClick={() => onOpenBooking(null)}
                  className="w-full py-1.5 px-3 rounded-lg text-xs font-bold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 hover:bg-teal-100 transition-colors flex items-center justify-center gap-1"
                >
                  Book OPD Slot <ArrowRight className="w-3 h-3" />
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Metrics Bar */}
        <div className="mt-16 pt-10 border-t border-slate-200/80 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-center">
          <div className="p-4 rounded-2xl bg-white dark:bg-darkbg-card border border-slate-100 dark:border-slate-800 shadow-sm">
            <p className="text-2xl sm:text-3xl font-extrabold text-teal-700 dark:text-teal-400">{t('statsDoctors')}</p>
            <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mt-1">{t('statsDoctorsSub')}</p>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-darkbg-card border border-slate-100 dark:border-slate-800 shadow-sm">
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">{t('statsPatients')}</p>
            <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mt-1">{t('statsPatientsSub')}</p>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-darkbg-card border border-slate-100 dark:border-slate-800 shadow-sm">
            <p className="text-2xl sm:text-3xl font-extrabold text-teal-700 dark:text-teal-400">{t('statsClinics')}</p>
            <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mt-1">{t('statsClinicsSub')}</p>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-darkbg-card border border-slate-100 dark:border-slate-800 shadow-sm">
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">{t('statsSatisfaction')}</p>
            <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mt-1">{t('statsSatisfactionSub')}</p>
          </div>
        </div>

      </div>
    </section>
  );
}

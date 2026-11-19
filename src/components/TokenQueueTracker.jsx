import React, { useState } from 'react';
import { Clock, Stethoscope, Search, CheckCircle2, AlertTriangle, ArrowRight, Activity, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function TokenQueueTracker() {
  const { t, isHindi } = useLanguage();
  const [searchToken, setSearchToken] = useState('');
  const [trackedData, setTrackedData] = useState({
    tokenNumber: 'TK-18',
    currentServing: 15,
    doctorName: isHindi ? 'डॉ. राजेश्वरी शर्मा' : 'Dr. Rajeshwari Sharma',
    doctorSpecialty: isHindi ? 'कार्डियोलॉजी' : 'Cardiology',
    clinicName: isHindi ? 'केयरसिंक एपेक्स, इंदिरानगर, बेंगलुरु' : 'CareSync Apex Multi-Specialty, Indiranagar, Bengaluru',
    room: 'Room 204',
    patientsAhead: 3,
    estWaitMinutes: 18,
    status: 'on_track' // 'on_track', 'called', 'completed'
  });
  const [hasSearched, setHasSearched] = useState(false);

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    if (!searchToken.trim()) return;

    // Simulate search lookup
    const num = parseInt(searchToken.replace(/\D/g, ''), 10) || 21;
    const current = 15;
    const ahead = Math.max(0, num - current);
    const wait = ahead * 6;

    setTrackedData({
      tokenNumber: searchToken.toUpperCase().startsWith('TK-') ? searchToken.toUpperCase() : `TK-${num}`,
      currentServing: current,
      doctorName: isHindi ? 'डॉ. राजेश्वरी शर्मा' : 'Dr. Rajeshwari Sharma',
      doctorSpecialty: isHindi ? 'कार्डियोलॉजी' : 'Cardiology',
      clinicName: isHindi ? 'केयरसिंक एपेक्स, इंदिरानगर, बेंगलुरु' : 'CareSync Apex Multi-Specialty, Indiranagar, Bengaluru',
      room: 'Room 204',
      patientsAhead: ahead,
      estWaitMinutes: wait,
      status: ahead === 0 ? 'called' : 'on_track'
    });
    setHasSearched(true);
  };

  return (
    <section id="token-tracker" className="py-16 bg-gradient-to-b from-white to-teal-50/50 dark:from-darkbg-primary dark:to-darkbg-secondary border-y border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-100/70 dark:bg-teal-900/40 border border-teal-200 dark:border-teal-700/60 text-teal-800 dark:text-teal-300 text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <Activity className="w-3.5 h-3.5" />
            <span>{t('tokenHeaderTitle')}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t('tokenHeaderTitle')}
          </h2>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {t('tokenHeaderSubtitle')}
          </p>
        </div>

        {/* Live Token Status Card */}
        <div className="max-w-4xl mx-auto bg-white dark:bg-darkbg-card rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xl dark:shadow-card-dark relative overflow-hidden transition-colors">
          
          {/* Subtle Glow Backdrop in Dark Mode */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 dark:bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Search Lookup Bar */}
          <form onSubmit={handleTrackSubmit} className="mb-8">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchToken}
                  onChange={(e) => setSearchToken(e.target.value)}
                  placeholder={t('tokenTrackInputPlaceholder')}
                  className="w-full pl-11 pr-4 py-3 text-xs sm:text-sm rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              <button
                type="submit"
                className="py-3 px-6 rounded-2xl text-xs sm:text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 active:scale-[0.98] transition-all shadow-md shadow-teal-600/25 flex items-center justify-center gap-2 flex-shrink-0"
              >
                <span>{t('tokenTrackBtn')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            {hasSearched && (
              <p className="text-[11px] text-teal-700 dark:text-teal-400 font-semibold mt-2 text-left pl-1">
                ✓ Showing live OPD token status for {trackedData.tokenNumber}
              </p>
            )}
          </form>

          {/* Live Progress Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            
            {/* Box 1: Current Serving */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 text-center">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                {t('tokenCurrentlyServing')}
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-teal-700 dark:text-teal-400">
                #{trackedData.currentServing}
              </div>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold inline-flex items-center gap-1 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                Live in Consultation
              </span>
            </div>

            {/* Box 2: Your Token */}
            <div className="p-4 rounded-2xl bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200/90 dark:border-teal-800/80 text-center">
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300 block mb-1">
                {t('tokenYourToken')}
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-mono">
                {trackedData.tokenNumber}
              </div>
              <span className="text-[11px] text-slate-600 dark:text-slate-300 font-medium mt-1 block">
                {trackedData.patientsAhead > 0 ? `${trackedData.patientsAhead} ${t('tokenPatientsAhead')}` : 'Ready for OPD'}
              </span>
            </div>

            {/* Box 3: Estimated Wait Time */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 text-center">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                {t('tokenEstWait')}
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                ~{trackedData.estWaitMinutes} <span className="text-sm font-semibold text-slate-500">mins</span>
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-1 flex items-center justify-center gap-1">
                <Clock className="w-3 h-3 text-teal-600 dark:text-teal-400" />
                Updated 1 min ago
              </span>
            </div>

          </div>

          {/* Details Bar */}
          <div className="p-4 rounded-2xl bg-slate-100/70 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <Stethoscope className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span className="font-bold text-slate-900 dark:text-white">{trackedData.doctorName}</span>
                <span className="text-slate-400">•</span>
                <span className="text-teal-700 dark:text-teal-400 font-semibold">{trackedData.doctorSpecialty}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 justify-center sm:justify-start">
                <MapPin className="w-3.5 h-3.5" />
                <span>{trackedData.clinicName} • <strong>{trackedData.room}</strong></span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {trackedData.status === 'called' ? (
                <div className="px-3 py-1.5 rounded-xl bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 animate-pulse">
                  <CheckCircle2 className="w-4 h-4" />
                  {t('tokenStatusCalled')}
                </div>
              ) : (
                <div className="px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 font-medium text-xs flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                  <span>{t('tokenStatusOnTrack')}</span>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

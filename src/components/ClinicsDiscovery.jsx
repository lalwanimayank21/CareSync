import React, { useState } from 'react';
import { MapPin, Navigation, Phone, Clock, ShieldCheck, ArrowUpRight, Calendar } from 'lucide-react';
import { CLINICS, CITIES } from '../data/clinicsData';
import { useLanguage } from '../context/LanguageContext';

export default function ClinicsDiscovery({ onBookClinic }) {
  const { t, isHindi } = useLanguage();
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [detectedLocation, setDetectedLocation] = useState(null);
  const [isDetecting, setIsDetecting] = useState(false);

  const handleAutoDetect = () => {
    setIsDetecting(true);
    setTimeout(() => {
      setDetectedLocation('Indiranagar, Bengaluru (12.9716° N, 77.5946° E)');
      setSelectedCity('Bengaluru');
      setIsDetecting(false);
    }, 600);
  };

  const filteredClinics = CLINICS.filter(clinic => {
    return selectedCity === 'All Cities' || clinic.city === selectedCity;
  });

  return (
    <section id="clinics" className="py-20 bg-slate-50/70 dark:bg-darkbg-primary relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100/70 dark:bg-teal-900/40 border border-teal-200 dark:border-teal-700/60 text-teal-800 dark:text-teal-300 text-xs font-bold uppercase tracking-wider mb-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>{t('clinicsHeaderTag')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t('clinicsHeaderTitle')}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-xl">
              {t('clinicsHeaderSubtitle')}
            </p>
          </div>

          {/* Location Actions: Auto-detect & City filter */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleAutoDetect}
              disabled={isDetecting}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 hover:bg-teal-100 dark:hover:bg-teal-900/80 transition-colors shadow-2xs"
            >
              <Navigation className={`w-3.5 h-3.5 ${isDetecting ? 'animate-spin' : ''}`} />
              <span>{isDetecting ? 'Detecting...' : t('clinicsDetectLocation')}</span>
            </button>

            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-darkbg-card border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-2xs cursor-pointer"
            >
              {CITIES.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
        </div>

        {detectedLocation && (
          <div className="mb-8 p-3 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-xs text-teal-800 dark:text-teal-300 flex items-center justify-between">
            <span>📍 Auto-detected GPS location: <strong>{detectedLocation}</strong>. Sorted by closest distance.</span>
            <button onClick={() => setDetectedLocation(null)} className="text-teal-600 dark:text-teal-400 font-bold hover:underline">Reset</button>
          </div>
        )}

        {/* Clinics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredClinics.map((clinic) => (
            <div
              key={clinic.id}
              className="bg-white dark:bg-darkbg-card rounded-3xl border border-slate-200/90 dark:border-slate-800 hover:border-teal-400 dark:hover:border-teal-500 overflow-hidden card-hover shadow-sm flex flex-col justify-between transition-colors"
            >
              <div>
                {/* Clinic Photo & Badges */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-900">
                  <img
                    src={clinic.image}
                    alt={clinic.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/95 dark:bg-slate-900/90 backdrop-blur-md text-teal-700 dark:text-teal-300 shadow-md">
                      📍 {clinic.distanceKm} {t('clinicsDistanceKm')}
                    </span>
                    {clinic.isNABH && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white shadow-sm flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        {t('clinicsNABH')}
                      </span>
                    )}
                  </div>

                  {clinic.hasEmergency && (
                    <div className="absolute bottom-3 right-3 bg-red-600/95 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white shadow-sm">
                      {t('clinicsTraumaUnit')}
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-6 space-y-3">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                      {clinic.city} • {clinic.area}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5 leading-snug">
                      {isHindi ? clinic.nameHi : clinic.name}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {clinic.address}
                  </p>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 flex-shrink-0" />
                      <span>{clinic.hours}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 flex-shrink-0" />
                      <span>{clinic.phone}</span>
                    </div>
                  </div>

                  {/* Specialties tags */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {clinic.specialties.map(spec => (
                      <span key={spec} className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {spec}
                      </span>
                    ))}
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-400">
                      +{clinic.activeDoctorsCount} Doctors
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 bg-slate-50/70 dark:bg-slate-900/40 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-2">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${clinic.mapsQuery}`}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2 px-3 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-darkbg-card border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-1"
                >
                  <span>{t('clinicsGetDirections')}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => onBookClinic(clinic)}
                  className="py-2 px-3 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 active:scale-[0.98] transition-all shadow-sm flex items-center justify-center gap-1"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{t('clinicsBookAtCenter')}</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

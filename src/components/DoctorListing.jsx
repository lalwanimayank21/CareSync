import React, { useState } from 'react';
import { Search, UserCheck, X, Sparkles } from 'lucide-react';
import DoctorCard from './DoctorCard';
import { SPECIALTIES, SPECIALTIES_HI } from '../data/doctorsData';
import { useLanguage } from '../context/LanguageContext';

export default function DoctorListing({ 
  doctors, 
  filterCriteria, 
  onFilterChange, 
  onBookDoctor, 
  onViewDoctorProfile 
}) {
  const { t, isHindi } = useLanguage();
  const [activeSpecialty, setActiveSpecialty] = useState('All Specialties');
  const [searchTerm, setSearchTerm] = useState('');
  const [onlyAvailableToday, setOnlyAvailableToday] = useState(false);

  // Sync when parent filter changes (e.g. from Hero search)
  const effectiveSpecialty = filterCriteria?.specialty || activeSpecialty;
  const effectiveSearch = filterCriteria?.query !== undefined && filterCriteria?.query !== '' ? filterCriteria.query : searchTerm;

  // Filter doctors based on criteria
  const filteredDoctors = doctors.filter((doc) => {
    const matchSpecialty = effectiveSpecialty === 'All Specialties' || doc.specialty === effectiveSpecialty;
    const matchSearch = doc.name.toLowerCase().includes(effectiveSearch.toLowerCase()) ||
                        (doc.nameHi && doc.nameHi.includes(effectiveSearch)) ||
                        doc.specialty.toLowerCase().includes(effectiveSearch.toLowerCase()) ||
                        doc.hospitalAffiliation.toLowerCase().includes(effectiveSearch.toLowerCase()) ||
                        doc.location.toLowerCase().includes(effectiveSearch.toLowerCase());
    const matchToday = !onlyAvailableToday || doc.availableToday;
    return matchSpecialty && matchSearch && matchToday;
  });

  const handleSelectSpecialty = (spec) => {
    setActiveSpecialty(spec);
    if (onFilterChange) {
      onFilterChange(prev => ({ ...prev, specialty: spec }));
    }
  };

  const handleSearchChange = (val) => {
    setSearchTerm(val);
    if (onFilterChange) {
      onFilterChange(prev => ({ ...prev, query: val }));
    }
  };

  const resetFilters = () => {
    setActiveSpecialty('All Specialties');
    setSearchTerm('');
    setOnlyAvailableToday(false);
    if (onFilterChange) {
      onFilterChange({ specialty: 'All Specialties', city: 'All Cities', query: '' });
    }
  };

  return (
    <section id="doctors" className="py-20 bg-slate-50/60 dark:bg-darkbg-primary relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100/70 dark:bg-teal-900/40 border border-teal-200 dark:border-teal-700/60 text-teal-800 dark:text-teal-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('doctorsHeaderTag')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t('doctorsHeaderTitle')}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-xl">
              {t('doctorsHeaderSubtitle')}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Showing <strong className="text-slate-900 dark:text-white">{filteredDoctors.length}</strong> of {doctors.length} doctors
            </span>
          </div>
        </div>

        {/* Filters and Search Bar Container */}
        <div className="bg-white dark:bg-darkbg-card p-4 sm:p-5 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm mb-10 space-y-4 transition-colors">
          
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={effectiveSearch}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder={t('doctorsSearchPlaceholder')}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl text-xs sm:text-sm border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-slate-50/70 dark:bg-slate-900/60 text-slate-900 dark:text-white placeholder-slate-400"
              />
              {effectiveSearch && (
                <button 
                  onClick={() => handleSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Toggle: Available Today */}
            <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
              <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800 px-3.5 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700">
                <input
                  type="checkbox"
                  checked={onlyAvailableToday}
                  onChange={(e) => setOnlyAvailableToday(e.target.checked)}
                  className="rounded text-teal-600 focus:ring-teal-500 w-4 h-4"
                />
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  {t('doctorsAvailableTodayOnly')}
                </span>
              </label>

              {(effectiveSpecialty !== 'All Specialties' || effectiveSearch || onlyAvailableToday) && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-red-600 dark:text-red-400 hover:text-red-700 font-bold underline underline-offset-2"
                >
                  {t('doctorsClearFilters')}
                </button>
              )}
            </div>
          </div>

          {/* Specialty Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-slate-100 dark:border-slate-800">
            {SPECIALTIES.map((spec) => {
              const active = effectiveSpecialty === spec;
              return (
                <button
                  key={spec}
                  onClick={() => handleSelectSpecialty(spec)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                    active
                      ? 'bg-teal-600 text-white shadow-sm shadow-teal-600/30'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {isHindi ? (SPECIALTIES_HI[spec] || spec) : spec}
                </button>
              );
            })}
          </div>

        </div>

        {/* Doctor Grid */}
        {filteredDoctors.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                onBook={onBookDoctor}
                onViewProfile={onViewDoctorProfile}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-darkbg-card rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 p-8">
            <UserCheck className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">{t('doctorsNoResults')}</h3>
            <button
              onClick={resetFilters}
              className="mt-4 px-4 py-2 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 transition-colors"
            >
              {t('doctorsClearFilters')}
            </button>
          </div>
        )}

      </div>
    </section>
  );
}

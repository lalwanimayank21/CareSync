import React from 'react';
import { X, Star, Calendar, Award, CheckCircle, Clock, Building2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function DoctorModal({ doctor, isOpen, onClose, onBook }) {
  const { t, isHindi } = useLanguage();
  if (!isOpen || !doctor) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-white dark:bg-darkbg-card rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-200 transition-colors">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 dark:bg-slate-800/90 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-300 flex items-center justify-center shadow-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Doctor Header Banner */}
        <div className="bg-gradient-to-r from-teal-800 via-teal-700 to-slate-900 p-6 sm:p-8 text-white relative">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover object-top border-4 border-white/90 shadow-lg"
            />
            <div className="text-center sm:text-left space-y-1.5 flex-1">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-teal-400/20 border border-teal-300/30 text-teal-200">
                {isHindi ? doctor.specialtyHi : doctor.specialty}
              </span>
              <h2 className="text-2xl font-bold text-white">
                {isHindi ? doctor.nameHi : doctor.name}
              </h2>
              <p className="text-xs sm:text-sm text-teal-100 font-medium">
                {isHindi ? doctor.titleHi : doctor.title}
              </p>
              
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2 text-xs text-slate-200">
                <div className="flex items-center gap-1 text-amber-300 font-bold">
                  <Star className="w-4 h-4 fill-amber-300 stroke-amber-300" />
                  <span>{doctor.rating}</span>
                  <span className="text-slate-300 font-normal">({doctor.reviewCount} reviews)</span>
                </div>
                <div>•</div>
                <div>{isHindi ? doctor.experienceHi : doctor.experience}</div>
                <div>•</div>
                <div className="text-emerald-300 font-bold">₹{doctor.fee} OPD Fee</div>
              </div>
            </div>
          </div>
        </div>

        {/* Doctor Details Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          
          {/* About Doctor */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
              {t('docModalBio')}
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {isHindi ? doctor.aboutHi : doctor.about}
            </p>
          </div>

          {/* Education & Hospital */}
          <div className="grid sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">
                {t('docModalEducation')}
              </span>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <Award className="w-4 h-4 text-teal-600 dark:text-teal-400 flex-shrink-0" />
                {doctor.education}
              </p>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">
                {t('docModalHospital')}
              </span>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-teal-600 dark:text-teal-400 flex-shrink-0" />
                {isHindi ? doctor.hospitalAffiliationHi : doctor.hospitalAffiliation}
              </p>
            </div>
          </div>

          {/* Practice Highlights */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
              {t('docModalHighlights')}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                <CheckCircle className="w-4 h-4 text-teal-600 dark:text-teal-400 flex-shrink-0" />
                <span>{t('docModalNABHCompliant')}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                <CheckCircle className="w-4 h-4 text-teal-600 dark:text-teal-400 flex-shrink-0" />
                <span>{t('docModalEPrescription')}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                <CheckCircle className="w-4 h-4 text-teal-600 dark:text-teal-400 flex-shrink-0" />
                <span>Live OPD Queue Token Tracking</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                <CheckCircle className="w-4 h-4 text-teal-600 dark:text-teal-400 flex-shrink-0" />
                <span>Location: {isHindi ? doctor.locationHi : doctor.location}</span>
              </div>
            </div>
          </div>

          {/* Upcoming Slots */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
              {t('docModalSlots')}
            </h4>
            <div className="flex flex-wrap gap-2">
              {doctor.availableSlots.map((slot, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    onClose();
                    onBook(doctor, slot);
                  }}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 border border-teal-200/60 dark:border-teal-800 hover:bg-teal-600 hover:text-white dark:hover:bg-teal-500 transition-all flex items-center gap-1.5"
                >
                  <Clock className="w-3.5 h-3.5" />
                  {slot}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Standard OPD Fee:</span>
            <span className="text-xl font-extrabold text-slate-900 dark:text-white ml-2">₹{doctor.fee}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl transition-colors"
            >
              {t('docModalClose')}
            </button>
            <button
              onClick={() => {
                onClose();
                onBook(doctor);
              }}
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 shadow-md transition-colors flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>{t('doctorsBookVisit')}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

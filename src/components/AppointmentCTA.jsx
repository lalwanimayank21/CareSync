import React from 'react';
import { Calendar, PhoneCall, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function AppointmentCTA({ onOpenBooking }) {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-white dark:bg-darkbg-primary relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-tr from-teal-800 via-teal-700 to-slate-900 p-8 sm:p-14 text-white shadow-2xl">
          
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 -mb-16 w-80 h-80 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-teal-200 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('ctaTag')}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {t('ctaTitleLine1')} <br />
              <span className="text-teal-300">{t('ctaTitleLine2')}</span>
            </h2>

            <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-2xl">
              {t('ctaSubtitle')}
            </p>

            {/* Quick Guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-semibold text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-teal-300 flex-shrink-0" />
                <span>Zero Advance Deposit</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-teal-300 flex-shrink-0" />
                <span>Guaranteed OPD Token</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-teal-300 flex-shrink-0" />
                <span>ABHA & DPDP Compliant</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => onOpenBooking(null)}
                className="px-7 py-3.5 rounded-2xl font-bold text-sm text-slate-900 bg-white hover:bg-teal-50 active:scale-[0.98] transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-teal-700" />
                <span>{t('ctaBookNow')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="tel:18002273796"
                className="px-6 py-3.5 rounded-2xl font-semibold text-sm text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-teal-300" />
                <span>{t('ctaCallDesk')}</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

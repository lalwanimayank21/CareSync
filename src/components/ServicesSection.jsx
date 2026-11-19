import React from 'react';
import { 
  Stethoscope, 
  HeartPulse, 
  Video, 
  Baby, 
  Activity, 
  Bone, 
  ArrowRight, 
  CheckCircle,
  PhoneCall
} from 'lucide-react';
import { SERVICES } from '../data/servicesData';
import { useLanguage } from '../context/LanguageContext';

const iconMap = {
  Stethoscope: Stethoscope,
  HeartPulse: HeartPulse,
  Video: Video,
  Baby: Baby,
  Activity: Activity,
  Bone: Bone,
};

export default function ServicesSection({ onOpenBooking }) {
  const { t, isHindi } = useLanguage();

  return (
    <section id="services" className="py-20 bg-white dark:bg-darkbg-primary relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-800 dark:text-teal-300 text-xs font-bold uppercase tracking-wider">
            {t('servicesHeaderTag')}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t('servicesHeaderTitle')}
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {t('servicesHeaderSubtitle')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => {
            const IconComponent = iconMap[service.icon] || Stethoscope;
            return (
              <div 
                key={service.id}
                className="group relative bg-slate-50/70 dark:bg-darkbg-card hover:bg-white dark:hover:bg-darkbg-card rounded-3xl p-7 border border-slate-200/90 dark:border-slate-800 hover:border-teal-400 dark:hover:border-teal-500 card-hover flex flex-col justify-between transition-colors shadow-sm"
              >
                <div>
                  {/* Top Bar with Icon & Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-900 group-hover:bg-teal-600 dark:group-hover:bg-teal-500 shadow-sm border border-slate-100 dark:border-slate-800 flex items-center justify-center text-teal-600 dark:text-teal-400 group-hover:text-white transition-all duration-300">
                      <IconComponent className="w-7 h-7 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-200 shadow-xs">
                      {isHindi ? service.badgeHi : service.badge}
                    </span>
                  </div>

                  {/* Title & Category */}
                  <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400 block mb-1">
                    {isHindi ? service.categoryHi : service.category}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-colors mb-3">
                    {isHindi ? service.titleHi : service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    {isHindi ? service.descriptionHi : service.description}
                  </p>

                  {/* Bullet features */}
                  <ul className="space-y-2 mb-8">
                    {(isHindi ? service.featuresHi : service.features).map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
                        <CheckCircle className="w-4 h-4 text-teal-600 dark:text-teal-400 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer with Starting Fee and CTA */}
                <div className="pt-4 border-t border-slate-200/70 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 dark:text-slate-500 block font-medium">
                      {t('servicesStartingFrom')}
                    </span>
                    <span className="text-lg font-bold text-slate-900 dark:text-white font-mono">
                      {service.startingFee}
                    </span>
                  </div>

                  <button
                    onClick={() => onOpenBooking(null)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 group-hover:bg-teal-600 dark:group-hover:bg-teal-500 group-hover:text-white transition-all duration-200"
                  >
                    <span>{t('servicesBookService')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Emergency Assistance Notice */}
        <div className="mt-14 p-6 rounded-3xl bg-gradient-to-r from-teal-900 via-slate-900 to-black text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl border border-teal-800/40">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-400 flex-shrink-0">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold">24/7 National Emergency & Trauma Hotline</h4>
              <p className="text-xs text-slate-300">Call Toll-Free 1800-227-3796 or Dial 112 / 108 for immediate ambulance dispatch.</p>
            </div>
          </div>
          <a
            href="tel:18002273796"
            className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 transition-colors flex-shrink-0 shadow-md"
          >
            Toll-Free: 1800-227-3796
          </a>
        </div>

      </div>
    </section>
  );
}

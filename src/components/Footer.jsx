import React from 'react';
import { Stethoscope, Mail, Phone, MapPin, Clock, Shield, ArrowUp, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer({ onOpenBooking, onOpenAuth, onViewAdmin, onOpenDoctorPortal }) {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-900">
          
          {/* Brand & Mission (Col 1 & 2) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-teal-400 flex items-center justify-center text-slate-950 shadow-md">
                <Stethoscope className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                Care<span className="text-teal-400">Sync</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-900/60 text-teal-300 border border-teal-700/60">
                India
              </span>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {t('footerMission')}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-slate-300">
              <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                <Shield className="w-3.5 h-3.5 text-teal-400" />
                <span>{t('footerCompliance')}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {t('footerQuickLinks')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#hero" className="hover:text-teal-400 transition-colors">{t('navHome')}</a></li>
              <li><a href="#doctors" className="hover:text-teal-400 transition-colors">{t('navDoctors')}</a></li>
              <li><a href="#clinics" className="hover:text-teal-400 transition-colors">{t('navClinics')}</a></li>
              <li><a href="#token-tracker" className="hover:text-teal-400 transition-colors">{t('navTokenTracker')}</a></li>
              <li><a href="#services" className="hover:text-teal-400 transition-colors">{t('navServices')}</a></li>
              <li>
                <button onClick={() => onOpenAuth('login')} className="hover:text-teal-400 transition-colors text-left">
                  {t('navPatientPortal')}
                </button>
              </li>
              <li>
                <button onClick={onOpenDoctorPortal} className="text-teal-400 hover:text-teal-300 font-semibold text-left">
                  {t('navDoctorPortal')} →
                </button>
              </li>
              <li>
                <button onClick={onViewAdmin} className="text-teal-400 hover:text-teal-300 font-semibold text-left">
                  {t('navAdminPortal')} →
                </button>
              </li>
            </ul>
          </div>

          {/* Medical Departments */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {t('footerDepartments')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#doctors" className="hover:text-teal-400">Cardiology & Heart Care</a></li>
              <li><a href="#doctors" className="hover:text-teal-400">Pediatrics & Neonatal</a></li>
              <li><a href="#doctors" className="hover:text-teal-400">Neurology & Spine</a></li>
              <li><a href="#doctors" className="hover:text-teal-400">Orthopedic Surgery</a></li>
              <li><a href="#doctors" className="hover:text-teal-400">Dermatology & Skin Care</a></li>
              <li><a href="#services" className="hover:text-teal-400">Tele-OPD Virtual Visits</a></li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {t('footerContactHours')}
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                <span>{t('footerHeadOffice')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <span>{t('footerHelpline')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <span>{t('footerEmail')}</span>
              </div>
              <div className="flex items-start gap-2 pt-1 border-t border-slate-900">
                <Clock className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="block text-slate-300 font-medium">{t('footerHours')}</span>
                  <span className="block text-[11px] text-teal-400 font-bold">{t('footerEmergency')}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Demo Disclaimer Bar */}
        <div className="py-4 my-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <p>{t('footerDemoDisclaimer')}</p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 {t('footerRights')}</p>

          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Notice</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">ABHA & DPDP Policy</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}

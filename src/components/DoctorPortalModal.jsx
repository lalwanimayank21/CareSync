import React, { useState } from 'react';
import { X, Stethoscope, Clock, CheckCircle2, FileText, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function DoctorPortalModal({ 
  isOpen, 
  onClose, 
  doctor, 
  appointments, 
  onAdvanceToken, 
  onCompleteAppointment 
}) {
  const { t, isHindi } = useLanguage();
  const [selectedAptForNotes, setSelectedAptForNotes] = useState(null);
  const [rxNotes, setRxNotes] = useState('');
  const [noteSaved, setNoteSaved] = useState(false);

  if (!isOpen) return null;

  const currentDoctor = doctor || {
    name: isHindi ? 'डॉ. राजेश्वरी शर्मा' : 'Dr. Rajeshwari Sharma',
    specialty: isHindi ? 'कार्डियोलॉजी' : 'Cardiology',
    title: 'MBBS, MD, DM (Cardiology), AIIMS New Delhi',
    currentLiveToken: 18,
    opdRoom: 'Room 204'
  };

  const doctorAppointments = appointments.filter(a => 
    !a.doctorId || a.doctorId === currentDoctor.id || a.doctorName.includes('Rajeshwari')
  );

  const handleSaveRx = (e) => {
    e.preventDefault();
    setNoteSaved(true);
    setTimeout(() => {
      setNoteSaved(false);
      setSelectedAptForNotes(null);
      setRxNotes('');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-white dark:bg-darkbg-card rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-200 transition-colors">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-800 via-teal-700 to-slate-900 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300">
              <Stethoscope className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold">{t('doctorPortalTitle')}</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-white flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  {t('doctorDutyStatus')}
                </span>
              </div>
              <p className="text-xs text-teal-200">{currentDoctor.name} • {currentDoctor.opdRoom}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Quick Metrics & Call Next Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300 block mb-1">
                Active Token Inside Room
              </span>
              <div className="text-3xl font-extrabold text-teal-800 dark:text-teal-300 font-mono">
                #{currentDoctor.currentLiveToken || 18}
              </div>
              <button
                onClick={() => onAdvanceToken && onAdvanceToken(currentDoctor.id)}
                className="mt-2 w-full py-1.5 px-3 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 transition-colors shadow-sm flex items-center justify-center gap-1"
              >
                <span>{t('doctorCallNext')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                {t('doctorTotalServedToday')}
              </span>
              <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
                17
              </div>
              <span className="text-[11px] text-emerald-600 font-medium block mt-2">
                Avg. 9 mins / consultation
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                {t('doctorPendingInQueue')}
              </span>
              <div className="text-3xl font-extrabold text-amber-600">
                {doctorAppointments.filter(a => a.status === 'Confirmed').length}
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block mt-2">
                Waiting in OPD lobby
              </span>
            </div>
          </div>

          {/* Today's Queue Table */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              {t('doctorTodayQueue')}
            </h4>

            <div className="space-y-2.5">
              {doctorAppointments.map((apt) => (
                <div
                  key={apt.id}
                  className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                        {apt.tokenNumber || 'TK-18'}
                      </span>
                      <span className="text-sm font-bold text-slate-900 dark:text-white">{apt.patientName}</span>
                      <span className="text-xs text-slate-400">({apt.patientAge || '32'} yrs)</span>
                      <span className="text-[11px] text-slate-500 font-medium">• {apt.time}</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 italic line-clamp-1">
                      {apt.symptoms || 'General consultation'}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <button
                      onClick={() => setSelectedAptForNotes(apt)}
                      className="px-2.5 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 flex items-center gap-1"
                    >
                      <FileText className="w-3.5 h-3.5 text-teal-600" />
                      <span>{t('doctorAddRx')}</span>
                    </button>

                    {apt.status !== 'Completed' ? (
                      <button
                        onClick={() => onCompleteAppointment && onCompleteAppointment(apt.id)}
                        className="px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 flex items-center gap-1 shadow-2xs"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{t('doctorMarkDone')}</span>
                      </button>
                    ) : (
                      <span className="px-2.5 py-1 rounded-xl text-xs font-bold text-blue-700 bg-blue-50 dark:bg-blue-950/40">
                        Completed
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rx Notes Modal inline */}
          {selectedAptForNotes && (
            <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 animate-in fade-in">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-teal-800 dark:text-teal-300">
                  Write Clinical E-Prescription: {selectedAptForNotes.patientName} ({selectedAptForNotes.tokenNumber})
                </span>
                <button onClick={() => setSelectedAptForNotes(null)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveRx} className="space-y-3">
                <textarea
                  rows={3}
                  required
                  value={rxNotes}
                  onChange={(e) => setRxNotes(e.target.value)}
                  placeholder="Rx: Tab Telmisartan 40mg OD x 30 days, lifestyle walking 45 mins daily, review in 4 weeks with lipid panel..."
                  className="w-full p-3 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono"
                />

                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-teal-700 dark:text-teal-400 font-medium">
                    ✓ Will sync to patient's ABHA health vault & WhatsApp
                  </span>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 shadow-sm"
                  >
                    {noteSaved ? '✓ Saved!' : 'Save & Dispatch E-Rx'}
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900/40 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl transition-colors"
          >
            {t('close')}
          </button>
        </div>

      </div>
    </div>
  );
}

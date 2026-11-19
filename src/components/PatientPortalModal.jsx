import React, { useState } from 'react';
import { X, Calendar, FileText, Plus, Printer, QrCode } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function PatientPortalModal({ 
  isOpen, 
  onClose, 
  currentUser, 
  appointments, 
  onCancelAppointment, 
  onBookNew 
}) {
  const { t } = useLanguage();
  const [selectedPass, setSelectedPass] = useState(null);

  if (!isOpen) return null;

  const userAppointments = appointments.filter((apt) => 
    !currentUser || 
    apt.patientEmail.toLowerCase() === (currentUser.email || '').toLowerCase() || 
    apt.patientName.toLowerCase() === (currentUser.name || '').toLowerCase()
  );

  const displayAppointments = userAppointments.length > 0 ? userAppointments : appointments.slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-white dark:bg-darkbg-card rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-200 transition-colors">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-800 via-teal-700 to-slate-900 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">{t('patientPortalTitle')}</h2>
              <p className="text-xs text-teal-200">
                {currentUser?.name || 'Aarav Patel'} • {t('patientPortalSubtitle')}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Portal Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Patient Health Summary Card with Indian ABHA ID */}
          <div className="p-5 rounded-3xl bg-gradient-to-r from-teal-50 to-sky-50 dark:from-teal-950/40 dark:to-slate-900/60 border border-teal-200/80 dark:border-teal-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-teal-700 dark:text-teal-400">
                {t('patientHealthSummary')}
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                {currentUser?.name || 'Aarav Patel'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                ABHA ID: <strong className="text-slate-800 dark:text-slate-200">{currentUser?.abhaId || '91-4521-8901-2345'}</strong>
              </p>
              <p className="text-[11px] text-slate-400">{currentUser?.email || 'aarav.patel@example.com'} • {currentUser?.phone || '+91 98201 54321'}</p>
            </div>

            <div className="flex items-center gap-2.5 text-xs font-semibold">
              <div className="text-center bg-white dark:bg-darkbg-card px-3 py-1.5 rounded-xl border border-teal-200 dark:border-slate-700 shadow-2xs">
                <span className="block text-slate-400 text-[10px]">{t('patientBloodGroup')}</span>
                <span className="text-teal-700 dark:text-teal-400 font-bold">B+</span>
              </div>
              <div className="text-center bg-white dark:bg-darkbg-card px-3 py-1.5 rounded-xl border border-teal-200 dark:border-slate-700 shadow-2xs">
                <span className="block text-slate-400 text-[10px]">{t('patientABHAStatus')}</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓ Active</span>
              </div>
              <div className="text-center bg-white dark:bg-darkbg-card px-3 py-1.5 rounded-xl border border-teal-200 dark:border-slate-700 shadow-2xs">
                <span className="block text-slate-400 text-[10px]">{t('patientInsurance')}</span>
                <span className="text-teal-700 dark:text-teal-400 font-bold">Star Health</span>
              </div>
            </div>
          </div>

          {/* Bookings Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                {t('patientMyAppointments')} ({displayAppointments.length})
              </h4>
              <button
                onClick={() => { onClose(); onBookNew(); }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 hover:bg-teal-100 dark:hover:bg-teal-900/80 border border-teal-200/80 dark:border-teal-800 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{t('patientBookAnother')}</span>
              </button>
            </div>

            {displayAppointments.length > 0 ? (
              <div className="space-y-3">
                {displayAppointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 hover:border-teal-400 dark:hover:border-teal-500 bg-white dark:bg-slate-900/60 transition-all shadow-2xs"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/80 px-2 py-0.5 rounded border border-teal-200 dark:border-teal-800">
                            {apt.tokenNumber || 'TK-18'}
                          </span>
                          <span className="text-xs font-mono text-slate-400">
                            {apt.id}
                          </span>
                          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                            apt.status === 'Confirmed' ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800' :
                            apt.status === 'Completed' ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800' :
                            apt.status === 'Pending' ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800' :
                            'bg-red-50 text-red-700 border border-red-200'
                          }`}>
                            {apt.status}
                          </span>
                          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">({apt.type})</span>
                        </div>
                        <h5 className="text-base font-bold text-slate-900 dark:text-white mt-1">{apt.doctorName}</h5>
                        <p className="text-xs text-teal-700 dark:text-teal-400 font-semibold">{apt.doctorSpecialty} • {apt.room || 'Room 204'}</p>
                      </div>

                      <div className="text-left sm:text-right">
                        <span className="block text-xs font-bold text-slate-800 dark:text-slate-200">{apt.date}</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{apt.time}</span>
                        <span className="block text-sm font-extrabold text-teal-700 dark:text-teal-400 mt-0.5 font-mono">{apt.fee}</span>
                      </div>
                    </div>

                    <div className="pt-2.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-600 dark:text-slate-300">
                      <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                        <FileText className="w-3.5 h-3.5 text-slate-400" />
                        <span className="italic line-clamp-1">{apt.symptoms || 'General OPD Health Review'}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setSelectedPass(apt)}
                          className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1"
                        >
                          <QrCode className="w-3.5 h-3.5" />
                          <span>{t('patientViewPass')}</span>
                        </button>

                        {apt.status !== 'Cancelled' && (
                          <button
                            onClick={() => onCancelAppointment(apt.id)}
                            className="text-xs font-semibold text-red-600 dark:text-red-400 hover:underline"
                          >
                            {t('patientCancelAppointment')}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 p-6">
                <Calendar className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{t('patientNoAppointments')}</p>
                <button
                  onClick={() => { onClose(); onBookNew(); }}
                  className="mt-3 px-4 py-2 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 transition-colors"
                >
                  {t('patientBookAnother')}
                </button>
              </div>
            )}
          </div>

          {/* Pass Preview Popup */}
          {selectedPass && (
            <div className="p-5 rounded-2xl bg-slate-100 dark:bg-slate-900 border-2 border-dashed border-teal-500 animate-in fade-in space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-black uppercase text-teal-700 dark:text-teal-400">
                  {t('passTitle')}
                </span>
                <button onClick={() => setSelectedPass(null)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-400 text-[10px] block">Token</span>
                  <span className="text-lg font-bold font-mono text-teal-700 dark:text-teal-400">{selectedPass.tokenNumber}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Appointment ID</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{selectedPass.id}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Doctor</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{selectedPass.doctorName}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Date & Time</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{selectedPass.date} at {selectedPass.time}</span>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => window.print()}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-teal-600 text-white flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Print Pass
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-800 flex justify-end">
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

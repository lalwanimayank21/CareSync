import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  CheckCircle2, 
  ShieldCheck, 
  Video,
  Building,
  ArrowRight,
  Printer,
  Sparkles,
  MapPin
} from 'lucide-react';
import { DOCTORS } from '../data/doctorsData';
import { CLINICS } from '../data/clinicsData';
import { useLanguage } from '../context/LanguageContext';

const AVAILABLE_TIMES = [
  '09:00 AM', '09:30 AM', '10:15 AM', '11:00 AM', 
  '01:30 PM', '02:15 PM', '03:00 PM', '04:15 PM', '05:30 PM'
];

export default function BookingModal({ 
  isOpen, 
  onClose, 
  initialDoctor, 
  initialClinic,
  initialSlot, 
  currentUser,
  onBookingSuccess 
}) {
  const { t, isHindi } = useLanguage();
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [selectedClinicId, setSelectedClinicId] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [consultationType, setConsultationType] = useState('In-Clinic OPD');
  
  // Patient details form
  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [abhaId, setAbhaId] = useState('');
  const [symptoms, setSymptoms] = useState('');
  
  // Booking confirmation state
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize
  useEffect(() => {
    if (isOpen) {
      // Default to tomorrow in YYYY-MM-DD for date input
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const defaultDateStr = tomorrow.toISOString().split('T')[0];
      setSelectedDate(defaultDateStr);

      if (initialDoctor) {
        setSelectedDoctorId(initialDoctor.id);
      } else {
        setSelectedDoctorId(DOCTORS[0].id);
      }

      if (initialClinic) {
        setSelectedClinicId(initialClinic.id);
      } else {
        setSelectedClinicId(CLINICS[0].id);
      }

      if (initialSlot && AVAILABLE_TIMES.includes(initialSlot)) {
        setSelectedTime(initialSlot);
      } else {
        setSelectedTime(AVAILABLE_TIMES[1]);
      }

      if (currentUser) {
        setPatientName(currentUser.name || '');
        setPatientEmail(currentUser.email || '');
        setPatientPhone(currentUser.phone || '+91 98201 54321');
        setAbhaId(currentUser.abhaId || '91-4521-8901-2345');
      } else {
        setPatientName('');
        setPatientEmail('');
        setPatientPhone('');
        setAbhaId('');
      }

      setSymptoms('');
      setConfirmedBooking(null);
    }
  }, [isOpen, initialDoctor, initialClinic, initialSlot, currentUser]);

  if (!isOpen) return null;

  const currentDoctor = DOCTORS.find((d) => d.id === selectedDoctorId) || DOCTORS[0];
  const currentClinic = CLINICS.find((c) => c.id === selectedClinicId) || CLINICS[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      // Indian formatted date DD/MM/YYYY
      const parts = selectedDate.split('-');
      const formattedIndianDate = parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : selectedDate;
      const randomTokenNum = Math.floor(20 + Math.random() * 25);

      const newAppointment = {
        id: `CS-IN-${Math.floor(1000 + Math.random() * 9000)}`,
        tokenNumber: `TK-${randomTokenNum}`,
        patientName: patientName || 'Patient',
        patientEmail: patientEmail || 'patient@example.com',
        patientPhone: patientPhone || '+91 98765 43210',
        patientAge: patientAge || '32',
        abhaId: abhaId || '91-4521-8901-2345',
        doctorId: currentDoctor.id,
        doctorName: currentDoctor.name,
        doctorSpecialty: currentDoctor.specialty,
        clinicName: currentClinic.name,
        date: formattedIndianDate,
        time: selectedTime,
        type: consultationType,
        symptoms: symptoms || 'General OPD Health Review',
        status: 'Confirmed',
        fee: `₹${currentDoctor.fee}`,
        room: currentDoctor.opdRoom || 'Room 204',
        createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
      };

      onBookingSuccess(newAppointment);
      setConfirmedBooking(newAppointment);
      setIsSubmitting(false);
    }, 600);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-white dark:bg-darkbg-card rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-200 transition-colors">
        
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-teal-800 via-teal-700 to-slate-900 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">{t('bookingHeaderTitle')}</h2>
              <p className="text-xs text-teal-200 font-medium">{t('bookingHeaderSubtitle')}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body: Confirmed Pass or Booking Form */}
        {confirmedBooking ? (
          <div className="p-6 sm:p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                {t('bookingConfirmedTitle')}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t('bookingConfirmedSubtitle')}
              </p>
            </div>

            {/* Official OPD Pass Slip */}
            <div className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-900/80 dark:to-slate-900/40 rounded-3xl p-6 border-2 border-dashed border-teal-500/40 text-left space-y-4 max-w-lg mx-auto shadow-sm relative overflow-hidden">
              
              {/* Header Stamp */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <span className="text-[10px] font-black tracking-widest uppercase text-teal-700 dark:text-teal-400">
                    {t('passTitle')}
                  </span>
                  <p className="text-xs text-slate-400 font-mono">Ref: {confirmedBooking.id}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">{t('passTokenNumber')}</span>
                  <span className="text-xl font-extrabold text-teal-700 dark:text-teal-400 font-mono bg-teal-50 dark:bg-teal-950 px-2.5 py-0.5 rounded-lg border border-teal-200 dark:border-teal-800">
                    {confirmedBooking.tokenNumber}
                  </span>
                </div>
              </div>

              {/* Pass Details Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 text-[10px] block uppercase font-bold">{t('passDoctor')}</span>
                  <span className="font-bold text-slate-900 dark:text-white block">{confirmedBooking.doctorName}</span>
                  <span className="text-teal-700 dark:text-teal-400 text-[11px] font-medium">{confirmedBooking.doctorSpecialty}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block uppercase font-bold">{t('passDateTime')}</span>
                  <span className="font-bold text-slate-900 dark:text-white block">{confirmedBooking.date}</span>
                  <span className="text-slate-600 dark:text-slate-300 font-semibold">{confirmedBooking.time} ({confirmedBooking.room})</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block uppercase font-bold">Patient & ABHA ID</span>
                  <span className="font-bold text-slate-900 dark:text-white block">{confirmedBooking.patientName}</span>
                  <span className="text-slate-400 font-mono text-[10px]">{confirmedBooking.abhaId}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block uppercase font-bold">{t('passFee')}</span>
                  <span className="text-base font-extrabold text-emerald-700 dark:text-emerald-400">{confirmedBooking.fee}</span>
                  <span className="text-[10px] text-slate-400 block">Pay at OPD Desk</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
                <span>📍 {confirmedBooking.clinicName}</span>
                <span className="text-emerald-600 font-bold">NABH Verified</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handlePrint}
                className="w-full sm:w-auto px-5 py-2.5 rounded-2xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>{t('passPrint')}</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-7 py-2.5 rounded-2xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 transition-colors shadow-md"
              >
                {t('passClose')}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
            
            {/* Step 1: Doctor, Mode & Clinic */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {t('bookingStep1')}
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <select
                  value={selectedDoctorId}
                  onChange={(e) => setSelectedDoctorId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-sm font-medium text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                >
                  {DOCTORS.map((doc) => (
                    <option key={doc.id} value={doc.id} className="bg-white dark:bg-slate-900">
                      {isHindi ? doc.nameHi : doc.name} — {isHindi ? doc.specialtyHi : doc.specialty} (₹{doc.fee})
                    </option>
                  ))}
                </select>

                {/* Consultation Visit Type */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setConsultationType('In-Clinic OPD')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 transition-all ${
                      consultationType === 'In-Clinic OPD'
                        ? 'bg-teal-50 dark:bg-teal-950/60 border-teal-500 text-teal-800 dark:text-teal-300 shadow-xs'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <Building className="w-3.5 h-3.5 text-teal-600" />
                    <span>{t('bookingModeInClinic')}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setConsultationType('Tele-OPD Video')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 transition-all ${
                      consultationType === 'Tele-OPD Video'
                        ? 'bg-teal-50 dark:bg-teal-950/60 border-teal-500 text-teal-800 dark:text-teal-300 shadow-xs'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <Video className="w-3.5 h-3.5 text-teal-600" />
                    <span>{t('bookingModeTelehealth')}</span>
                  </button>
                </div>
              </div>

              {/* Clinic Location Selector */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Choose Clinic / Medical Center:
                </label>
                <select
                  value={selectedClinicId}
                  onChange={(e) => setSelectedClinicId(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100"
                >
                  {CLINICS.map(clinic => (
                    <option key={clinic.id} value={clinic.id} className="bg-white dark:bg-slate-900">
                      {clinic.name} — {clinic.city} ({clinic.distanceKm} km away)
                    </option>
                  ))}
                </select>
              </div>

              {/* Doctor Summary Preview */}
              {currentDoctor && (
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200/80 dark:border-teal-800 text-xs">
                  <img
                    src={currentDoctor.image}
                    alt={currentDoctor.name}
                    className="w-12 h-12 rounded-xl object-cover object-top border border-white dark:border-slate-700"
                  />
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">{isHindi ? currentDoctor.nameHi : currentDoctor.name}</p>
                    <p className="text-teal-700 dark:text-teal-400 font-semibold">{currentDoctor.hospitalAffiliation}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      OPD Consultation Fee: <strong className="text-emerald-700 dark:text-emerald-400 font-mono">₹{currentDoctor.fee}</strong> • {currentDoctor.opdRoom}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Step 2: Date & Slots */}
            <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {t('bookingStep2')}
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                <input
                  type="date"
                  value={selectedDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-sm font-medium text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
                
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  ⚡ Live token will be generated instantly for OPD queue.
                </span>
              </div>

              {/* Time Slots */}
              <div className="grid grid-cols-3 sm:grid-cols-3 gap-2 pt-1">
                {AVAILABLE_TIMES.map((time) => {
                  const isSelected = selectedTime === time;
                  return (
                    <button
                      type="button"
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all flex items-center justify-center gap-1.5 ${
                        isSelected
                          ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                          : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-teal-300'
                      }`}
                    >
                      <Clock className="w-3 h-3" />
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Patient Form with Indian Fields */}
            <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {t('bookingStep3')}
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    {t('bookingFullName')}
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aarav Sharma"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    {t('bookingPhone')}
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    {t('bookingEmail')}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      required
                      placeholder="patient@example.com"
                      value={patientEmail}
                      onChange={(e) => setPatientEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    {t('bookingABHA')}
                  </label>
                  <input
                    type="text"
                    placeholder="91-XXXX-XXXX-XXXX"
                    value={abhaId}
                    onChange={(e) => setAbhaId(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  {t('bookingSymptoms')}
                </label>
                <textarea
                  rows={2}
                  placeholder={t('bookingSymptomsPlaceholder')}
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span>Zero advance deposit • Pay at OPD counter</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                >
                  {t('bookingCancel')}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 active:scale-[0.98] transition-all shadow-md shadow-teal-600/30 flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <span>{t('bookingSubmitting')}</span>
                  ) : (
                    <>
                      <span>{t('bookingSubmit')}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}

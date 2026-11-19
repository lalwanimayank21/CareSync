import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  UserCheck, 
  Plus, 
  Search, 
  Check, 
  X, 
  ArrowLeft, 
  Clock, 
  Stethoscope,
  Building,
  Sun,
  Moon,
  Globe
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { CLINICS } from '../../data/clinicsData';

export default function AdminDashboard({ 
  onBackToLanding, 
  appointments, 
  onUpdateAppointmentStatus, 
  doctors, 
  patients, 
  onAddNewDoctor 
}) {
  const { t, lang, toggleLanguage } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'appointments', 'doctors', 'clinics', 'patients'
  const [appointmentFilter, setAppointmentFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddDoctorModal, setShowAddDoctorModal] = useState(false);

  // New Doctor Form state
  const [newDocName, setNewDocName] = useState('');
  const [newDocSpecialty, setNewDocSpecialty] = useState('Cardiology');
  const [newDocFee, setNewDocFee] = useState('800');
  const [newDocExperience, setNewDocExperience] = useState('10 yrs exp.');
  const [newDocHospital, setNewDocHospital] = useState('AIIMS New Delhi');

  // Stats calculation
  const totalAppointments = appointments.length;
  const confirmedAppointments = appointments.filter(a => a.status === 'Confirmed').length;
  const pendingAppointments = appointments.filter(a => a.status === 'Pending').length;
  
  // Calculate revenue in ₹
  const totalRevenueNumber = appointments.reduce((sum, apt) => {
    const val = parseInt((apt.fee || '₹800').replace(/\D/g, ''), 10) || 800;
    return sum + val;
  }, 0);

  // Filtered Appointments
  const filteredAppointments = appointments.filter(apt => {
    const matchStatus = appointmentFilter === 'All' || apt.status === appointmentFilter;
    const matchSearch = apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        apt.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        (apt.tokenNumber && apt.tokenNumber.toLowerCase().includes(searchQuery.toLowerCase())) ||
                        apt.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });

  const handleAddDoctorSubmit = (e) => {
    e.preventDefault();
    if (!newDocName) return;

    const newDoc = {
      id: `doc-${Date.now()}`,
      name: newDocName,
      nameHi: newDocName,
      title: `MBBS, MD (${newDocSpecialty}), ${newDocHospital}`,
      titleHi: `एमबीबीएस, एमडी (${newDocSpecialty}), ${newDocHospital}`,
      specialty: newDocSpecialty,
      specialtyHi: newDocSpecialty,
      experience: newDocExperience,
      experienceHi: newDocExperience,
      rating: 5.0,
      reviewCount: 1,
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600',
      hospitalAffiliation: newDocHospital,
      hospitalAffiliationHi: newDocHospital,
      location: 'CareSync Apex Multi-Specialty, Indiranagar, Bengaluru',
      locationHi: 'केयरसिंक एपेक्स, इंदिरानगर, बेंगलुरु',
      city: 'Bengaluru',
      fee: Number(newDocFee),
      education: 'State Medical University & AIIMS',
      about: `${newDocName} is a licensed medical practitioner with extensive clinical OPD experience.`,
      aboutHi: `${newDocName} एक अनुभवी एवं प्रमाणित चिकित्सक हैं।`,
      availableToday: true,
      availableSlots: ['09:30 AM', '02:00 PM', '04:30 PM'],
      currentLiveToken: 1,
      opdRoom: 'Room 205',
      badges: ['Staff Physician', 'NABH Verified']
    };

    onAddNewDoctor(newDoc);
    setShowAddDoctorModal(false);
    setNewDocName('');
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-darkbg-primary flex flex-col md:flex-row text-slate-800 dark:text-slate-200 transition-colors">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-900 dark:bg-[#070b14] text-slate-300 flex flex-col justify-between p-4 flex-shrink-0 border-r border-slate-800">
        <div>
          {/* Logo & Back button */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-teal-500 flex items-center justify-center text-slate-950 font-black">
                <Stethoscope className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h1 className="font-bold text-white text-base">CareSync</h1>
                <p className="text-[10px] text-teal-400 font-semibold uppercase tracking-wider">India Admin Console</p>
              </div>
            </div>

            <button
              onClick={onBackToLanding}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Return to Public Website"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'overview'
                  ? 'bg-teal-600 text-white shadow-md shadow-teal-900/30'
                  : 'hover:bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>{t('adminOverview')}</span>
            </button>

            <button
              onClick={() => setActiveTab('appointments')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'appointments'
                  ? 'bg-teal-600 text-white shadow-md shadow-teal-900/30'
                  : 'hover:bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4" />
                <span>{t('adminAppointments')}</span>
              </div>
              {pendingAppointments > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-400 text-slate-950 font-bold">
                  {pendingAppointments}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('doctors')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'doctors'
                  ? 'bg-teal-600 text-white shadow-md shadow-teal-900/30'
                  : 'hover:bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>{t('adminDoctorsRoster')} ({doctors.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('clinics')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'clinics'
                  ? 'bg-teal-600 text-white shadow-md shadow-teal-900/30'
                  : 'hover:bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <Building className="w-4 h-4" />
              <span>{t('adminClinicsHub')} ({CLINICS.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('patients')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'patients'
                  ? 'bg-teal-600 text-white shadow-md shadow-teal-900/30'
                  : 'hover:bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>{t('adminPatientRecords')} ({patients.length})</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer with Theme & Language */}
        <div className="pt-4 border-t border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1.5 font-bold"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'हिंदी' : 'EN'}</span>
            </button>

            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-300" />}
            </button>
          </div>

          <div className="flex items-center gap-3 pt-1">
            <div className="w-8 h-8 rounded-full bg-teal-600/30 border border-teal-500/50 flex items-center justify-center text-teal-300 font-bold text-xs">
              KC
            </div>
            <div className="flex-1 truncate">
              <p className="text-xs font-semibold text-white truncate">Dr. Katherine Cole</p>
              <p className="text-[10px] text-teal-400">Chief Medical Officer</p>
            </div>
          </div>
          
          <button
            onClick={onBackToLanding}
            className="w-full py-2 px-3 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t('adminBackToWeb')}</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 overflow-y-auto max-h-screen">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-200 dark:border-slate-800 gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white capitalize">
              {activeTab === 'overview' && t('adminOverview')}
              {activeTab === 'appointments' && t('adminAppointments')}
              {activeTab === 'doctors' && t('adminDoctorsRoster')}
              {activeTab === 'clinics' && t('adminClinicsHub')}
              {activeTab === 'patients' && t('adminPatientRecords')}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {t('adminPortalSubtitle')}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddDoctorModal(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 shadow-sm transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>{t('adminAddDoctorBtn')}</span>
            </button>
          </div>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Total Bookings */}
              <div className="p-5 rounded-2xl bg-white dark:bg-darkbg-card border border-slate-200 dark:border-slate-800 shadow-2xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('adminTotalBookings')}</span>
                  <div className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-600 flex items-center justify-center">
                    <Calendar className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-3xl font-extrabold text-slate-900 dark:text-white">{totalAppointments}</p>
                <p className="text-[11px] text-emerald-600 font-semibold mt-1">
                  +{confirmedAppointments} {t('adminStatusConfirmed')}
                </p>
              </div>

              {/* Total Revenue in ₹ */}
              <div className="p-5 rounded-2xl bg-white dark:bg-darkbg-card border border-slate-200 dark:border-slate-800 shadow-2xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('adminRevenue')}</span>
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center font-bold">
                    ₹
                  </div>
                </div>
                <p className="text-3xl font-extrabold text-emerald-700 dark:text-emerald-400 font-mono">
                  ₹{(totalRevenueNumber / 1000).toFixed(1)}k
                </p>
                <p className="text-[11px] text-slate-500 mt-1">Across partner clinics</p>
              </div>

              {/* Pending Action */}
              <div className="p-5 rounded-2xl bg-white dark:bg-darkbg-card border border-slate-200 dark:border-slate-800 shadow-2xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('adminPendingTriage')}</span>
                  <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-3xl font-extrabold text-amber-600">{pendingAppointments}</p>
                <p className="text-[11px] text-slate-500 mt-1">Awaiting verification</p>
              </div>

              {/* Active Doctors */}
              <div className="p-5 rounded-2xl bg-white dark:bg-darkbg-card border border-slate-200 dark:border-slate-800 shadow-2xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('adminActiveDoctors')}</span>
                  <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center">
                    <UserCheck className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-3xl font-extrabold text-slate-900 dark:text-white">{doctors.length}</p>
                <p className="text-[11px] text-teal-600 font-medium mt-1">AIIMS, Fortis & Apollo</p>
              </div>

            </div>

            {/* Recent Appointments Quick Table */}
            <div className="bg-white dark:bg-darkbg-card rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs overflow-hidden">
              <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">Today's Live OPD Schedule</h3>
                  <p className="text-xs text-slate-400">Tokens, triage and live consultation status</p>
                </div>
                <button
                  onClick={() => setActiveTab('appointments')}
                  className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline"
                >
                  View All ({totalAppointments}) →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-500 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 font-bold">
                    <tr>
                      <th className="py-3 px-4">Token #</th>
                      <th className="py-3 px-4">Patient</th>
                      <th className="py-3 px-4">Consultant</th>
                      <th className="py-3 px-4">Date & Time</th>
                      <th className="py-3 px-4">Fee</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                    {appointments.slice(0, 5).map((apt) => (
                      <tr key={apt.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-900/40 transition-colors">
                        <td className="py-3.5 px-4">
                          <span className="font-mono font-bold text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950 px-2 py-0.5 rounded border border-teal-200 dark:border-teal-800">
                            {apt.tokenNumber || 'TK-14'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <p className="font-bold text-slate-900 dark:text-white">{apt.patientName}</p>
                          <p className="text-[11px] text-slate-400">{apt.patientPhone}</p>
                        </td>
                        <td className="py-3.5 px-4">
                          <p className="font-semibold text-slate-800 dark:text-slate-200">{apt.doctorName}</p>
                          <p className="text-[11px] text-teal-600">{apt.doctorSpecialty}</p>
                        </td>
                        <td className="py-3.5 px-4">
                          <p className="text-slate-800 dark:text-slate-200">{apt.date}</p>
                          <p className="text-[11px] text-slate-400">{apt.time} ({apt.type})</p>
                        </td>
                        <td className="py-3.5 px-4 font-bold font-mono text-emerald-700 dark:text-emerald-400">
                          {apt.fee}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            apt.status === 'Confirmed' ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800' :
                            apt.status === 'Pending' ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800' :
                            apt.status === 'Completed' ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800' :
                            'bg-red-50 text-red-700 border border-red-200'
                          }`}>
                            {apt.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {apt.status !== 'Confirmed' && apt.status !== 'Completed' && (
                              <button
                                onClick={() => onUpdateAppointmentStatus(apt.id, 'Confirmed')}
                                className="p-1 rounded-lg text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950"
                                title="Approve"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                            )}
                            {apt.status === 'Confirmed' && (
                              <button
                                onClick={() => onUpdateAppointmentStatus(apt.id, 'Completed')}
                                className="p-1 rounded-lg text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 text-[11px] font-bold"
                              >
                                Complete
                              </button>
                            )}
                            {apt.status !== 'Cancelled' && (
                              <button
                                onClick={() => onUpdateAppointmentStatus(apt.id, 'Cancelled')}
                                className="p-1 rounded-lg text-red-600 hover:bg-red-50"
                                title="Cancel"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: APPOINTMENTS FULL MANAGEMENT */}
        {activeTab === 'appointments' && (
          <div className="space-y-6">
            
            {/* Controls Bar */}
            <div className="bg-white dark:bg-darkbg-card p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col sm:flex-row gap-3 items-center justify-between">
              
              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
                {['All', 'Confirmed', 'Pending', 'Completed', 'Cancelled'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setAppointmentFilter(tab)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      appointmentFilter === tab
                        ? 'bg-teal-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by patient, token, ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>

            </div>

            {/* Full Appointments Table */}
            <div className="bg-white dark:bg-darkbg-card rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-500 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 font-bold">
                    <tr>
                      <th className="py-3 px-4">Token & ID</th>
                      <th className="py-3 px-4">Patient & ABHA</th>
                      <th className="py-3 px-4">Consultant</th>
                      <th className="py-3 px-4">Date & Slot</th>
                      <th className="py-3 px-4">Clinic / Room</th>
                      <th className="py-3 px-4">Fee</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                    {filteredAppointments.map((apt) => (
                      <tr key={apt.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-900/40 transition-colors">
                        <td className="py-3.5 px-4">
                          <p className="font-mono font-bold text-teal-700 dark:text-teal-400">{apt.tokenNumber || 'TK-18'}</p>
                          <p className="text-[10px] text-slate-400 font-mono">{apt.id}</p>
                        </td>
                        <td className="py-3.5 px-4">
                          <p className="font-bold text-slate-900 dark:text-white">{apt.patientName}</p>
                          <p className="text-[11px] text-slate-400">{apt.patientPhone}</p>
                          <p className="text-[10px] text-teal-600 font-mono">ABHA: {apt.abhaId || '91-4521-8901'}</p>
                        </td>
                        <td className="py-3.5 px-4">
                          <p className="font-semibold text-slate-800 dark:text-slate-200">{apt.doctorName}</p>
                          <p className="text-[11px] text-teal-600">{apt.doctorSpecialty}</p>
                        </td>
                        <td className="py-3.5 px-4">
                          <p className="text-slate-800 dark:text-slate-200 font-semibold">{apt.date}</p>
                          <p className="text-[11px] text-slate-400">{apt.time} • {apt.type}</p>
                        </td>
                        <td className="py-3.5 px-4 max-w-[180px]">
                          <p className="truncate text-slate-700 dark:text-slate-300 text-xs">{apt.clinicName}</p>
                          <p className="text-[11px] text-slate-400 font-bold">{apt.room || 'Room 204'}</p>
                        </td>
                        <td className="py-3.5 px-4 font-bold font-mono text-emerald-700 dark:text-emerald-400">{apt.fee}</td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            apt.status === 'Confirmed' ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800' :
                            apt.status === 'Pending' ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800' :
                            apt.status === 'Completed' ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800' :
                            'bg-red-50 text-red-700 border border-red-200'
                          }`}>
                            {apt.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {apt.status !== 'Confirmed' && apt.status !== 'Completed' && (
                              <button
                                onClick={() => onUpdateAppointmentStatus(apt.id, 'Confirmed')}
                                className="px-2 py-1 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-[10px]"
                              >
                                {t('adminActionApprove')}
                              </button>
                            )}
                            {apt.status === 'Confirmed' && (
                              <button
                                onClick={() => onUpdateAppointmentStatus(apt.id, 'Completed')}
                                className="px-2 py-1 rounded bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-[10px]"
                              >
                                {t('adminActionComplete')}
                              </button>
                            )}
                            {apt.status !== 'Cancelled' && (
                              <button
                                onClick={() => onUpdateAppointmentStatus(apt.id, 'Cancelled')}
                                className="px-2 py-1 rounded bg-red-50 hover:bg-red-100 text-red-700 font-bold text-[10px]"
                              >
                                {t('adminActionCancel')}
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: DOCTORS DIRECTORY */}
        {activeTab === 'doctors' && (
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctors.map((doc) => (
                <div key={doc.id} className="bg-white dark:bg-darkbg-card rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-2xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src={doc.image}
                        alt={doc.name}
                        className="w-14 h-14 rounded-xl object-cover object-top border border-slate-200 dark:border-slate-700"
                      />
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">{doc.name}</h4>
                        <span className="text-xs text-teal-600 dark:text-teal-400 font-semibold">{doc.specialty}</span>
                        <p className="text-[11px] text-slate-400">{doc.experience}</p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-3">{doc.about}</p>
                    
                    <div className="space-y-1 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-3">
                      <p><strong>Hospital:</strong> {doc.hospitalAffiliation}</p>
                      <p><strong>OPD Fee:</strong> ₹{doc.fee} / consultation</p>
                      <p><strong>Room:</strong> {doc.opdRoom || 'Room 204'}</p>
                      <p><strong>Rating:</strong> {doc.rating} ★ ({doc.reviewCount} reviews)</p>
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      doc.availableToday ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {doc.availableToday ? 'OPD Duty Today' : 'Off Duty'}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-400">ID: {doc.id}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CLINICS HUB */}
        {activeTab === 'clinics' && (
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {CLINICS.map((clinic) => (
                <div key={clinic.id} className="bg-white dark:bg-darkbg-card rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-2xs flex flex-col justify-between">
                  <div>
                    <img
                      src={clinic.image}
                      alt={clinic.name}
                      className="w-full h-36 object-cover rounded-xl mb-3"
                    />
                    <h4 className="font-bold text-slate-900 dark:text-white text-base">{clinic.name}</h4>
                    <p className="text-xs text-teal-600 font-semibold">{clinic.city} • {clinic.area}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">{clinic.address}</p>
                    <p className="text-xs text-slate-500 mt-1">📞 {clinic.phone}</p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700 dark:text-slate-300">Distance: {clinic.distanceKm} km</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold">NABH Accredited</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: PATIENTS DIRECTORY */}
        {activeTab === 'patients' && (
          <div className="bg-white dark:bg-darkbg-card rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs overflow-hidden">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Registered Patients Directory ({patients.length})</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-500 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 font-bold">
                  <tr>
                    <th className="py-3 px-4">Patient ID</th>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Contact</th>
                    <th className="py-3 px-4">ABHA ID</th>
                    <th className="py-3 px-4">Age / City</th>
                    <th className="py-3 px-4">Blood Group</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                  {patients.map((pat) => (
                    <tr key={pat.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-900/40">
                      <td className="py-3.5 px-4 font-mono font-bold text-teal-700 dark:text-teal-400">{pat.id}</td>
                      <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">{pat.name}</td>
                      <td className="py-3.5 px-4">
                        <p className="text-slate-700 dark:text-slate-300">{pat.email}</p>
                        <p className="text-[10px] text-slate-400">{pat.phone}</p>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[11px] text-slate-600 dark:text-slate-400">
                        {pat.abhaId || '91-4521-8901-2345'}
                      </td>
                      <td className="py-3.5 px-4">{pat.age} yrs • {pat.city || 'Bengaluru'}</td>
                      <td className="py-3.5 px-4 font-bold text-teal-800 dark:text-teal-300">{pat.bloodGroup}</td>
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200">
                          {pat.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>

      {/* Add Doctor Modal */}
      {showAddDoctorModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-darkbg-card rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Add New Medical Consultant</h3>
              <button onClick={() => setShowAddDoctorModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddDoctorSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Doctor Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Raghavan Iyer"
                  value={newDocName}
                  onChange={(e) => setNewDocName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Specialty</label>
                <select
                  value={newDocSpecialty}
                  onChange={(e) => setNewDocSpecialty(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="Cardiology">Cardiology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Dermatology">Dermatology</option>
                  <option value="General Medicine">General Medicine</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">OPD Fee (₹)</label>
                  <input
                    type="number"
                    value={newDocFee}
                    onChange={(e) => setNewDocFee(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Experience</label>
                  <input
                    type="text"
                    value={newDocExperience}
                    onChange={(e) => setNewDocExperience(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Hospital Affiliation</label>
                <input
                  type="text"
                  value={newDocHospital}
                  onChange={(e) => setNewDocHospital(e.target.value)}
                  placeholder="e.g. AIIMS New Delhi / Apollo"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddDoctorModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow-md"
                >
                  Add Consultant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

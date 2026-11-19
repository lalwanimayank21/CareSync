import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TokenQueueTracker from './components/TokenQueueTracker';
import ClinicsDiscovery from './components/ClinicsDiscovery';
import ServicesSection from './components/ServicesSection';
import DoctorListing from './components/DoctorListing';
import DoctorModal from './components/DoctorModal';
import BookingModal from './components/BookingModal';
import AuthModal from './components/AuthModal';
import PatientPortalModal from './components/PatientPortalModal';
import DoctorPortalModal from './components/DoctorPortalModal';
import AdminDashboard from './components/Admin/AdminDashboard';
import Testimonials from './components/Testimonials';
import AppointmentCTA from './components/AppointmentCTA';
import Footer from './components/Footer';
import Toast from './components/Toast';

import { DOCTORS } from './data/doctorsData';
import { INITIAL_APPOINTMENTS, INITIAL_PATIENTS } from './data/initialAppointments';

function MainApp() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'admin'

  // App Data State (synced with localStorage)
  const [doctors, setDoctors] = useState(() => {
    const saved = localStorage.getItem('caresync_doctors_v3');
    return saved ? JSON.parse(saved) : DOCTORS;
  });

  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem('caresync_appointments_v2');
    return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
  });

  const [patients, setPatients] = useState(() => {
    const saved = localStorage.getItem('caresync_patients_v2');
    return saved ? JSON.parse(saved) : INITIAL_PATIENTS;
  });

  // Auth state
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('caresync_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Filter criteria from Hero search to DoctorListing
  const [filterCriteria, setFilterCriteria] = useState({
    specialty: 'All Specialties',
    city: 'All Cities',
    query: ''
  });

  // Modals state
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState(null);
  const [selectedClinicForBooking, setSelectedClinicForBooking] = useState(null);
  const [selectedSlotForBooking, setSelectedSlotForBooking] = useState(null);

  const [doctorModalOpen, setDoctorModalOpen] = useState(false);
  const [selectedDoctorForModal, setSelectedDoctorForModal] = useState(null);

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const [patientPortalOpen, setPatientPortalOpen] = useState(false);
  const [doctorPortalOpen, setDoctorPortalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('caresync_doctors_v2', JSON.stringify(doctors));
  }, [doctors]);

  useEffect(() => {
    localStorage.setItem('caresync_appointments_v2', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('caresync_patients_v2', JSON.stringify(patients));
  }, [patients]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('caresync_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('caresync_user');
    }
  }, [currentUser]);

  // Handlers
  const handleOpenBooking = (doctor = null, slot = null, clinic = null) => {
    setSelectedDoctorForBooking(doctor);
    setSelectedSlotForBooking(slot);
    setSelectedClinicForBooking(clinic);
    setBookingModalOpen(true);
  };

  const handleOpenDoctorProfile = (doctor) => {
    setSelectedDoctorForModal(doctor);
    setDoctorModalOpen(true);
  };

  const handleOpenAuth = (mode = 'login') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
    setToast({
      message: `Welcome, ${user.name}! Successfully signed in.`,
      type: 'success'
    });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    if (currentView === 'admin') {
      setCurrentView('landing');
    }
    setToast({
      message: 'Signed out successfully.',
      type: 'info'
    });
  };

  const handleBookingSuccess = (newAppointment) => {
    setAppointments((prev) => [newAppointment, ...prev]);

    // Check if patient already exists in patients roster, if not add
    setPatients((prev) => {
      const exists = prev.some((p) => p.email.toLowerCase() === newAppointment.patientEmail.toLowerCase());
      if (!exists) {
        return [
          {
            id: `PAT-IND-${prev.length + 1 < 10 ? '0' : ''}${prev.length + 1}`,
            name: newAppointment.patientName,
            email: newAppointment.patientEmail,
            phone: newAppointment.patientPhone,
            age: 32,
            gender: 'Patient',
            bloodGroup: 'B+',
            abhaId: newAppointment.abhaId,
            city: 'Bengaluru',
            lastVisit: newAppointment.date,
            totalVisits: 1,
            status: 'Active'
          },
          ...prev
        ];
      }
      return prev;
    });

    setToast({
      message: `Token ${newAppointment.tokenNumber} allocated! Appointment confirmed with ${newAppointment.doctorName}.`,
      type: 'success'
    });
  };

  const handleUpdateAppointmentStatus = (id, newStatus) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status: newStatus } : apt))
    );
    setToast({
      message: `Appointment ${id} status updated to ${newStatus}.`,
      type: 'info'
    });
  };

  const handleCancelAppointment = (id) => {
    handleUpdateAppointmentStatus(id, 'Cancelled');
  };

  const handleAddNewDoctor = (newDoc) => {
    setDoctors((prev) => [newDoc, ...prev]);
    setToast({
      message: `${newDoc.name} added to the medical consultant directory.`,
      type: 'success'
    });
  };

  const handleAdvanceDoctorToken = (docId) => {
    setDoctors(prev => prev.map(d => {
      if (d.id === docId) {
        const nextToken = (d.currentLiveToken || 15) + 1;
        return { ...d, currentLiveToken: nextToken };
      }
      return d;
    }));
    setToast({
      message: `Advanced to Next Token in OPD room.`,
      type: 'info'
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-800 dark:text-slate-100 font-sans selection:bg-teal-500 selection:text-white transition-colors duration-200">

      {/* Toast Notification Container */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Conditionally Render: Admin Dashboard Layout OR Landing Page View */}
      {currentView === 'admin' ? (
        <AdminDashboard
          onBackToLanding={() => setCurrentView('landing')}
          appointments={appointments}
          onUpdateAppointmentStatus={handleUpdateAppointmentStatus}
          doctors={doctors}
          patients={patients}
          onAddNewDoctor={handleAddNewDoctor}
        />
      ) : (
        <div className="flex flex-col min-h-screen">

          {/* 1. Header & Navbar with Theme & Language Switches */}
          <Navbar
            onOpenBooking={() => handleOpenBooking(null)}
            onOpenAuth={handleOpenAuth}
            currentUser={currentUser}
            onLogout={handleLogout}
            currentView={currentView}
            onViewChange={setCurrentView}
            onOpenPatientPortal={() => setPatientPortalOpen(true)}
            onOpenDoctorPortal={() => setDoctorPortalOpen(true)}
          />

          {/* Main Landing Page Content */}
          <main className="flex-1">

            {/* 2. Hero Section with Doctor Search & Live Stats */}
            <Hero
              onSearchSubmit={(criteria) => setFilterCriteria(criteria)}
              onOpenBooking={() => handleOpenBooking(null)}
            />

            {/* 3. Live OPD Queue & Token Tracker Widget */}
            <TokenQueueTracker
              onOpenBooking={() => handleOpenBooking(null)}
            />

            {/* 4. Nearby Clinics & OPD Centers Discovery */}
            <ClinicsDiscovery
              onBookClinic={(clinic) => handleOpenBooking(null, null, clinic)}
            />

            {/* 5. Healthcare Services Section */}
            <ServicesSection
              onOpenBooking={() => handleOpenBooking(null)}
            />

            {/* 6. Featured Doctors Listing Section with Real-Time Filters */}
            <DoctorListing
              doctors={doctors}
              filterCriteria={filterCriteria}
              onFilterChange={setFilterCriteria}
              onBookDoctor={(doc, slot) => handleOpenBooking(doc, slot)}
              onViewDoctorProfile={handleOpenDoctorProfile}
            />

            {/* 7. Patient Testimonials & Trust */}
            <Testimonials />

            {/* 8. Appointment Booking Call-to-Action Banner */}
            <AppointmentCTA
              onOpenBooking={() => handleOpenBooking(null)}
            />

          </main>

          {/* 9. Professional SaaS Footer with NABH & Demo Disclaimer */}
          <Footer
            onOpenBooking={() => handleOpenBooking(null)}
            onOpenAuth={handleOpenAuth}
            onViewAdmin={() => setCurrentView('admin')}
            onOpenDoctorPortal={() => setDoctorPortalOpen(true)}
          />

        </div>
      )}

      {/* Interactive Modals */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialDoctor={selectedDoctorForBooking}
        initialClinic={selectedClinicForBooking}
        initialSlot={selectedSlotForBooking}
        currentUser={currentUser}
        onBookingSuccess={handleBookingSuccess}
      />

      <DoctorModal
        isOpen={doctorModalOpen}
        onClose={() => setDoctorModalOpen(false)}
        doctor={selectedDoctorForModal}
        onBook={(doc, slot) => handleOpenBooking(doc, slot)}
      />

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
        onAuthSuccess={handleAuthSuccess}
      />

      <PatientPortalModal
        isOpen={patientPortalOpen}
        onClose={() => setPatientPortalOpen(false)}
        currentUser={currentUser}
        appointments={appointments}
        onCancelAppointment={handleCancelAppointment}
        onBookNew={() => handleOpenBooking(null)}
      />

      <DoctorPortalModal
        isOpen={doctorPortalOpen}
        onClose={() => setDoctorPortalOpen(false)}
        doctor={doctors[0]}
        appointments={appointments}
        onAdvanceToken={handleAdvanceDoctorToken}
        onCompleteAppointment={(id) => handleUpdateAppointmentStatus(id, 'Completed')}
      />

    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <MainApp />
      </LanguageProvider>
    </ThemeProvider>
  );
}

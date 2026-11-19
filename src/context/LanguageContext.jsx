import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const TRANSLATIONS = {
  en: {
    // Navigation
    brandName: 'CareSync',
    brandTagline: 'India Health Network',
    navHome: 'Home',
    navDoctors: 'Find Doctors',
    navClinics: 'Nearby Clinics',
    navServices: 'Services',
    navTokenTracker: 'Live OPD Queue',
    navAbout: 'About Us',
    navPatientPortal: 'Patient Portal',
    navDoctorPortal: 'Doctor Portal',
    navAdminPortal: 'Admin Portal',
    navSignIn: 'Sign In',
    navSignOut: 'Sign Out',
    navBookAppointment: 'Book Appointment',
    demoNotice: 'Demonstration Environment — Demo Clinic & Doctor Data for Evaluation',

    // Hero Section
    heroBadge: 'Next-Gen Indian Healthcare Platform',
    heroTitleLine1: 'Your Health,',
    heroTitleLine2: 'Our Priority',
    heroSubtitle: 'Connect with premier board-certified specialists, discover nearby verified clinics, track live OPD token numbers in real-time, and access integrated ABHA-ready digital health records.',
    heroSearchDoctorPlaceholder: 'Search by doctor name or specialty...',
    heroSpecialtyLabel: 'Specialty',
    heroLocationLabel: 'City / Clinic Area',
    heroSearchBtn: 'Search Doctors & Clinics',
    heroPopularSearches: 'Popular Specialities:',
    heroAvailableToday: 'Available Today in OPD',

    // Hero Trust Stats
    statsDoctors: '120+ Specialists',
    statsDoctorsSub: 'AIIMS & Premier Institutes',
    statsPatients: '45,000+ Consultations',
    statsPatientsSub: 'Pan-India Trust',
    statsClinics: '18+ Partner Centers',
    statsClinicsSub: 'Bengaluru, Delhi, Mumbai',
    statsSatisfaction: '99.4% Rating',
    statsSatisfactionSub: 'Patient Verified',

    // Token Queue Tracker
    tokenHeaderTitle: 'Live OPD Queue & Token Tracker',
    tokenHeaderSubtitle: 'Avoid waiting in crowded hospital lobbies. Track your live token status in real-time from anywhere.',
    tokenCurrentlyServing: 'Currently Inside Consultation',
    tokenYourToken: 'Your Token Number',
    tokenPatientsAhead: 'Patients Ahead',
    tokenEstWait: 'Estimated Wait Time',
    tokenRoom: 'OPD Room #',
    tokenDoctorOnDuty: 'Attending Physician',
    tokenTrackInputPlaceholder: 'Enter Token Number or Appointment ID (e.g. TK-18, CS-IN-1001)...',
    tokenTrackBtn: 'Track Token',
    tokenStatusOnTrack: 'On Schedule • Please remain in clinic waiting area when within 2 tokens',
    tokenStatusCalled: 'Your Token Has Been Called! Please proceed to OPD Room',

    // Clinics Discovery Section
    clinicsHeaderTag: 'Locate Medical Centers',
    clinicsHeaderTitle: 'Nearby Partner Clinics & OPD Centers',
    clinicsHeaderSubtitle: 'State-of-the-art diagnostic facilities and clinic hubs near you with metro connectivity and parking.',
    clinicsDetectLocation: 'Auto-Detect Location',
    clinicsSelectCity: 'Select City:',
    clinicsFilterAll: 'All Clinics',
    clinicsDistanceKm: 'km away',
    clinicsGetDirections: 'Get Directions',
    clinicsBookAtCenter: 'Book OPD at Center',
    clinicsHours: 'OPD Hours:',
    clinicsTraumaUnit: '24/7 Emergency & Trauma',
    clinicsNABH: 'NABH Accredited',

    // Clinical Services
    servicesHeaderTag: 'Comprehensive Medical Care',
    servicesHeaderTitle: 'Specialized Clinical Departments',
    servicesHeaderSubtitle: 'From routine health screenings to advanced cardiology, pediatrics, and telehealth consultations.',
    servicesStartingFrom: 'OPD Consultation from',
    servicesBookService: 'Book Consultation',

    // Doctor Listing Section
    doctorsHeaderTag: 'Verified Medical Specialists',
    doctorsHeaderTitle: 'Consult Leading Specialists',
    doctorsHeaderSubtitle: 'Experienced consultants from AIIMS, Apollo, Fortis, Max, and premier medical research institutes.',
    doctorsSearchPlaceholder: 'Search by doctor name, specialty, or hospital...',
    doctorsFilterSpecialty: 'Specialty:',
    doctorsAvailableTodayOnly: 'OPD Duty Today Only',
    doctorsClearFilters: 'Clear Filters',
    doctorsNextAvailableSlot: 'Next Available OPD Slots:',
    doctorsExp: 'Experience',
    doctorsAffiliation: 'Hospital Affiliation',
    doctorsConsultationFee: 'Consultation Fee:',
    doctorsPerVisit: '/ visit',
    doctorsViewProfile: 'View Bio',
    doctorsBookVisit: 'Book OPD Slot',
    doctorsNoResults: 'No doctors found matching your criteria. Try resetting filters.',

    // Doctor Modal
    docModalBio: 'Doctor Biography & Clinical Focus',
    docModalEducation: 'Education & Credentials',
    docModalHospital: 'Hospital Affiliation',
    docModalHighlights: 'Key Clinical Standards',
    docModalNABHCompliant: 'NABH Protocol & Quality Verified',
    docModalEPrescription: 'Instant Digital E-Prescription with ABHA Sync',
    docModalSlots: 'Available Consultation Slots',
    docModalClose: 'Close',

    // Appointment Booking Flow
    bookingHeaderTitle: 'Schedule OPD Consultation',
    bookingHeaderSubtitle: 'CareSync Fast-Track Appointment & Token Generation',
    bookingStep1: '1. Select Doctor & Consultation Mode',
    bookingModeInClinic: 'In-Clinic OPD',
    bookingModeTelehealth: 'Tele-OPD Video',
    bookingStep2: '2. Select Date & Time Slot',
    bookingStep3: '3. Patient Details (Indian Healthcare Form)',
    bookingFullName: 'Patient Full Name',
    bookingPhone: 'Phone (+91 Mobile)',
    bookingEmail: 'Email Address',
    bookingAge: 'Age',
    bookingABHA: 'ABHA ID (Ayushman Bharat ID - Optional)',
    bookingSymptoms: 'Chief Complaints / Symptoms',
    bookingSymptomsPlaceholder: 'e.g. Mild chest tightness, recurring headache, pediatric vaccination...',
    bookingCancel: 'Cancel',
    bookingSubmit: 'Confirm & Generate OPD Token',
    bookingSubmitting: 'Generating Pass...',

    // Booking Confirmation & Pass
    bookingConfirmedTitle: 'OPD Appointment Confirmed!',
    bookingConfirmedSubtitle: 'Your token has been allocated in the live OPD roster.',
    passTitle: 'CareSync India Official OPD Pass',
    passTokenNumber: 'OPD Token No.',
    passRefId: 'Appointment ID',
    passDoctor: 'Consultant',
    passClinic: 'Clinic Location',
    passDateTime: 'Reporting Date & Time',
    passType: 'Visit Type',
    passFee: 'OPD Fee (Payable at desk / online)',
    passPrint: 'Print / Save Pass',
    passClose: 'Done',

    // Patient Dashboard / Portal
    patientPortalTitle: 'My Health Portal',
    patientPortalSubtitle: 'Digital Health Records, Tokens & Prescriptions',
    patientHealthSummary: 'Patient Health Card',
    patientBloodGroup: 'Blood Group',
    patientABHAStatus: 'ABHA Linked',
    patientInsurance: 'Health Insurance',
    patientMyAppointments: 'My Booked Appointments',
    patientNoAppointments: 'No appointments scheduled yet.',
    patientCancelAppointment: 'Cancel Appointment',
    patientBookAnother: 'Book New Appointment',
    patientViewPass: 'View OPD Pass',

    // Doctor Dashboard
    doctorPortalTitle: 'Doctor OPD Console',
    doctorPortalSubtitle: 'Live Clinic Queue & Patient Consultations',
    doctorTodayQueue: "Today's Patient Queue",
    doctorCallNext: 'Call Next Token',
    doctorMarkDone: 'Mark Completed',
    doctorAddRx: 'Add Rx / Notes',
    doctorDutyStatus: 'On Duty (OPD Active)',
    doctorTotalServedToday: 'Patients Consulted Today',
    doctorPendingInQueue: 'Waiting in Lobby',

    // Admin Dashboard
    adminPortalTitle: 'Clinic Operations Console',
    adminPortalSubtitle: 'Pan-India Clinic Management & Hospital Analytics',
    adminTotalBookings: 'Total OPD Bookings',
    adminRevenue: 'Estimated OPD Revenue',
    adminPendingTriage: 'Pending Triage',
    adminActiveDoctors: 'Doctors on Duty',
    adminOverview: 'Operations Overview',
    adminAppointments: 'All Bookings',
    adminDoctorsRoster: 'Doctor Roster',
    adminClinicsHub: 'Clinic Centers',
    adminPatientRecords: 'Patient Directory',
    adminAddDoctorBtn: 'Add New Consultant',
    adminBackToWeb: 'Back to Website',
    adminStatusConfirmed: 'Confirmed',
    adminStatusPending: 'Pending',
    adminStatusCompleted: 'Completed',
    adminStatusCancelled: 'Cancelled',
    adminActionApprove: 'Approve',
    adminActionComplete: 'Complete',
    adminActionCancel: 'Cancel',

    // Testimonials
    testimonialsTag: 'Patient Stories',
    testimonialsTitle: 'Trusted Across India by Families & Professionals',
    testimonialsSubtitle: 'Real experiences from patients who value zero lobby delays, transparent fees in INR, and world-class specialists.',

    // Appointment CTA
    ctaTag: 'Instant OPD Access',
    ctaTitleLine1: 'Ready to Prioritize Your Wellness?',
    ctaTitleLine2: 'Book a Consultation in 2 Minutes.',
    ctaSubtitle: 'Direct confirmation, guaranteed OPD token generation, free cancellation up to 2 hours before the visit.',
    ctaBookNow: 'Book An Appointment Now',
    ctaCallDesk: 'Call Toll-Free Desk: 1800-227-3796',

    // Footer
    footerMission: 'CareSync India is a next-generation healthcare platform revolutionizing OPD queues, clinic discovery, and ABHA-integrated health management.',
    footerCompliance: 'NABH Guidelines & Digital Personal Data Protection (DPDP) Act Compliant',
    footerQuickLinks: 'Quick Links',
    footerDepartments: 'Specialties',
    footerContactHours: 'Contact & Helpline',
    footerHeadOffice: 'Corporate Hub: 84 MG Road, Indiranagar, Bengaluru, Karnataka 560038',
    footerHelpline: 'National Helpline: 1800-227-3796 (Toll Free)',
    footerEmail: 'care@caresync.in',
    footerHours: 'OPD Hours: Mon - Sat: 8:00 AM - 9:00 PM IST',
    footerEmergency: '24/7 Emergency Trauma Desk: Dial 112 / 108',
    footerRights: 'CareSync Healthcare Systems Pvt. Ltd. All rights reserved.',
    footerDemoDisclaimer: 'Disclaimer: This web application is a technology demonstration platform. Doctor listings, clinic locations, and token queues represent simulated demonstration data for evaluation purposes.',

    // General Actions & Feedback
    themeToggleLight: 'Light Mode',
    themeToggleDark: 'Dark Mode',
    langToggle: 'हिंदी',
    loading: 'Loading...',
    success: 'Success',
    close: 'Close',
  },

  hi: {
    // Navigation
    brandName: 'केयरसिंक',
    brandTagline: 'भारत स्वास्थ्य नेटवर्क',
    navHome: 'होम',
    navDoctors: 'डॉक्टर खोजें',
    navClinics: 'नजदीकी क्लीनिक',
    navServices: 'सेवाएं',
    navTokenTracker: 'लाइव ओपीडी टोकन',
    navAbout: 'हमारे बारे में',
    navPatientPortal: 'मरीज पोर्टल',
    navDoctorPortal: 'डॉक्टर पोर्टल',
    navAdminPortal: 'प्रशासन पोर्टल',
    navSignIn: 'लॉग इन',
    navSignOut: 'लॉग आउट',
    navBookAppointment: 'अपॉइंटमेंट बुक करें',
    demoNotice: 'प्रदर्शन वातावरण — मूल्यांकन के लिए सांकेतिक भारतीय स्वास्थ्य डेटा',

    // Hero Section
    heroBadge: 'आधुनिक भारतीय स्वास्थ्य सेवा मंच',
    heroTitleLine1: 'आपका स्वास्थ्य,',
    heroTitleLine2: 'हमारी सर्वोच्च प्राथमिकता',
    heroSubtitle: 'शीर्ष विशेषज्ञ डॉक्टरों से परामर्श लें, नजदीकी क्लीनिक खोजें, लाइव ओपीडी टोकन नंबर ट्रैक करें और आभा (ABHA) समर्थित डिजिटल स्वास्थ्य रिकॉर्ड सुरक्षित रखें।',
    heroSearchDoctorPlaceholder: 'डॉक्टर का नाम या विशेषज्ञता खोजें...',
    heroSpecialtyLabel: 'विशेषज्ञता',
    heroLocationLabel: 'शहर / क्लीनिक क्षेत्र',
    heroSearchBtn: 'डॉक्टर एवं क्लीनिक खोजें',
    heroPopularSearches: 'लोकप्रिय विशेषज्ञता:',
    heroAvailableToday: 'आज ओपीडी में उपलब्ध',

    // Hero Trust Stats
    statsDoctors: '120+ विशेषज्ञ',
    statsDoctorsSub: 'एम्स एवं प्रमुख संस्थान',
    statsPatients: '45,000+ परामर्श',
    statsPatientsSub: 'अखिल भारतीय विश्वास',
    statsClinics: '18+ संबद्ध केंद्र',
    statsClinicsSub: 'बेंगलुरु, दिल्ली, मुंबई',
    statsSatisfaction: '99.4% संतुष्टि',
    statsSatisfactionSub: 'मरीजों द्वारा सत्यापित',

    // Token Queue Tracker
    tokenHeaderTitle: 'लाइव ओपीडी कतार एवं टोकन ट्रैकर',
    tokenHeaderSubtitle: 'भीड़भाड़ वाले अस्पताल में इंतजार से बचें। कहीं से भी लाइव टोकन स्थिति और अनुमानित समय देखें।',
    tokenCurrentlyServing: 'वर्तमान परामर्श टोकन',
    tokenYourToken: 'आपका टोकन नंबर',
    tokenPatientsAhead: 'आगे मरीज बाकी',
    tokenEstWait: 'अनुमानित प्रतीक्षा समय',
    tokenRoom: 'ओपीडी कक्ष #',
    tokenDoctorOnDuty: 'परामर्शदाता चिकित्सक',
    tokenTrackInputPlaceholder: 'टोकन नंबर या अपॉइंटमेंट आईडी दर्ज करें (जैसे TK-18, CS-IN-1001)...',
    tokenTrackBtn: 'टोकन ट्रैक करें',
    tokenStatusOnTrack: 'समय पर • कतार में 2 टोकन शेष रहने पर कृपया ओपीडी प्रतीक्षालय में उपस्थित रहें',
    tokenStatusCalled: 'आपका टोकन पुकारा गया है! कृपया ओपीडी कक्ष में जाएं',

    // Clinics Discovery Section
    clinicsHeaderTag: 'चिकित्सा केंद्र खोजें',
    clinicsHeaderTitle: 'नजदीकी संबद्ध क्लीनिक एवं ओपीडी केंद्र',
    clinicsHeaderSubtitle: 'मेट्रो कनेक्टिविटी, आधुनिक प्रयोगशाला और पार्किंग सुविधा से युक्त प्रमाणित स्वास्थ्य केंद्र।',
    clinicsDetectLocation: 'मेरा स्थान पहचानें',
    clinicsSelectCity: 'शहर चुनें:',
    clinicsFilterAll: 'सभी क्लीनिक',
    clinicsDistanceKm: 'किमी दूर',
    clinicsGetDirections: 'दिशा निर्देश (मैप)',
    clinicsBookAtCenter: 'इस केंद्र पर ओपीडी बुक करें',
    clinicsHours: 'ओपीडी समय:',
    clinicsTraumaUnit: '24/7 आपातकालीन एवं ट्रॉमा सेवा',
    clinicsNABH: 'एनएबीएच (NABH) प्रमाणित',

    // Clinical Services
    servicesHeaderTag: 'व्यापक स्वास्थ्य सेवाएं',
    servicesHeaderTitle: 'विशेषज्ञ चिकित्सा विभाग',
    servicesHeaderSubtitle: 'नियमित स्वास्थ्य जांच से लेकर कार्डियोलॉजी, बाल रोग और ऑनलाइन टेली-परामर्श तक।',
    servicesStartingFrom: 'परामर्श शुल्क न्यूनतम',
    servicesBookService: 'परामर्श बुक करें',

    // Doctor Listing Section
    doctorsHeaderTag: 'प्रमाणित चिकित्सा विशेषज्ञ',
    doctorsHeaderTitle: 'शीर्ष विशेषज्ञ डॉक्टरों से परामर्श लें',
    doctorsHeaderSubtitle: 'एम्स (AIIMS), अपोलो, फोर्टिस, मैक्स और प्रमुख चिकित्सा संस्थानों से प्रशिक्षित एवं अनुभवी चिकित्सक।',
    doctorsSearchPlaceholder: 'डॉक्टर, विशेषज्ञता या अस्पताल के नाम से खोजें...',
    doctorsFilterSpecialty: 'विशेषज्ञता:',
    doctorsAvailableTodayOnly: 'केवल आज ओपीडी में उपस्थित',
    doctorsClearFilters: 'फ़िल्टर हटाएं',
    doctorsNextAvailableSlot: 'निकटतम उपलब्ध समय स्लॉट:',
    doctorsExp: 'अनुभव',
    doctorsAffiliation: 'संबद्ध अस्पताल',
    doctorsConsultationFee: 'परामर्श शुल्क:',
    doctorsPerVisit: '/ परामर्श',
    doctorsViewProfile: 'परिचय देखें',
    doctorsBookVisit: 'ओपीडी स्लॉट बुक करें',
    doctorsNoResults: 'आपकी खोज से मेल खाता कोई डॉक्टर नहीं मिला। कृपया फ़िल्टर रीसेट करें।',

    // Doctor Modal
    docModalBio: 'चिकित्सक परिचय एवं विशेषज्ञता',
    docModalEducation: 'शिक्षा एवं योग्यता',
    docModalHospital: 'अस्पताल संबद्धता',
    docModalHighlights: 'प्रमुख गुणवत्ता मानक',
    docModalNABHCompliant: 'एनएबीएच (NABH) प्रोटोकॉल द्वारा सत्यापित',
    docModalEPrescription: 'आभा (ABHA) समर्थित तत्काल डिजिटल ई-प्रिस्क्रिप्शन',
    docModalSlots: 'उपलब्ध परामर्श समय',
    docModalClose: 'बंद करें',

    // Appointment Booking Flow
    bookingHeaderTitle: 'ओपीडी अपॉइंटमेंट बुक करें',
    bookingHeaderSubtitle: 'केयरसिंक त्वरित स्लॉट एवं टोकन जनरेटर',
    bookingStep1: '1. डॉक्टर एवं परामर्श प्रकार चुनें',
    bookingModeInClinic: 'क्लीनिक में प्रत्यक्ष ओपीडी',
    bookingModeTelehealth: 'टेली-ओपीडी वीडियो परामर्श',
    bookingStep2: '2. दिनांक एवं समय स्लॉट चुनें',
    bookingStep3: '3. मरीज का विवरण (भारतीय स्वास्थ्य फॉर्म)',
    bookingFullName: 'मरीज का पूरा नाम',
    bookingPhone: 'मोबाइल नंबर (+91)',
    bookingEmail: 'ईमेल पता',
    bookingAge: 'आयु',
    bookingABHA: 'आभा आईडी (आयुष्मान भारत स्वास्थ्य खाता - वैकल्पिक)',
    bookingSymptoms: 'प्रमुख लक्षण / बीमारी का विवरण',
    bookingSymptomsPlaceholder: 'जैसे हल्का सीने में दर्द, सिरदर्द, बच्चे का नियमित टीकाकरण...',
    bookingCancel: 'रद्द करें',
    bookingSubmit: 'पुष्टि करें और ओपीडी टोकन पाएं',
    bookingSubmitting: 'टोकन तैयार हो रहा है...',

    // Booking Confirmation & Pass
    bookingConfirmedTitle: 'ओपीडी अपॉइंटमेंट की पुष्टि हो गई!',
    bookingConfirmedSubtitle: 'आपका टोकन नंबर ओपीडी रोस्टर में आवंटित कर दिया गया है।',
    passTitle: 'केयरसिंक भारत आधिकारिक ओपीडी प्रवेश पत्र (Pass)',
    passTokenNumber: 'ओपीडी टोकन नं.',
    passRefId: 'अपॉइंटमेंट संदर्भ आईडी',
    passDoctor: 'परामर्शदाता चिकित्सक',
    passClinic: 'क्लीनिक का पता',
    passDateTime: 'पहुंचने की तिथि एवं समय',
    passType: 'परामर्श प्रकार',
    passFee: 'परामर्श शुल्क (रिसेप्शन पर देय)',
    passPrint: 'पास प्रिंट / सेव करें',
    passClose: 'समाप्त',

    // Patient Dashboard / Portal
    patientPortalTitle: 'मेरा स्वास्थ्य पोर्टल',
    patientPortalSubtitle: 'डिजिटल स्वास्थ्य रिकॉर्ड, लाइव टोकन एवं पर्चियां',
    patientHealthSummary: 'मरीज स्वास्थ्य कार्ड',
    patientBloodGroup: 'रक्त समूह',
    patientABHAStatus: 'आभा (ABHA) लिंक',
    patientInsurance: 'स्वास्थ्य बीमा',
    patientMyAppointments: 'मेरे बुक किए गए अपॉइंटमेंट',
    patientNoAppointments: 'अभी तक कोई अपॉइंटमेंट नहीं है।',
    patientCancelAppointment: 'अपॉइंटमेंट रद्द करें',
    patientBookAnother: 'नया अपॉइंटमेंट बुक करें',
    patientViewPass: 'ओपीडी पास देखें',

    // Doctor Dashboard
    doctorPortalTitle: 'डॉक्टर ओपीडी कंसोल',
    doctorPortalSubtitle: 'लाइव मरीज कतार एवं दैनिक परामर्श प्रबंधन',
    doctorTodayQueue: 'आज की मरीज कतार',
    doctorCallNext: 'अगला टोकन बुलाएं',
    doctorMarkDone: 'परामर्श पूर्ण चिह्नित करें',
    doctorAddRx: 'दवा / पर्ची नोट जोड़ें',
    doctorDutyStatus: 'ड्यूटी पर (ओपीडी सक्रिय)',
    doctorTotalServedToday: 'आज देखे गए कुल मरीज',
    doctorPendingInQueue: 'प्रतीक्षालय में शेष',

    // Admin Dashboard
    adminPortalTitle: 'क्लीनिक संचालन नियंत्रण कक्ष',
    adminPortalSubtitle: 'अखिल भारतीय क्लीनिक नेटवर्क एवं अस्पताल विश्लेषण',
    adminTotalBookings: 'कुल ओपीडी बुकिंग',
    adminRevenue: 'अनुमानित ओपीडी राजस्व',
    adminPendingTriage: 'सत्यापन शेष',
    adminActiveDoctors: 'ड्यूटी पर चिकित्सक',
    adminOverview: 'संचालन विवरण',
    adminAppointments: 'सभी बुकिंग सूची',
    adminDoctorsRoster: 'चिकित्सक रोस्टर',
    adminClinicsHub: 'क्लीनिक केंद्र',
    adminPatientRecords: 'मरीज निर्देशिका',
    adminAddDoctorBtn: 'नया चिकित्सक जोड़ें',
    adminBackToWeb: 'वेबसाइट पर वापस जाएं',
    adminStatusConfirmed: 'स्वीकृत',
    adminStatusPending: 'प्रतीक्षारत',
    adminStatusCompleted: 'पूर्ण',
    adminStatusCancelled: 'रद्द',
    adminActionApprove: 'स्वीकार करें',
    adminActionComplete: 'पूर्ण करें',
    adminActionCancel: 'रद्द करें',

    // Testimonials
    testimonialsTag: 'मरीजों के अनुभव',
    testimonialsTitle: 'भारत भर के परिवारों का अटूट विश्वास',
    testimonialsSubtitle: 'उन मरीजों के वास्तविक अनुभव जिन्होंने कतार मुक्त ओपीडी, पारदर्शी भारतीय रुपये (₹) शुल्क और शीर्ष विशेषज्ञों का लाभ उठाया।',

    // Appointment CTA
    ctaTag: 'त्वरित ओपीडी सेवा',
    ctaTitleLine1: 'अपने स्वास्थ्य को दें प्राथमिकता',
    ctaTitleLine2: 'सिर्फ 2 मिनट में परामर्श बुक करें।',
    ctaSubtitle: 'त्वरित पुष्टि, लाइव ओपीडी टोकन और यात्रा से 2 घंटे पहले तक निःशुल्क रद्दीकरण सुविधा।',
    ctaBookNow: 'अभी अपॉइंटमेंट बुक करें',
    ctaCallDesk: 'हेल्पलाइन पर कॉल करें: 1800-227-3796',

    // Footer
    footerMission: 'केयरसिंक भारत एक अगली पीढ़ी का स्वास्थ्य प्रौद्योगिकी मंच है जो ओपीडी कतारों को सुगम बनाने, नजदीकी क्लीनिक खोजने और आभा से जुड़े स्वास्थ्य प्रबंधन को सरल बनाता है।',
    footerCompliance: 'एनएबीएच (NABH) दिशानिर्देश एवं डिजिटल व्यक्तिगत डेटा संरक्षण (DPDP) अधिनियम के अनुरूप।',
    footerQuickLinks: 'त्वरित लिंक',
    footerDepartments: 'चिकित्सा विभाग',
    footerContactHours: 'संपर्क एवं सहायता',
    footerHeadOffice: 'मुख्यालय: 84 एमजी रोड, इंदिरानगर, बेंगलुरु, कर्नाटक 560038',
    footerHelpline: 'राष्ट्रीय हेल्पलाइन: 1800-227-3796 (टोल फ्री)',
    footerEmail: 'care@caresync.in',
    footerHours: 'ओपीडी समय: सोमवार - शनिवार: सुबह 8:00 से रात 9:00 बजे तक',
    footerEmergency: '24/7 आपातकालीन ट्रॉमा डेस्क: 112 / 108 डायल करें',
    footerRights: 'केयरसिंक हेल्थकेयर सिस्टम्स प्रा. लि. सर्वाधिकार सुरक्षित।',
    footerDemoDisclaimer: 'अस्वीकरण: यह वेब एप्लिकेशन एक प्रौद्योगिकी प्रदर्शन मंच है। डॉक्टर सूची, क्लीनिक स्थान और टोकन कतार मूल्यांकन उद्देश्य के लिए सांकेतिक नमूना डेटा दर्शाते हैं।',

    // General Actions & Feedback
    themeToggleLight: 'लाइट मोड',
    themeToggleDark: 'डार्क मोड',
    langToggle: 'English',
    loading: 'लोड हो रहा है...',
    success: 'सफलता',
    close: 'बंद करें',
  }
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('caresync_lang') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('caresync_lang', lang);
  }, [lang]);

  const toggleLanguage = () => {
    setLang(prev => (prev === 'en' ? 'hi' : 'en'));
  };

  const t = (key) => {
    return TRANSLATIONS[lang]?.[key] || TRANSLATIONS.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t, isHindi: lang === 'hi' }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

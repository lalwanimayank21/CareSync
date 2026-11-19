const doctorRecords = [
  ['Dr. Rajeshwari Sharma', 'Cardiology', 'Jaipur', 12, 700],
  ['Dr. Vikram Malhotra', 'Neurology', 'New Delhi', 15, 900],
  ['Dr. Ananya Sen', 'Pediatrics', 'Mumbai', 9, 600],
  ['Dr. Arjun Mehra', 'Orthopedics', 'Bengaluru', 14, 800],
  ['Dr. Priya Sundaram', 'Dermatology', 'Hyderabad', 8, 650],
  ['Dr. Kabir Joshi', 'General Medicine', 'Kota', 11, 500],
  ['Dr. Meera Kapoor', 'ENT', 'Pune', 10, 600],
  ['Dr. Rohan Desai', 'Ophthalmology', 'Ahmedabad', 13, 700],
  ['Dr. Nisha Verma', 'Gynecology', 'Lucknow', 16, 800],
  ['Dr. Aditya Rao', 'Dentistry', 'Chennai', 7, 400],
  ['Dr. Simran Kaur', 'Psychiatry', 'Chandigarh', 12, 750],
  ['Dr. Karan Shah', 'Gastroenterology', 'Mumbai', 18, 1000],
  ['Dr. Pooja Iyer', 'Nephrology', 'Bengaluru', 10, 850],
  ['Dr. Manish Gupta', 'Pulmonology', 'Indore', 14, 750],
  ['Dr. Aditi Mishra', 'Endocrinology', 'Kolkata', 9, 800],
  ['Dr. Rahul Sinha', 'Cardiology', 'Jaipur', 17, 950],
  ['Dr. Sneha Patel', 'Neurology', 'Udaipur', 8, 700],
  ['Dr. Devendra Singh', 'Orthopedics', 'Jodhpur', 20, 900],
  ['Dr. Kavita Nair', 'Pediatrics', 'Pune', 11, 650],
  ['Dr. Aman Bansal', 'General Medicine', 'New Delhi', 6, 400],
  ['Dr. Isha Choudhary', 'Dermatology', 'Kota', 7, 500],
  ['Dr. Varun Reddy', 'ENT', 'Hyderabad', 13, 650],
  ['Dr. Neha Agarwal', 'Gynecology', 'Ahmedabad', 15, 850],
  ['Dr. Siddharth Jain', 'Dentistry', 'Jaipur', 9, 450],
  ['Dr. Ritu Sharma', 'Ophthalmology', 'Chandigarh', 12, 700]
];

const specialtyHindi = {
  'Cardiology': 'हृदय रोग',
  'Neurology': 'मस्तिष्क एवं तंत्रिका रोग',
  'Pediatrics': 'बाल रोग',
  'Orthopedics': 'हड्डी एवं जोड़ रोग',
  'Dermatology': 'त्वचा रोग',
  'General Medicine': 'सामान्य चिकित्सा',
  'ENT': 'कान, नाक एवं गला',
  'Ophthalmology': 'नेत्र रोग',
  'Gynecology': 'स्त्री रोग',
  'Dentistry': 'दंत चिकित्सा',
  'Psychiatry': 'मानसिक स्वास्थ्य',
  'Gastroenterology': 'पाचन तंत्र रोग',
  'Nephrology': 'गुर्दा रोग',
  'Pulmonology': 'फेफड़ों के रोग',
  'Endocrinology': 'हार्मोन एवं ग्रंथि रोग'
};

export const SPECIALTIES = [
  'All Specialties',
  ...Object.keys(specialtyHindi)
];

export const SPECIALTIES_HI = {
  'All Specialties': 'सभी विशेषज्ञताएं',
  ...specialtyHindi
};

export const DOCTORS = doctorRecords.map((record, index) => {
  const [name, specialty, city, experience, fee] = record;
  const id = `doc-${index + 1}`;

  return {
    id,
    name,
    nameHi: name,
    title: `Consultant ${specialty}`,
    titleHi: `${specialtyHindi[specialty]} विशेषज्ञ`,
    specialty,
    specialtyHi: specialtyHindi[specialty],
    experience,
    experienceHi: `${experience} वर्ष`,
    rating: Number((4.6 + (index % 4) * 0.1).toFixed(1)),
    reviewCount: 80 + index * 13,
    image: `https://randomuser.me/api/portraits/${index % 2 === 0 ? 'women' : 'men'}/${((index * 7 + 12) % 99) + 1}.jpg`,
    hospitalAffiliation: `CareSync Demo Clinic, ${city}`,
    hospitalAffiliationHi: `${city} में CareSync डेमो क्लिनिक`,
    location: city,
    locationHi: city,
    city,
    fee,
    education: 'Sample profile — credentials to be verified',
    about: `Demo profile for ${specialty} consultation in ${city}. This information is for project demonstration only.`,
    aboutHi: `${city} में ${specialtyHindi[specialty]} परामर्श के लिए डेमो प्रोफाइल।`,
    availableToday: index % 4 !== 0,
    availableSlots: ['10:00 AM', '11:30 AM', '02:00 PM', '04:30 PM'],
    currentLiveToken: (index % 8) + 1,
    opdRoom: `Room ${101 + index}`,
    badges: ['Demo Profile']
  };
});
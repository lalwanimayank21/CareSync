import React from 'react';
import {
  Star,
  MapPin,
  Calendar,
  Clock,
  Award,
  ArrowUpRight,
  Building2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function DoctorCard({
  doctor,
  onBook,
  onViewProfile
}) {
  const { t, isHindi } = useLanguage();

  const femaleNames = [
    'Rajeshwari',
    'Ananya',
    'Priya',
    'Meera',
    'Nisha',
    'Simran',
    'Pooja',
    'Aditi',
    'Sneha',
    'Kavita',
    'Isha',
    'Neha',
    'Ritu'
  ];

  const firstName = doctor.name
    .replace('Dr. ', '')
    .split(' ')[0];

  const isFemale = femaleNames.includes(firstName);
  const doctorEmoji = isFemale ? '👩‍⚕️' : '👨‍⚕️';

  const availableSlots = doctor.availableSlots || [];

  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Doctor Avatar Section */}
      <div className="relative flex h-52 items-center justify-center bg-gradient-to-br from-blue-50 via-sky-100 to-indigo-50">

        <div className="flex h-36 w-36 items-center justify-center rounded-full border-4 border-white bg-white/80 shadow-md">
          <span className="text-7xl" role="img" aria-label="Doctor">
            {doctorEmoji}
          </span>
        </div>

        {/* Availability */}
        <div className="absolute left-4 top-4">
          <span
            className={`rounded-full px-3 py-1.5 text-xs font-semibold ${doctor.availableToday
              ? 'bg-green-100 text-green-700'
              : 'bg-gray-100 text-gray-600'
              }`}
          >
            {doctor.availableToday
              ? (isHindi ? 'आज उपलब्ध' : 'Available Today')
              : (isHindi ? 'आज उपलब्ध नहीं' : 'Not Available Today')}
          </span>
        </div>

        {/* Consultation Fee */}
        <div className="absolute bottom-4 right-4 rounded-xl bg-white px-3 py-2 shadow-md">
          <p className="text-xs text-gray-500">
            {isHindi ? 'परामर्श शुल्क' : 'Consultation Fee'}
          </p>
          <p className="text-lg font-bold text-blue-700">
            ₹{doctor.fee}
          </p>
        </div>
      </div>

      {/* Doctor Details */}
      <div className="p-5">

        <div className="mb-3 flex items-center justify-between gap-2">
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            {isHindi
              ? doctor.specialtyHi || doctor.specialty
              : doctor.specialty}
          </span>

          <div className="flex items-center gap-1 text-sm">
            <Star size={15} className="fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-gray-800">
              {doctor.rating}
            </span>
            <span className="text-xs text-gray-400">
              ({doctor.reviewCount || 0})
            </span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-900">
          {isHindi ? doctor.nameHi || doctor.name : doctor.name}
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          {isHindi ? doctor.titleHi || doctor.title : doctor.title}
        </p>

        {/* Hospital */}
        <div className="mt-4 flex items-start gap-2 text-sm text-gray-600">
          <Building2 size={16} className="mt-0.5 shrink-0 text-blue-500" />
          <span>
            {isHindi
              ? doctor.hospitalAffiliationHi || doctor.hospitalAffiliation
              : doctor.hospitalAffiliation}
          </span>
        </div>

        {/* Experience */}
        <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
          <Award size={16} className="text-blue-500" />
          <span>
            {isHindi
              ? doctor.experienceHi || doctor.experience
              : doctor.experience}
          </span>
        </div>

        {/* Location */}
        <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
          <MapPin size={16} className="text-blue-500" />
          <span>
            {isHindi ? doctor.locationHi || doctor.location : doctor.location}
          </span>
        </div>

        {/* Education */}
        {doctor.education && (
          <p className="mt-3 text-xs text-gray-400">
            {doctor.education.split(',')[0]}
          </p>
        )}

        {/* Available Slots */}
        <div className="mt-4 border-t border-gray-100 pt-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
            <Clock size={15} className="text-blue-500" />
            {isHindi ? 'उपलब्ध समय' : 'Available Slots'}
          </div>

          <div className="flex flex-wrap gap-2">
            {availableSlots.slice(0, 3).map((slot, index) => (
              <span
                key={index}
                className="rounded-lg bg-gray-50 px-3 py-1.5 text-xs text-gray-600"
              >
                {slot}
              </span>
            ))}

            {availableSlots.length === 0 && (
              <span className="text-xs text-gray-400">
                {isHindi ? 'कोई समय उपलब्ध नहीं' : 'No slots listed'}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 flex gap-3">

          <button
            onClick={() => onViewProfile && onViewProfile(doctor)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-blue-200 px-3 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
          >
            {isHindi ? 'प्रोफाइल देखें' : 'View Profile'}
            <ArrowUpRight size={16} />
          </button>

          <button
            onClick={() =>
              onBook &&
              onBook(doctor, availableSlots[0] || null)
            }
            disabled={!doctor.availableToday}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-3 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            <Calendar size={16} />
            {isHindi ? 'बुक करें' : 'Book Visit'}
          </button>

        </div>
      </div>
    </div>
  );
}
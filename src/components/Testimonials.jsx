import React from 'react';
import { Star, Quote, ShieldCheck, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const REVIEWS_EN = [
  {
    id: 1,
    name: 'Pooja Venkatesh',
    city: 'Indiranagar, Bengaluru',
    role: 'Pediatric Care Parent',
    rating: 5,
    quote: 'Booking Dr. Ananya Sen took under 60 seconds. The pediatric wing at CareSync is gentle, and the live token queue on my phone saved us from sitting in a crowded waiting lobby.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    date: '3 days ago'
  },
  {
    id: 2,
    name: 'Sunil Krishnamurthy',
    city: 'Connaught Place, New Delhi',
    role: 'Cardiology Patient',
    rating: 5,
    quote: 'Dr. Rajeshwari Sharma caught an irregular cardiac rhythm during an OPD checkup. The instant ABHA sync and digital ECG review gave me and my family enormous confidence.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    date: '1 week ago'
  },
  {
    id: 3,
    name: 'Meera Deshmukh',
    city: 'Bandra West, Mumbai',
    role: 'Tele-OPD Consultation',
    rating: 5,
    quote: 'The video consultation was crystal clear. My e-prescription with ₹800 consultation fee receipt was delivered on WhatsApp within minutes. Truly world-class Indian healthcare SaaS.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    date: '2 weeks ago'
  }
];

const REVIEWS_HI = [
  {
    id: 1,
    name: 'पूजा वेंकटेश',
    city: 'इंदिरानगर, बेंगलुरु',
    role: 'शिशु स्वास्थ्य अभिभावक',
    rating: 5,
    quote: 'डॉ. अनन्या सेन के लिए अपॉइंटमेंट 1 मिनट से भी कम समय में बुक हो गया। लाइव ओपीडी टोकन ट्रैकर की मदद से हमें भीड़भाड़ वाले प्रतीक्षालय में नहीं बैठना पड़ा।',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    date: '3 दिन पहले'
  },
  {
    id: 2,
    name: 'सुनील कृष्णमूर्ति',
    city: 'कनॉट प्लेस, नई दिल्ली',
    role: 'हृदय रोग मरीज',
    rating: 5,
    quote: 'डॉ. राजेश्वरी शर्मा ने ओपीडी परीक्षण के दौरान तुरंत अतालता (Arrhythmia) की पहचान की। आभा (ABHA) से जुड़े डिजिटल रिकॉर्ड्स ने मेरा अनुभव अत्यंत सरल बना दिया।',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    date: '1 सप्ताह पहले'
  },
  {
    id: 3,
    name: 'मीरा देशमुख',
    city: 'बांद्रा वेस्ट, मुंबई',
    role: 'टेली-ओपीडी परामर्श',
    rating: 5,
    quote: 'वीडियो परामर्श बिल्कुल स्पष्ट था। ₹800 की डिजिटल रसीद और ई-प्रिस्क्रिप्शन कुछ ही मिनटों में सीधे फोन पर मिल गई। बेहद उत्कृष्ट स्वास्थ्य सेवा मंच।',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    date: '2 सप्ताह पहले'
  }
];

export default function Testimonials() {
  const { t, isHindi } = useLanguage();
  const reviews = isHindi ? REVIEWS_HI : REVIEWS_EN;

  return (
    <section id="about" className="py-20 bg-slate-50/70 dark:bg-darkbg-primary relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-800 dark:text-teal-300 text-xs font-bold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 fill-teal-600 text-teal-600" />
            <span>{t('testimonialsTag')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t('testimonialsTitle')}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {t('testimonialsSubtitle')}
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white dark:bg-darkbg-card rounded-3xl p-7 border border-slate-200/90 dark:border-slate-800 shadow-2xs hover:shadow-md transition-shadow relative flex flex-col justify-between"
            >
              <div>
                {/* Rating & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-teal-100 dark:text-teal-900/40" />
                </div>

                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic mb-6">
                  "{review.quote}"
                </p>
              </div>

              {/* Patient Info */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-teal-500/20"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{review.name}</h4>
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                  </div>
                  <p className="text-xs text-slate-400">{review.role} • {review.city}</p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

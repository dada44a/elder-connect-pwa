
import { useState, createContext, useContext } from 'react';

type Language = 'en' | 'hi' | 'ne';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // App
    appTitle: 'Senior Care Hub',
    appSubtitle: 'Your health and community companion',
    seniorMode: 'Senior',
    guardianMode: 'Guardian',
    
    // Navigation
    nearbyEvents: 'Nearby Events',
    medicineReminders: 'Medicine Reminders',
    guardianPanel: 'Guardian Panel',
    
    // Events
    morningYoga: 'Morning Yoga Session',
    morningYogaDesc: 'Gentle yoga exercises perfect for seniors. Improve flexibility and balance in a friendly group setting.',
    healthCheckup: 'Free Health Checkup',
    healthCheckupDesc: 'Comprehensive health screening including blood pressure, diabetes, and general wellness check.',
    socialGathering: 'Community Social Hour',
    socialGatheringDesc: 'Meet neighbors, enjoy tea and snacks, and participate in fun group activities.',
    
    // Actions
    enrollNow: 'Enroll Now',
    enrolled: 'Enrolled',
    enrollmentSuccess: 'Successfully Enrolled!',
    enrolledIn: 'You are now enrolled in',
    filterEvents: 'Filter Events',
    away: 'away',
    
    // Categories
    healthWellness: 'Health & Wellness',
    healthcare: 'Healthcare',
    social: 'Social',
    
    // Medicine
    addMedicine: 'Add Medicine',
    addNewMedicine: 'Add New Medicine',
    medicineName: 'Medicine Name',
    dosage: 'Dosage',
    frequency: 'Frequency',
    time: 'Time',
    taken: 'Taken',
    skip: 'Skip',
    cancel: 'Cancel',
    
    // Guardian
    guardianDashboard: 'Guardian Dashboard',
    monitorLovedOnes: 'Monitor and care for your loved ones',
    connectedSeniors: 'Connected Seniors',
    recentEnrollments: 'Recent Event Enrollments',
    medicineAlerts: 'Medicine Alerts',
    quickActions: 'Quick Actions',
    
    // Stats
    upcomingEvents: 'Upcoming Events',
    medicinesScheduled: 'Medicines Scheduled',
    connectedGuardians: 'Connected Guardians',
    
    // Common
    error: 'Error',
    success: 'Success',
    loading: 'Loading...',
    active: 'Active',
    pending: 'Pending',
    lastSeen: 'Last seen',
    scheduledFor: 'Scheduled for',
    enrolledOn: 'Enrolled on',
    upcoming: 'Upcoming',
    
    // Frequencies
    onceDaily: 'Once Daily',
    twiceDaily: 'Twice Daily',
    threeTimes: 'Three Times Daily',
    weekly: 'Weekly',
    
    // Messages
    fillAllFields: 'Please fill all fields',
    medicineAdded: 'Medicine Added',
    addedSuccessfully: 'added successfully',
    medicineTaken: 'Medicine Taken',
    markedAsTaken: 'Medicine marked as taken',
    medicineSkipped: 'Medicine Skipped',
    reminderSkipped: 'Reminder has been skipped',
    stayHealthy: 'Stay healthy with timely reminders',
    enterMedicineName: 'Enter medicine name',
    enterDosage: 'Enter dosage (e.g., 500mg)',
    selectFrequency: 'Select frequency',
    notificationsOn: 'Notifications On',
    notificationsOff: 'Notifications Off',
    viewAllActivities: 'View All Activities',
    setCustomAlerts: 'Set Custom Alerts',
  },
  
  hi: {
    // App
    appTitle: 'वरिष्ठ देखभाल केंद्र',
    appSubtitle: 'आपका स्वास्थ्य और समुदाय साथी',
    seniorMode: 'वरिष्ठ',
    guardianMode: 'संरक्षक',
    
    // Navigation
    nearbyEvents: 'पास की गतिविधियाँ',
    medicineReminders: 'दवा अनुस्मारक',
    guardianPanel: 'संरक्षक पैनल',
    
    // Events
    morningYoga: 'सुबह का योग सत्र',
    morningYogaDesc: 'वरिष्ठ नागरिकों के लिए आदर्श कोमल योग अभ्यास। मित्रवत समूह सेटिंग में लचीलेपन और संतुलन में सुधार करें।',
    healthCheckup: 'निःशुल्क स्वास्थ्य जाँच',
    healthCheckupDesc: 'रक्तचाप, मधुमेह, और सामान्य कल्याण जाँच सहित व्यापक स्वास्थ्य जाँच।',
    socialGathering: 'सामुदायिक मिलन समय',
    socialGatheringDesc: 'पड़ोसियों से मिलें, चाय और नाश्ता का आनंद लें, और मजेदार समूहिक गतिविधियों में भाग लें।',
    
    // Actions
    enrollNow: 'अभी दाखिला लें',
    enrolled: 'दाखिला हो गया',
    enrollmentSuccess: 'सफलतापूर्वक दाखिला हो गया!',
    enrolledIn: 'आपका दाखिला हो गया है',
    filterEvents: 'गतिविधियाँ फ़िल्टर करें',
    away: 'दूर',
    
    // Categories
    healthWellness: 'स्वास्थ्य एवं कल्याण',
    healthcare: 'स्वास्थ्य सेवा',
    social: 'सामाजिक',
    
    // Medicine
    addMedicine: 'दवा जोड़ें',
    addNewMedicine: 'नई दवा जोड़ें',
    medicineName: 'दवा का नाम',
    dosage: 'खुराक',
    frequency: 'आवृत्ति',
    time: 'समय',
    taken: 'लिया गया',
    skip: 'छोड़ें',
    cancel: 'रद्द करें',
    
    // Guardian
    guardianDashboard: 'संरक्षक डैशबोर्ड',
    monitorLovedOnes: 'अपने प्रियजनों की निगरानी और देखभाल करें',
    connectedSeniors: 'जुड़े हुए वरिष्ठ',
    recentEnrollments: 'हाल की गतिविधि दाखिले',
    medicineAlerts: 'दवा अलर्ट',
    quickActions: 'त्वरित कार्य',
    
    // Stats
    upcomingEvents: 'आगामी गतिविधियाँ',
    medicinesScheduled: 'दवाएँ निर्धारित',
    connectedGuardians: 'जुड़े संरक्षक',
    
    // Common
    error: 'त्रुटि',
    success: 'सफलता',
    loading: 'लोड हो रहा है...',
    active: 'सक्रिय',
    pending: 'लंबित',
    lastSeen: 'अंतिम बार देखा गया',
    scheduledFor: 'के लिए निर्धारित',
    enrolledOn: 'दाखिला लिया गया',
    upcoming: 'आगामी',
    
    // Frequencies
    onceDaily: 'दिन में एक बार',
    twiceDaily: 'दिन में दो बार',
    threeTimes: 'दिन में तीन बार',
    weekly: 'साप्ताहिक',
    
    // Messages
    fillAllFields: 'कृपया सभी फ़ील्ड भरें',
    medicineAdded: 'दवा जोड़ी गई',
    addedSuccessfully: 'सफलतापूर्वक जोड़ा गया',
    medicineTaken: 'दवा ली गई',
    markedAsTaken: 'दवा ली गई के रूप में चिह्नित',
    medicineSkipped: 'दवा छोड़ी गई',
    reminderSkipped: 'अनुस्मारक छोड़ दिया गया है',
    stayHealthy: 'समय पर अनुस्मारक के साथ स्वस्थ रहें',
    enterMedicineName: 'दवा का नाम दर्ज करें',
    enterDosage: 'खुराक दर्ज करें (जैसे, 500mg)',
    selectFrequency: 'आवृत्ति चुनें',
    notificationsOn: 'सूचनाएं चालू',
    notificationsOff: 'सूचनाएं बंद',
    viewAllActivities: 'सभी गतिविधियां देखें',
    setCustomAlerts: 'कस्टम अलर्ट सेट करें',
  },
  
  ne: {
    // App
    appTitle: 'ज्येष्ठ देखभाल केन्द्र',
    appSubtitle: 'तपाईंको स्वास्थ्य र समुदायको साथी',
    seniorMode: 'ज्येष्ठ',
    guardianMode: 'संरक्षक',
    
    // Navigation
    nearbyEvents: 'नजिकका गतिविधिहरू',
    medicineReminders: 'औषधि सम्झना',
    guardianPanel: 'संरक्षक प्यानल',
    
    // Events
    morningYoga: 'बिहानको योग सत्र',
    morningYogaDesc: 'ज्येष्ठ नागरिकहरूका लागि उत्तम नरम योग अभ्यास। मित्रवत समूह सेटिंगमा लचकता र सन्तुलन सुधार गर्नुहोस्।',
    healthCheckup: 'नि:शुल्क स्वास्थ्य जाँच',
    healthCheckupDesc: 'रक्तचाप, मधुमेह, र सामान्य कल्याण जाँच सहित व्यापक स्वास्थ्य जाँच।',
    socialGathering: 'सामुदायिक मेल मिलाप',
    socialGatheringDesc: 'छिमेकीहरूसँग भेट्नुहोस्, चिया र खाजाको आनन्द लिनुहोस्, र रमाइलो समूह गतिविधिहरूमा भाग लिनुहोस्।',
    
    // Actions
    enrollNow: 'अहिले दर्ता गर्नुहोस्',
    enrolled: 'दर्ता भयो',
    enrollmentSuccess: 'सफलतापूर्वक दर्ता भयो!',
    enrolledIn: 'तपाईं दर्ता हुनुभयो',
    filterEvents: 'गतिविधि फिल्टर गर्नुहोस्',
    away: 'टाढा',
    
    // Categories
    healthWellness: 'स्वास्थ्य र कल्याण',
    healthcare: 'स्वास्थ्य सेवा',
    social: 'सामाजिक',
    
    // Medicine
    addMedicine: 'औषधि थप्नुहोस्',
    addNewMedicine: 'नयाँ औषधि थप्नुहोस्',
    medicineName: 'औषधिको नाम',
    dosage: 'मात्रा',
    frequency: 'आवृत्ति',
    time: 'समय',
    taken: 'लिइयो',
    skip: 'छोड्नुहोस्',
    cancel: 'रद्द गर्नुहोस्',
    
    // Guardian
    guardianDashboard: 'संरक्षक ड्यासबोर्ड',
    monitorLovedOnes: 'आफ्ना प्रियजनहरूको निगरानी र देखभाल गर्नुहोस्',
    connectedSeniors: 'जोडिएका ज्येष्ठहरू',
    recentEnrollments: 'हालका गतिविधि दर्ताहरू',
    medicineAlerts: 'औषधि अलार्ट',
    quickActions: 'द्रुत कार्यहरू',
    
    // Stats
    upcomingEvents: 'आगामी गतिविधिहरू',
    medicinesScheduled: 'औषधि निर्धारित',
    connectedGuardians: 'जोडिएका संरक्षकहरू',
    
    // Common
    error: 'त्रुटि',
    success: 'सफलता',
    loading: 'लोड हुँदै...',
    active: 'सक्रिय',
    pending: 'पेन्डिङ',
    lastSeen: 'अन्तिम पटक देखियो',
    scheduledFor: 'को लागि निर्धारित',
    enrolledOn: 'दर्ता गरियो',
    upcoming: 'आगामी',
    
    // Frequencies
    onceDaily: 'दिनमा एक पटक',
    twiceDaily: 'दिनमा दुई पटक',
    threeTimes: 'दिनमा तीन पटक',
    weekly: 'साप्ताहिक',
    
    // Messages
    fillAllFields: 'कृपया सबै फिल्डहरू भर्नुहोस्',
    medicineAdded: 'औषधि थपियो',
    addedSuccessfully: 'सफलतापूर्वक थपियो',
    medicineTaken: 'औषधि लिईयो',
    markedAsTaken: 'औषधि लिईयो भनेर चिन्ह लगाईयो',
    medicineSkipped: 'औषधि छोडियो',
    reminderSkipped: 'सम्झना छोडियो',
    stayHealthy: 'समयमै सम्झनाको साथ स्वस्थ रहनुहोस्',
    enterMedicineName: 'औषधिको नाम प्रविष्ट गर्नुहोस्',
    enterDosage: 'मात्रा प्रविष्ट गर्नुहोस् (जस्तै, ५००mg)',
    selectFrequency: 'आवृत्ति छान्नुहोस्',
    notificationsOn: 'सूचना खुला',
    notificationsOff: 'सूचना बन्द',
    viewAllActivities: 'सबै गतिविधिहरू हेर्नुहोस्',
    setCustomAlerts: 'कस्टम अलार्ट सेट गर्नुहोस्',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return { language, setLanguage, t };
};


import { useRouter } from 'next/router';
import { useMemo } from 'react';

type TranslationKey =
  | 'appTitle'
  | 'appSubtitle'
  | 'nearbyEvents'
  | 'myEnrollments'
  | 'medicineReminders'
  | 'chatWithGuardian'
  | 'profile'
  | 'guardianPanel'
  | 'seniorMode'
  | 'guardianMode'
  | 'upcomingEvents'
  | 'medicinesScheduled'
  | 'connectedGuardians'
  | 'fullName'
  | 'relation'
  | 'phoneNumber'
  | 'email'
  | 'optional'
  | 'enterName'
  | 'enterRelation'
  | 'enterPhone'
  | 'enterEmail'
  | 'sendInvitation'
  | 'cancel'
  | 'guardianConnections'
  | 'manageGuardians'
  | 'addGuardian'
  | 'addNewGuardian'
  | 'guardianAdded'
  | 'invitationSent'
  | 'guardianRemoved'
  | 'connectionRemoved'
  | 'active'
  | 'pending'
  | 'inactive'
  | 'refresh'
  | 'stayConnected'
  | 'messages'
  | 'typeYourMessage'
  | 'chatWith'
  | 'error'
  | 'fillAllFields'
  | 'medicineAdded'
  | 'addedSuccessfully'
  | 'medicineTaken'
  | 'markedAsTaken'
  | 'medicineSkipped'
  | 'reminderSkipped'
  | 'stayHealthy'
  | 'addMedicine'
  | 'addNewMedicine'
  | 'medicineName'
  | 'enterMedicineName'
  | 'dosage'
  | 'enterDosage'
  | 'frequency'
  | 'selectFrequency'
  | 'onceDaily'
  | 'twiceDaily'
  | 'threeTimes'
  | 'weekly'
  | 'time'
  | 'taken'
  | 'skip'
  | 'morningYoga'
  | 'morningYogaDesc'
  | 'healthCheckup'
  | 'healthCheckupDesc'
  | 'socialGathering'
  | 'socialGatheringDesc'
  | 'enrollmentSuccess'
  | 'enrolledIn'
  | 'filterEvents'
  | 'healthWellness'
  | 'healthcare'
  | 'social'
  | 'away'
  | 'enrolled'
  | 'enrollNow'
  | 'guardianDashboard'
  | 'monitorLovedOnes'
  | 'notificationsOn'
  | 'notificationsOff'
  | 'connectedSeniors'
  | 'lastSeen'
  | 'recentEnrollments'
  | 'enrolledOn'
  | 'upcoming'
  | 'medicineAlerts'
  | 'scheduledFor'
  | 'quickActions'
  | 'viewAllActivities'
  | 'setCustomAlerts'
  | 'viewYourEvents'
  | 'confirmed'
  | 'cancelled'
  | 'viewDetails';

interface Translations {
  [key: string]: {
    [key in TranslationKey]: string;
  };
}

const translations: Translations = {
  en: {
    appTitle: 'CareConnect',
    appSubtitle: 'Supporting Seniors, Connecting Families',
    nearbyEvents: 'Nearby Events',
    myEnrollments: 'My Enrollments',
    medicineReminders: 'Medicine Reminders',
    chatWithGuardian: 'Chat with Guardian',
    profile: 'Profile',
    guardianPanel: 'Guardian Panel',
    seniorMode: 'Senior Mode',
    guardianMode: 'Guardian Mode',
    upcomingEvents: 'Upcoming Events',
    medicinesScheduled: 'Medicines Scheduled',
    connectedGuardians: 'Connected Guardians',
    fullName: 'Full Name',
    relation: 'Relation',
    phoneNumber: 'Phone Number',
    email: 'Email',
    optional: 'Optional',
    enterName: 'Enter Name',
    enterRelation: 'Enter Relation',
    enterPhone: 'Enter Phone',
    enterEmail: 'Enter Email',
    sendInvitation: 'Send Invitation',
    cancel: 'Cancel',
    guardianConnections: 'Guardian Connections',
    manageGuardians: 'Manage Guardians',
    addGuardian: 'Add Guardian',
    addNewGuardian: 'Add New Guardian',
    guardianAdded: 'Guardian Added',
    invitationSent: 'Invitation Sent',
    guardianRemoved: 'Guardian Removed',
    connectionRemoved: 'Connection Removed',
    active: 'Active',
    pending: 'Pending',
    inactive: 'Inactive',
    refresh: 'Refresh',
    stayConnected: 'Stay connected with your family',
    messages: 'Messages',
    typeYourMessage: 'Type your message here...',
    chatWith: 'Chat with',
    error: 'Error',
    fillAllFields: 'Please fill all required fields',
    medicineAdded: 'Medicine Added',
    addedSuccessfully: 'added successfully',
    medicineTaken: 'Medicine Taken',
    markedAsTaken: 'Marked as taken successfully',
    medicineSkipped: 'Medicine Skipped',
    reminderSkipped: 'Reminder skipped',
    stayHealthy: 'Stay healthy with your medicine schedule',
    addMedicine: 'Add Medicine',
    addNewMedicine: 'Add New Medicine',
    medicineName: 'Medicine Name',
    enterMedicineName: 'Enter medicine name',
    dosage: 'Dosage',
    enterDosage: 'Enter dosage (e.g., 5mg, 1 tablet)',
    frequency: 'Frequency',
    selectFrequency: 'Select frequency',
    onceDaily: 'Once Daily',
    twiceDaily: 'Twice Daily',
    threeTimes: 'Three Times Daily',
    weekly: 'Weekly',
    time: 'Time',
    taken: 'Taken',
    skip: 'Skip',
    morningYoga: 'Morning Yoga Session',
    morningYogaDesc: 'Join our gentle morning yoga session designed for seniors. Improve flexibility and start your day with energy.',
    healthCheckup: 'Health Checkup Camp',
    healthCheckupDesc: 'Free health screening including blood pressure, diabetes check, and consultation with healthcare professionals.',
    socialGathering: 'Community Social Gathering',
    socialGatheringDesc: 'Meet and connect with fellow community members. Enjoy refreshments, games, and meaningful conversations.',
    enrollmentSuccess: 'Enrollment Successful',
    enrolledIn: 'Successfully enrolled in',
    filterEvents: 'Filter Events',
    healthWellness: 'Health & Wellness',
    healthcare: 'Healthcare',
    social: 'Social',
    away: 'away',
    enrolled: 'Enrolled',
    enrollNow: 'Enroll Now',
    guardianDashboard: 'Guardian Dashboard',
    monitorLovedOnes: 'Monitor and support your loved ones',
    notificationsOn: 'Notifications On',
    notificationsOff: 'Notifications Off',
    connectedSeniors: 'Connected Seniors',
    lastSeen: 'Last seen',
    recentEnrollments: 'Recent Event Enrollments',
    enrolledOn: 'Enrolled on',
    upcoming: 'Upcoming',
    medicineAlerts: 'Medicine Alerts',
    scheduledFor: 'Scheduled for',
    quickActions: 'Quick Actions',
    viewAllActivities: 'View All Activities',
    setCustomAlerts: 'Set Custom Alerts',
    viewYourEvents: 'View your enrolled events and schedules',
    confirmed: 'Confirmed',
    cancelled: 'Cancelled',
    viewDetails: 'View Details',
  },
  hi: {
    appTitle: 'केयरकनेक्ट',
    appSubtitle: 'वरिष्ठ नागरिकों का समर्थन, परिवारों को जोड़ना',
    nearbyEvents: 'आस-पास की घटनाएँ',
    myEnrollments: 'मेरे नामांकन',
    medicineReminders: 'दवाई अनुस्मारक',
    chatWithGuardian: 'अभिभावक के साथ चैट',
    profile: 'प्रोफ़ाइल',
    guardianPanel: 'अभिभावक पैनल',
    seniorMode: 'वरिष्ठ मोड',
    guardianMode: 'अभिभावक मोड',
    upcomingEvents: 'आगामी घटनाएँ',
    medicinesScheduled: 'निर्धारित दवाएं',
    connectedGuardians: 'जुड़े हुए अभिभावक',
    fullName: 'पूरा नाम',
    relation: 'रिश्ता',
    phoneNumber: 'फ़ोन नंबर',
    email: 'ईमेल',
    optional: 'वैकल्पिक',
    enterName: 'नाम दर्ज करें',
    enterRelation: 'रिश्ता दर्ज करें',
    enterPhone: 'फ़ोन दर्ज करें',
    enterEmail: 'ईमेल दर्ज करें',
    sendInvitation: 'निमंत्रण भेजें',
    cancel: 'रद्द करें',
    guardianConnections: 'अभिभावक संबंध',
    manageGuardians: 'अभिभावकों का प्रबंधन करें',
    addGuardian: 'अभिभावक जोड़ें',
    addNewGuardian: 'नया अभिभावक जोड़ें',
    guardianAdded: 'अभिभावक जोड़ा गया',
    invitationSent: 'निमंत्रण भेजा गया',
    guardianRemoved: 'अभिभावक हटाया गया',
    connectionRemoved: 'कनेक्शन हटाया गया',
    active: 'सक्रिय',
    pending: 'लंबित',
    inactive: 'निष्क्रिय',
    refresh: 'ताज़ा करें',
    stayConnected: 'अपने परिवार से जुड़े रहें',
    messages: 'संदेश',
    typeYourMessage: 'यहाँ अपना संदेश टाइप करें...',
    chatWith: 'चैट करें',
    error: 'त्रुटि',
    fillAllFields: 'कृपया सभी आवश्यक फ़ील्ड भरें',
    medicineAdded: 'दवाई जोड़ी गई',
    addedSuccessfully: 'सफलतापूर्वक जोड़ा गया',
    medicineTaken: 'दवाई ली गई',
    markedAsTaken: 'सफलतापूर्वक लिया गया के रूप में चिह्नित',
    medicineSkipped: 'दवाई छोड़ी गई',
    reminderSkipped: 'अनुस्मारक छोड़ा गया',
    stayHealthy: 'अपनी दवाई के शेड्यूल के साथ स्वस्थ रहें',
    addMedicine: 'दवाई जोड़ें',
    addNewMedicine: 'नई दवाई जोड़ें',
    medicineName: 'दवाई का नाम',
    enterMedicineName: 'दवाई का नाम दर्ज करें',
    dosage: 'खुराक',
    enterDosage: 'खुराक दर्ज करें (जैसे, 5mg, 1 गोली)',
    frequency: 'आवृत्ति',
    selectFrequency: 'आवृत्ति चुनें',
    onceDaily: 'दिन में एक बार',
    twiceDaily: 'दिन में दो बार',
    threeTimes: 'दिन में तीन बार',
    weekly: 'साप्ताहिक',
    time: 'समय',
    taken: 'लिया गया',
    skip: 'छोड़ें',
    morningYoga: 'सुबह योग सत्र',
    morningYogaDesc: 'वरिष्ठ नागरिकों के लिए डिज़ाइन किए गए हमारे कोमल सुबह योग सत्र में शामिल हों। लचीलेपन में सुधार करें और अपना दिन ऊर्जा से शुरू करें।',
    healthCheckup: 'स्वास्थ्य जांच शिविर',
    healthCheckupDesc: 'रक्तचाप, मधुमेह जांच और स्वास्थ्य पेशेवरों के साथ परामर्श सहित मुफ्त स्वास्थ्य जांच।',
    socialGathering: 'समुदायिक सामाजिक मेल जोल',
    socialGatheringDesc: 'साथी समुदाय के सदस्यों से मिलें और जुड़ें। जलपान, खेल और सार्थक बातचीत का आनंद लें।',
    enrollmentSuccess: 'नामांकन सफल',
    enrolledIn: 'सफलतापूर्वक नामांकित',
    filterEvents: 'घटनाएँ फ़िल्टर करें',
    healthWellness: 'स्वास्थ्य और कल्याण',
    healthcare: 'स्वास्थ्य सेवा',
    social: 'सामाजिक',
    away: 'दूर',
    enrolled: 'नामांकित',
    enrollNow: 'अभी नामांकन करें',
    guardianDashboard: 'अभिभावक डैशबोर्ड',
    monitorLovedOnes: 'अपने प्रियजनों की निगरानी और समर्थन करें',
    notificationsOn: 'सूचनाएं चालू',
    notificationsOff: 'सूचनाएं बंद',
    connectedSeniors: 'जुड़े हुए वरिष्ठ',
    lastSeen: 'अंतिम बार देखा गया',
    recentEnrollments: 'हाल की घटना नामांकन',
    enrolledOn: 'नामांकित',
    upcoming: 'आगामी',
    medicineAlerts: 'दवाई अलर्ट',
    scheduledFor: 'के लिए निर्धारित',
    quickActions: 'त्वरित क्रियाएं',
    viewAllActivities: 'सभी गतिविधियां देखें',
    setCustomAlerts: 'कस्टम अलर्ट सेट करें',
    viewYourEvents: 'अपनी नामांकित घटनाओं और कार्यक्रमों को देखें',
    confirmed: 'पुष्ट',
    cancelled: 'रद्द',
    viewDetails: 'विवरण देखें',
  },
  ne: {
    appTitle: 'केयरकनेक्ट',
    appSubtitle: 'वरिष्ठ नागरिकहरूलाई समर्थन, परिवारहरूलाई जोड्दै',
    nearbyEvents: 'नजिकैका घटनाहरू',
    myEnrollments: 'मेरो नामांकनहरू',
    medicineReminders: 'औषधि रिमाइन्डरहरू',
    chatWithGuardian: 'अभिभावकसँग कुराकानी गर्नुहोस्',
    profile: 'प्रोफाइल',
    guardianPanel: 'अभिभावक प्यानल',
    seniorMode: 'वरिष्ठ मोड',
    guardianMode: 'अभिभावक मोड',
    upcomingEvents: 'आगामी घटनाहरू',
    medicinesScheduled: 'अनुसूचित औषधिहरू',
    connectedGuardians: 'सम्बन्धित अभिभावकहरू',
    fullName: 'पुरा नाम',
    relation: 'सम्बन्ध',
    phoneNumber: 'फोन नम्बर',
    email: 'ईमेल',
    optional: 'वैकल्पिक',
    enterName: 'नाम प्रविष्ट गर्नुहोस्',
    enterRelation: 'सम्बन्ध प्रविष्ट गर्नुहोस्',
    enterPhone: 'फोन प्रविष्ट गर्नुहोस्',
    enterEmail: 'ईमेल प्रविष्ट गर्नुहोस्',
    sendInvitation: 'निमन्त्रणा पठाउनुहोस्',
    cancel: 'रद्द गर्नुहोस्',
    guardianConnections: 'अभिभावक जडानहरू',
    manageGuardians: 'अभिभावकहरूलाई व्यवस्थित गर्नुहोस्',
    addGuardian: 'अभिभावक थप्नुहोस्',
    addNewGuardian: 'नयाँ अभिभावक थप्नुहोस्',
    guardianAdded: 'अभिभावक थपियो',
    invitationSent: 'निमन्त्रणा पठाइयो',
    guardianRemoved: 'अभिभावक हटाइयो',
    connectionRemoved: 'जडान हटाइयो',
    active: 'सक्रिय',
    pending: 'लम्बित',
    inactive: 'निष्क्रिय',
    refresh: 'ताज़ा गर्नुहोस्',
    stayConnected: 'आफ्नो परिवारसँग जोडिएर रहनुहोस्',
    messages: 'सन्देशहरू',
    typeYourMessage: 'यहाँ आफ्नो सन्देश टाइप गर्नुहोस्...',
    chatWith: 'च्याट गर्नुहोस्',
    error: 'त्रुटि',
    fillAllFields: 'कृपया सबै आवश्यक फिल्डहरू भर्नुहोस्',
    medicineAdded: 'औषधि थपियो',
    addedSuccessfully: 'सफलतापूर्वक थपियो',
    medicineTaken: 'औषधि लियो',
    markedAsTaken: 'सफलतापूर्वक लिएको रूपमा चिन्ह लगाइयो',
    medicineSkipped: 'औषधि छोडियो',
    reminderSkipped: 'रिमाइन्डर छोडियो',
    stayHealthy: 'आफ्नो औषधि तालिकासँग स्वस्थ रहनुहोस्',
    addMedicine: 'औषधि थप्नुहोस्',
    addNewMedicine: 'नयाँ औषधि थप्नुहोस्',
    medicineName: 'औषधिको नाम',
    enterMedicineName: 'औषधिको नाम प्रविष्ट गर्नुहोस्',
    dosage: 'मात्रा',
    enterDosage: 'मात्रा प्रविष्ट गर्नुहोस् (जस्तै, 5mg, 1 ट्याब्लेट)',
    frequency: 'आवृत्ति',
    selectFrequency: 'आवृत्ति छान्नुहोस्',
    onceDaily: 'दिनमा एक पटक',
    twiceDaily: 'दिनमा दुई पटक',
    threeTimes: 'दिनमा तीन पटक',
    weekly: 'साप्ताहिक',
    time: 'समय',
    taken: 'लियो',
    skip: 'छोड्नुहोस्',
    morningYoga: 'बिहानको योग सत्र',
    morningYogaDesc: 'वरिष्ठ नागरिकहरूका लागि डिजाइन गरिएको हाम्रो कोमल बिहानको योग सत्रमा सामेल हुनुहोस्। लचकता सुधार गर्नुहोस् र आफ्नो दिन ऊर्जाले सुरु गर्नुहोस्।',
    healthCheckup: 'स्वास्थ्य जाँच शिविर',
    healthCheckupDesc: 'रक्तचाप, मधुमेह जाँच र स्वास्थ्य पेशेवरहरूसँग सल्लाह सहित निःशुल्क स्वास्थ्य जाँच।',
    socialGathering: 'समुदायिक सामाजिक भेला',
    socialGatheringDesc: 'साथी समुदायका सदस्यहरूलाई भेट्नुहोस् र जोडिनुहोस्। खाजा, खेलहरू र अर्थपूर्ण कुराकानीको आनन्द लिनुहोस्।',
    enrollmentSuccess: 'नामांकन सफल',
    enrolledIn: 'सफलतापूर्वक नामांकन गरियो',
    filterEvents: 'घटनाहरू फिल्टर गर्नुहोस्',
    healthWellness: 'स्वास्थ्य र कल्याण',
    healthcare: 'स्वास्थ्य सेवा',
    social: 'सामाजिक',
    away: 'टाढा',
    enrolled: 'नामांकित',
    enrollNow: 'अहिले नामांकन गर्नुहोस्',
    guardianDashboard: 'अभिभावक ड्यासबोर्ड',
    monitorLovedOnes: 'आफ्ना प्रियजनहरूको निगरानी र समर्थन गर्नुहोस्',
    notificationsOn: 'सूचनाहरू सक्रिय',
    notificationsOff: 'सूचनाहरू निष्क्रिय',
    connectedSeniors: 'जोडिएका वरिष्ठहरू',
    lastSeen: 'अन्तिम पटक देखियो',
    recentEnrollments: 'हालका घटना नामांकनहरू',
    enrolledOn: 'नामांकन गरियो',
    upcoming: 'आगामी',
    medicineAlerts: 'औषधि अलर्टहरू',
    scheduledFor: 'को लागि तालिकाबद्ध',
    quickActions: 'छिटो कार्यहरू',
    viewAllActivities: 'सबै गतिविधिहरू हेर्नुहोस्',
    setCustomAlerts: 'कस्टम अलर्टहरू सेट गर्नुहोस्',
    viewYourEvents: 'आफ्ना नामांकित घटनाहरू र तालिकाहरू हेर्नुहोस्',
    confirmed: 'पुष्टि भयो',
    cancelled: 'रद्द गरियो',
    viewDetails: 'विवरणहरू हेर्नुहोस्',
  },
};

export const useLanguage = () => {
  const router = useRouter();
  const { locale } = router;

  const t = useMemo(
    () => (key: TranslationKey) => {
      const translatedText = translations[locale as string]?.[key] || translations['en'][key] || key;
      return translatedText;
    },
    [locale]
  );

  return { t, language: locale };
};

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
  | 'chatWith';

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

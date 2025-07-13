import { useState } from 'react';

type Language = 'en' | 'es';

type Translations = {
  [key in Language]: {
    [key: string]: string;
  };
};

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>('en');

  const translations: Translations = {
    en: {
      appTitle: "Senior Care Platform",
      appSubtitle: "Connecting Seniors and Guardians",
      nearbyEvents: "Nearby Events",
      myEnrollments: "My Enrollments",
      medicineReminders: "Medicine Reminders",
      chatWithGuardian: "Chat with Guardian",
      profile: "Profile",
      guardians: "Guardians",
      guardianPanel: "Guardian Panel",
      seniorMode: "Senior Mode",
      guardianMode: "Guardian Mode",
      upcomingEvents: "Upcoming Events",
      medicinesScheduled: "Medicines Scheduled",
      connectedGuardians: "Connected Guardians",
      // Admin Dashboard translations
      adminDashboard: "Admin Dashboard",
      adminDashboardDesc: "Manage users, events, and system settings",
      overview: "Overview",
      userManagement: "User Management",
      eventManagement: "Event Management",
      eventManagementDesc: "Manage events, schedules, and registrations",
      systemAlerts: "System Alerts",
      systemSettings: "System Settings",
      systemSettingsDesc: "Configure system preferences and security settings",
      totalUsers: "Total Users",
      activeSeniors: "Active Seniors",
      pendingAlerts: "Pending Alerts",
      systemHealth: "System Health",
      recentUsers: "Recent Users",
      recentAlerts: "Recent Alerts",
      filter: "Filter",
      export: "Export",
      addUser: "Add User",
      edit: "Edit",
      view: "View",
      search: "Search",
    },
    es: {
      appTitle: "Plataforma de Cuidado para Adultos Mayores",
      appSubtitle: "Conectando Adultos Mayores y Tutores",
      nearbyEvents: "Eventos Cercanos",
      myEnrollments: "Mis Inscripciones",
      medicineReminders: "Recordatorios de Medicamentos",
      chatWithGuardian: "Chatear con Tutor",
      profile: "Perfil",
      guardians: "Tutores",
      guardianPanel: "Panel de Tutor",
      seniorMode: "Modo Adulto Mayor",
      guardianMode: "Modo Tutor",
      upcomingEvents: "Próximos Eventos",
      medicinesScheduled: "Medicamentos Programados",
      connectedGuardians: "Tutores Conectados",
      // Admin Dashboard translations in Spanish
      adminDashboard: "Panel de Administrador",
      adminDashboardDesc: "Gestionar usuarios, eventos y configuración del sistema",
      overview: "Resumen",
      userManagement: "Gestión de Usuarios",
      eventManagement: "Gestión de Eventos", 
      eventManagementDesc: "Gestionar eventos, horarios y registros",
      systemAlerts: "Alertas del Sistema",
      systemSettings: "Configuración del Sistema",
      systemSettingsDesc: "Configurar preferencias del sistema y seguridad",
      totalUsers: "Total de Usuarios",
      activeSeniors: "Adultos Mayores Activos",
      pendingAlerts: "Alertas Pendientes",
      systemHealth: "Salud del Sistema",
      recentUsers: "Usuarios Recientes",
      recentAlerts: "Alertas Recientes",
      filter: "Filtrar",
      export: "Exportar",
      addUser: "Agregar Usuario",
      edit: "Editar",
      view: "Ver",
      search: "Buscar",
    }
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return {
    language,
    setLanguage,
    t,
  };
};

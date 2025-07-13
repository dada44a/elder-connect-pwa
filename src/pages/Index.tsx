import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Users, Settings, Heart, Shield, MessageCircle, User, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EventDiscovery } from '@/components/EventDiscovery';
import { MedicineReminders } from '@/components/MedicineReminders';
import { GuardianPanel } from '@/components/GuardianPanel';
import { MyEnrollments } from '@/components/MyEnrollments';
import { ChatWithGuardian } from '@/components/ChatWithGuardian';
import { UserProfile } from '@/components/UserProfile';
import { GuardianConnections } from '@/components/GuardianConnections';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useLanguage } from '@/hooks/useLanguage';
import { AdminDashboard } from '@/components/AdminDashboard';

type UserType = 'senior' | 'guardian';

const Index = () => {
  const [activeTab, setActiveTab] = useState('events');
  const [userType, setUserType] = useState<UserType>('senior');
  const { t, language } = useLanguage();

  const tabs = [
    { id: 'events', label: t('nearbyEvents'), icon: MapPin },
    { id: 'enrollments', label: t('myEnrollments'), icon: Calendar },
    { id: 'medicine', label: t('medicineReminders'), icon: Heart },
    { id: 'chat', label: t('chatWithGuardian'), icon: MessageCircle },
    { id: 'profile', label: t('profile'), icon: User },
    { id: 'guardians', label: t('guardians'), icon: UserCheck },
    { id: 'guardian', label: t('guardianPanel'), icon: Shield },
    { id: 'admin', label: t('adminDashboard'), icon: Settings },
  ];

  const handleUserTypeChange = (type: UserType) => {
    setUserType(type);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-2 border-blue-100">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{t('appTitle')}</h1>
                <p className="text-sm text-gray-600">{t('appSubtitle')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <LanguageSelector />
              <Button
                variant={userType === 'senior' ? 'default' : 'outline'}
                onClick={() => handleUserTypeChange('senior')}
                className="text-lg px-6 py-3"
              >
                {t('seniorMode')}
              </Button>
              <Button
                variant={userType === 'guardian' ? 'default' : 'outline'}
                onClick={() => handleUserTypeChange('guardian')}
                className="text-lg px-6 py-3"
              >
                {t('guardianMode')}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b overflow-x-auto">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex space-x-1 min-w-max">
            {tabs.map((tab) => {
              // Hide guardian panel for senior mode, hide other tabs for guardian mode, show admin for both
              if (userType === 'senior' && tab.id === 'guardian') return null;
              if (userType === 'guardian' && tab.id !== 'guardian' && tab.id !== 'admin') return null;
              
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-4 text-base font-medium border-b-3 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 bg-blue-50'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'events' && <EventDiscovery userType={userType} />}
        {activeTab === 'enrollments' && <MyEnrollments />}
        {activeTab === 'medicine' && <MedicineReminders />}
        {activeTab === 'chat' && <ChatWithGuardian />}
        {activeTab === 'profile' && <UserProfile />}
        {activeTab === 'guardians' && <GuardianConnections />}
        {activeTab === 'guardian' && <GuardianPanel />}
        {activeTab === 'admin' && <AdminDashboard />}
      </main>

      {/* Quick Stats Footer - only show in senior mode */}
      {userType === 'senior' && (
        <footer className="mt-16 bg-white border-t">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="flex items-center space-x-4 p-6">
                  <Calendar className="h-8 w-8 text-blue-500" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">3</div>
                    <div className="text-sm text-gray-600">{t('upcomingEvents')}</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center space-x-4 p-6">
                  <Heart className="h-8 w-8 text-green-500" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">3</div>
                    <div className="text-sm text-gray-600">{t('medicinesScheduled')}</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center space-x-4 p-6">
                  <Users className="h-8 w-8 text-purple-500" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">2</div>
                    <div className="text-sm text-gray-600">{t('connectedGuardians')}</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Index;

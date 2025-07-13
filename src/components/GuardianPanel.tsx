
import React, { useState } from 'react';
import { Shield, User, Calendar, Bell, Eye, Heart, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';

export const GuardianPanel = () => {
  const { t } = useLanguage();
  const [notifications, setNotifications] = useState(true);

  const seniors = [
    {
      id: 1,
      name: 'राम बहादुर',
      relation: 'Father',
      lastActivity: '2 hours ago',
      status: 'active',
      location: 'Home',
    },
    {
      id: 2,
      name: 'सीता देवी',
      relation: 'Mother',
      lastActivity: '30 minutes ago',
      status: 'active',
      location: 'Community Center',
    },
  ];

  const recentEnrollments = [
    {
      id: 1,
      seniorName: 'राम बहादुर',
      eventName: 'Morning Yoga Session',
      enrolledAt: '2025-01-13 14:30',
      eventDate: '2025-01-15',
    },
    {
      id: 2,
      seniorName: 'सीता देवी',
      eventName: 'Health Checkup Camp',
      enrolledAt: '2025-01-13 16:45',
      eventDate: '2025-01-16',
    },
  ];

  const medicineAlerts = [
    {
      id: 1,
      seniorName: 'राम बहादुर',
      medicine: 'Blood Pressure Medicine',
      dueTime: '08:00 AM',
      status: 'taken',
    },
    {
      id: 2,
      seniorName: 'सीता देवी',
      medicine: 'Vitamin D',
      dueTime: '10:00 AM',
      status: 'pending',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Shield className="h-8 w-8 mr-3 text-blue-500" />
            {t('guardianDashboard')}
          </h2>
          <p className="text-gray-600 text-lg mt-1">{t('monitorLovedOnes')}</p>
        </div>
        <Button
          variant={notifications ? "default" : "outline"}
          onClick={() => setNotifications(!notifications)}
          className="text-lg px-6 py-3"
        >
          <Bell className="h-5 w-5 mr-2" />
          {notifications ? t('notificationsOn') : t('notificationsOff')}
        </Button>
      </div>

      {/* Connected Seniors */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{t('connectedSeniors')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {seniors.map((senior) => (
              <div
                key={senior.id}
                className="flex items-center justify-between p-4 border rounded-lg bg-gray-50"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{senior.name}</h3>
                    <p className="text-gray-600">{senior.relation}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-green-600 mb-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm font-medium">{t('active')}</span>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    {senior.location}
                  </div>
                  <p className="text-sm text-gray-500">{t('lastSeen')}: {senior.lastActivity}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Event Enrollments */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <Calendar className="h-6 w-6 mr-2 text-green-500" />
            {t('recentEnrollments')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentEnrollments.map((enrollment) => (
              <div
                key={enrollment.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <h4 className="text-lg font-medium text-gray-900">{enrollment.eventName}</h4>
                  <p className="text-gray-600">{enrollment.seniorName}</p>
                  <p className="text-sm text-gray-500">
                    {t('enrolledOn')}: {new Date(enrollment.enrolledAt).toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <Badge className="bg-blue-100 text-blue-800 mb-2">
                    {t('upcoming')}
                  </Badge>
                  <p className="text-sm text-gray-600">{enrollment.eventDate}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Medicine Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <Heart className="h-6 w-6 mr-2 text-red-500" />
            {t('medicineAlerts')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {medicineAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`flex items-center justify-between p-4 border rounded-lg ${
                  alert.status === 'pending' ? 'bg-orange-50 border-orange-200' : 'bg-green-50 border-green-200'
                }`}
              >
                <div>
                  <h4 className="text-lg font-medium text-gray-900">{alert.medicine}</h4>
                  <p className="text-gray-600">{alert.seniorName}</p>
                  <p className="text-sm text-gray-500">{t('scheduledFor')}: {alert.dueTime}</p>
                </div>
                <Badge
                  className={
                    alert.status === 'taken'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-orange-100 text-orange-800'
                  }
                >
                  {alert.status === 'taken' ? t('taken') : t('pending')}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{t('quickActions')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button className="text-lg px-6 py-4 h-auto" variant="outline">
              <Eye className="h-5 w-5 mr-2" />
              {t('viewAllActivities')}
            </Button>
            <Button className="text-lg px-6 py-4 h-auto" variant="outline">
              <Bell className="h-5 w-5 mr-2" />
              {t('setCustomAlerts')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

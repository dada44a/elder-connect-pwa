
import React from 'react';
import { Calendar, MapPin, Clock, Users, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';

export const MyEnrollments = () => {
  const { t } = useLanguage();

  // Mock enrolled events data
  const enrolledEvents = [
    {
      id: 1,
      title: t('morningYoga'),
      date: '2025-01-15',
      time: '07:00 AM',
      location: 'Community Park',
      status: 'confirmed',
      category: 'Health & Wellness',
    },
    {
      id: 2,
      title: t('healthCheckup'),
      date: '2025-01-16',
      time: '10:00 AM',
      location: 'Senior Center',
      status: 'confirmed',
      category: 'Healthcare',
    },
    {
      id: 3,
      title: t('socialGathering'),
      date: '2025-01-17',
      time: '03:00 PM',
      location: 'Community Hall',
      status: 'pending',
      category: 'Social',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Health & Wellness': return 'bg-green-100 text-green-800';
      case 'Healthcare': return 'bg-red-100 text-red-800';
      case 'Social': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <Calendar className="h-8 w-8 mr-3 text-blue-500" />
          {t('myEnrollments')}
        </h2>
        <p className="text-gray-600 text-lg mt-1">{t('viewYourEvents')}</p>
      </div>

      <div className="grid gap-6">
        {enrolledEvents.map((event) => (
          <Card key={event.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                  <div className="flex gap-2">
                    <Badge className={getCategoryColor(event.category)}>
                      {event.category}
                    </Badge>
                    <Badge className={getStatusColor(event.status)}>
                      {event.status === 'confirmed' ? t('confirmed') : 
                       event.status === 'pending' ? t('pending') : t('cancelled')}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 mr-2 text-blue-500" />
                  <span className="text-base">{event.date}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-5 w-5 mr-2 text-green-500" />
                  <span className="text-base">{event.time}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-2 text-red-500" />
                  <span className="text-base">{event.location}</span>
                </div>
              </div>

              <div className="flex justify-end">
                <Button variant="outline" className="text-lg px-6 py-3">
                  <Eye className="h-5 w-5 mr-2" />
                  {t('viewDetails')}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

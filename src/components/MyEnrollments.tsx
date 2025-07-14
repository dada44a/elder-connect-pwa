
import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Users, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface EnrolledEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  status: string;
  category: string;
  description?: string;
}

export const MyEnrollments = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [enrolledEvents, setEnrolledEvents] = useState<EnrolledEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        // For now, we'll use a placeholder user ID (1) since auth isn't implemented
        // In a real app, you'd use the authenticated user's ID
        const { data: enrollments, error } = await supabase
          .from('enrollments')
          .select(`
            id,
            status,
            Event:event_id (
              id,
              title,
              description,
              date,
              time,
              location,
              category
            )
          `)
          .eq('user_id', 1);

        if (error) {
          console.error('Error fetching enrollments:', error);
          toast({
            title: t('error'),
            description: 'Failed to load enrollments',
            variant: 'destructive',
          });
          return;
        }

        const formattedEvents = enrollments?.map((enrollment: any) => ({
          id: enrollment.Event.id,
          title: enrollment.Event.title,
          date: new Date(enrollment.Event.date).toLocaleDateString(),
          time: new Date(enrollment.Event.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          location: enrollment.Event.location || 'TBD',
          status: enrollment.status,
          category: enrollment.Event.category || 'General',
          description: enrollment.Event.description,
        })) || [];

        setEnrolledEvents(formattedEvents);
      } catch (error) {
        console.error('Error:', error);
        toast({
          title: t('error'),
          description: 'Failed to load enrollments',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, [t, toast]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-8">
          <div className="text-lg">{t('loading')}...</div>
        </div>
      </div>
    );
  }

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
        {enrolledEvents.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-gray-500 text-lg">{t('noEnrollments')}</p>
            </CardContent>
          </Card>
        ) : (
          enrolledEvents.map((event) => (
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
          ))
        )}
      </div>
    </div>
  );
};

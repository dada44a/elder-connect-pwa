
import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Users, Clock, Heart, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/hooks/useLanguage';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface EventDiscoveryProps {
  userType: 'senior' | 'guardian';
}

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  distance: string;
  category: string;
  participants: number;
  maxParticipants: number;
  image: string;
}

export const EventDiscovery: React.FC<EventDiscoveryProps> = ({ userType }) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [enrolledEvents, setEnrolledEvents] = useState<Set<number>>(new Set());
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data, error } = await supabase
          .from('Event')
          .select('*')
          .order('date', { ascending: true });

        if (error) {
          console.error('Error fetching events:', error);
          toast({
            title: t('error'),
            description: 'Failed to load events',
            variant: 'destructive',
          });
          return;
        }

        const formattedEvents = data?.map((event: any) => ({
          id: event.id,
          title: event.title,
          description: event.description || 'No description available',
          date: new Date(event.date).toLocaleDateString(),
          time: new Date(event.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          location: event.location || 'TBD',
          distance: event.distance || '1.0 km',
          category: event.category || 'General',
          participants: event.participants || 0,
          maxParticipants: event.max_participants || 50,
          image: event.image_url || '/placeholder.svg',
        })) || [];

        setEvents(formattedEvents);

        // Fetch user's enrollments
        const { data: enrollments } = await supabase
          .from('enrollments')
          .select('event_id')
          .eq('user_id', 1); // placeholder user ID

        if (enrollments) {
          setEnrolledEvents(new Set(enrollments.map(e => e.event_id)));
        }
      } catch (error) {
        console.error('Error:', error);
        toast({
          title: t('error'),
          description: 'Failed to load events',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [t, toast]);

  const handleEnroll = async (eventId: number, eventTitle: string) => {
    try {
      const { error } = await supabase
        .from('enrollments')
        .insert([
          { user_id: 1, event_id: eventId, status: 'confirmed' }
        ]);

      if (error) {
        console.error('Error enrolling:', error);
        toast({
          title: t('error'),
          description: 'Failed to enroll in event',
          variant: 'destructive',
        });
        return;
      }

      setEnrolledEvents(prev => new Set([...prev, eventId]));
      toast({
        title: t('enrollmentSuccess'),
        description: `${t('enrolledIn')} "${eventTitle}"`,
        duration: 3000,
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: t('error'),
        description: 'Failed to enroll in event',
        variant: 'destructive',
      });
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

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-8">
          <div className="text-lg">{t('loading')}...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="outline" className="text-lg px-6 py-3">
              <Filter className="h-5 w-5 mr-2" />
              {t('filterEvents')}
            </Button>
            <div className="flex gap-2">
              <Badge variant="secondary" className="text-sm px-3 py-1">
                {t('healthWellness')}
              </Badge>
              <Badge variant="secondary" className="text-sm px-3 py-1">
                {t('healthcare')}
              </Badge>
              <Badge variant="secondary" className="text-sm px-3 py-1">
                {t('social')}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Events Grid */}
      <div className="grid gap-6">
        {events.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-gray-500 text-lg">{t('noEventsAvailable')}</p>
            </CardContent>
          </Card>
        ) : (
          events.map((event) => (
          <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="flex flex-col lg:flex-row">
              {/* Event Image */}
              <div className="lg:w-1/3">
                <div className="h-48 lg:h-full bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
                  <Heart className="h-16 w-16 text-blue-500 opacity-50" />
                </div>
              </div>
              
              {/* Event Details */}
              <div className="lg:w-2/3 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                    <Badge className={getCategoryColor(event.category)}>
                      {event.category}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-blue-600">{event.distance}</div>
                    <div className="text-sm text-gray-500">{t('away')}</div>
                  </div>
                </div>

                <p className="text-gray-700 mb-4 text-lg leading-relaxed">{event.description}</p>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
                  <div className="flex items-center text-gray-600">
                    <Users className="h-5 w-5 mr-2 text-purple-500" />
                    <span className="text-base">{event.participants}/{event.maxParticipants}</span>
                  </div>
                </div>

                <div className="flex justify-end">
                  {enrolledEvents.has(event.id) ? (
                    <Button disabled className="text-lg px-8 py-3 bg-green-100 text-green-800">
                      {t('enrolled')} ✓
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => handleEnroll(event.id, event.title)}
                      className="text-lg px-8 py-3 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
                    >
                      {t('enrollNow')}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>
          ))
        )}
      </div>
    </div>
  );
};

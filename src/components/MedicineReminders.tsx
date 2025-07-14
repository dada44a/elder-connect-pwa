
import React, { useState, useEffect } from 'react';
import { Plus, Clock, Bell, Check, X, Pill } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/hooks/useLanguage';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface Medicine {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  time: string;
  nextDue: string;
  taken: boolean;
}

export const MedicineReminders = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [showAddForm, setShowAddForm] = useState(false);
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const { data, error } = await supabase
          .from('Medicine')
          .select('*')
          .eq('userId', 1) // placeholder user ID
          .order('name');

        if (error) {
          console.error('Error fetching medicines:', error);
          toast({
            title: t('error'),
            description: 'Failed to load medicines',
            variant: 'destructive',
          });
          return;
        }

        const formattedMedicines = data?.map((med: any) => ({
          id: med.id,
          name: med.name,
          dosage: med.dosage || 'Not specified',
          frequency: med.frequency || 'As needed',
          time: med.time_of_day || '08:00 AM',
          nextDue: med.next_due || new Date().toISOString(),
          taken: med.taken || false,
        })) || [];

        setMedicines(formattedMedicines);
      } catch (error) {
        console.error('Error:', error);
        toast({
          title: t('error'),
          description: 'Failed to load medicines',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, [t, toast]);

  const [newMedicine, setNewMedicine] = useState({
    name: '',
    dosage: '',
    frequency: '',
    time: '',
  });

  const handleAddMedicine = async () => {
    if (!newMedicine.name || !newMedicine.dosage || !newMedicine.frequency || !newMedicine.time) {
      toast({
        title: t('error'),
        description: t('fillAllFields'),
        variant: 'destructive',
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('Medicine')
        .insert([
          {
            name: newMedicine.name,
            dosage: newMedicine.dosage,
            frequency: newMedicine.frequency,
            time_of_day: newMedicine.time,
            userId: 1, // placeholder user ID
            next_due: new Date().toISOString(),
            taken: false,
          }
        ])
        .select()
        .single();

      if (error) {
        console.error('Error adding medicine:', error);
        toast({
          title: t('error'),
          description: 'Failed to add medicine',
          variant: 'destructive',
        });
        return;
      }

      const newMed = {
        id: data.id,
        name: data.name,
        dosage: data.dosage,
        frequency: data.frequency,
        time: data.time_of_day,
        nextDue: data.next_due,
        taken: data.taken,
      };

      setMedicines([...medicines, newMed]);
      setNewMedicine({ name: '', dosage: '', frequency: '', time: '' });
      setShowAddForm(false);
      
      toast({
        title: t('medicineAdded'),
        description: `${newMedicine.name} ${t('addedSuccessfully')}`,
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: t('error'),
        description: 'Failed to add medicine',
        variant: 'destructive',
      });
    }
  };

  const markAsTaken = async (id: number) => {
    try {
      const { error } = await supabase
        .from('Medicine')
        .update({ taken: true })
        .eq('id', id);

      if (error) {
        console.error('Error updating medicine:', error);
        toast({
          title: t('error'),
          description: 'Failed to update medicine',
          variant: 'destructive',
        });
        return;
      }

      setMedicines(medicines.map(med => 
        med.id === id ? { ...med, taken: true } : med
      ));
      toast({
        title: t('medicineTaken'),
        description: t('markedAsTaken'),
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: t('error'),
        description: 'Failed to update medicine',
        variant: 'destructive',
      });
    }
  };

  const skipMedicine = (id: number) => {
    toast({
      title: t('medicineSkipped'),
      description: t('reminderSkipped'),
      variant: 'destructive',
    });
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
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{t('medicineReminders')}</h2>
          <p className="text-gray-600 text-lg">{t('stayHealthy')}</p>
        </div>
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="text-lg px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500"
        >
          <Plus className="h-5 w-5 mr-2" />
          {t('addMedicine')}
        </Button>
      </div>

      {/* Add Medicine Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Pill className="h-6 w-6 mr-2 text-green-500" />
              {t('addNewMedicine')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-lg">{t('medicineName')}</Label>
                <Input
                  id="name"
                  value={newMedicine.name}
                  onChange={(e) => setNewMedicine({...newMedicine, name: e.target.value})}
                  placeholder={t('enterMedicineName')}
                  className="text-lg p-3"
                />
              </div>
              <div>
                <Label htmlFor="dosage" className="text-lg">{t('dosage')}</Label>
                <Input
                  id="dosage"
                  value={newMedicine.dosage}
                  onChange={(e) => setNewMedicine({...newMedicine, dosage: e.target.value})}
                  placeholder={t('enterDosage')}
                  className="text-lg p-3"
                />
              </div>
              <div>
                <Label htmlFor="frequency" className="text-lg">{t('frequency')}</Label>
                <Select onValueChange={(value) => setNewMedicine({...newMedicine, frequency: value})}>
                  <SelectTrigger className="text-lg p-3">
                    <SelectValue placeholder={t('selectFrequency')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Once Daily">{t('onceDaily')}</SelectItem>
                    <SelectItem value="Twice Daily">{t('twiceDaily')}</SelectItem>
                    <SelectItem value="Three Times Daily">{t('threeTimes')}</SelectItem>
                    <SelectItem value="Weekly">{t('weekly')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="time" className="text-lg">{t('time')}</Label>
                <Input
                  id="time"
                  type="time"
                  value={newMedicine.time}
                  onChange={(e) => setNewMedicine({...newMedicine, time: e.target.value})}
                  className="text-lg p-3"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Button onClick={handleAddMedicine} className="text-lg px-6 py-3">
                {t('addMedicine')}
              </Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)} className="text-lg px-6 py-3">
                {t('cancel')}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Medicine List */}
      <div className="grid gap-4">
        {medicines.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-gray-500 text-lg">{t('noMedicines')}</p>
            </CardContent>
          </Card>
        ) : (
          medicines.map((medicine) => (
          <Card key={medicine.id} className={`${medicine.taken ? 'bg-green-50 border-green-200' : 'bg-white'}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <Pill className={`h-6 w-6 ${medicine.taken ? 'text-green-500' : 'text-blue-500'}`} />
                    <h3 className="text-xl font-semibold text-gray-900">{medicine.name}</h3>
                    {medicine.taken && (
                      <Badge className="bg-green-100 text-green-800">
                        {t('taken')} ✓
                      </Badge>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-600">
                    <div className="flex items-center">
                      <span className="font-medium text-gray-700">{t('dosage')}:</span>
                      <span className="ml-2 text-lg">{medicine.dosage}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-blue-500" />
                      <span className="text-lg">{medicine.frequency}</span>
                    </div>
                    <div className="flex items-center">
                      <Bell className="h-4 w-4 mr-2 text-orange-500" />
                      <span className="text-lg">{medicine.time}</span>
                    </div>
                  </div>
                </div>

                {!medicine.taken && (
                  <div className="flex space-x-3 ml-4">
                    <Button 
                      onClick={() => markAsTaken(medicine.id)}
                      className="bg-green-500 hover:bg-green-600 text-lg px-6 py-3"
                    >
                      <Check className="h-5 w-5 mr-2" />
                      {t('taken')}
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => skipMedicine(medicine.id)}
                      className="text-lg px-6 py-3 border-red-200 text-red-600 hover:bg-red-50"
                    >
                      <X className="h-5 w-5 mr-2" />
                      {t('skip')}
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          ))
        )}
      </div>
    </div>
  );
};

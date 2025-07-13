
import React, { useState } from 'react';
import { Plus, Clock, Bell, Check, X, Pill } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/hooks/useLanguage';
import { useToast } from '@/hooks/use-toast';

export const MedicineReminders = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [showAddForm, setShowAddForm] = useState(false);
  const [medicines, setMedicines] = useState([
    {
      id: 1,
      name: 'Vitamin D',
      dosage: '1000 IU',
      frequency: 'Daily',
      time: '08:00 AM',
      nextDue: '2025-01-14 08:00',
      taken: false,
    },
    {
      id: 2,
      name: 'Blood Pressure Medicine',
      dosage: '5mg',
      frequency: 'Twice Daily',
      time: '08:00 AM, 08:00 PM',
      nextDue: '2025-01-14 08:00',
      taken: true,
    },
    {
      id: 3,
      name: 'Calcium',
      dosage: '500mg',
      frequency: 'Daily',
      time: '10:00 AM',
      nextDue: '2025-01-14 10:00',
      taken: false,
    },
  ]);

  const [newMedicine, setNewMedicine] = useState({
    name: '',
    dosage: '',
    frequency: '',
    time: '',
  });

  const handleAddMedicine = () => {
    if (!newMedicine.name || !newMedicine.dosage || !newMedicine.frequency || !newMedicine.time) {
      toast({
        title: t('error'),
        description: t('fillAllFields'),
        variant: 'destructive',
      });
      return;
    }

    const newId = Math.max(...medicines.map(m => m.id)) + 1;
    setMedicines([...medicines, {
      id: newId,
      ...newMedicine,
      nextDue: `2025-01-14 ${newMedicine.time}`,
      taken: false,
    }]);

    setNewMedicine({ name: '', dosage: '', frequency: '', time: '' });
    setShowAddForm(false);
    
    toast({
      title: t('medicineAdded'),
      description: `${newMedicine.name} ${t('addedSuccessfully')}`,
    });
  };

  const markAsTaken = (id: number) => {
    setMedicines(medicines.map(med => 
      med.id === id ? { ...med, taken: true } : med
    ));
    toast({
      title: t('medicineTaken'),
      description: t('markedAsTaken'),
    });
  };

  const skipMedicine = (id: number) => {
    toast({
      title: t('medicineSkipped'),
      description: t('reminderSkipped'),
      variant: 'destructive',
    });
  };

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
        {medicines.map((medicine) => (
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
        ))}
      </div>
    </div>
  );
};

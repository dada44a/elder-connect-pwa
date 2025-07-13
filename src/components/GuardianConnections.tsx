
import React, { useState } from 'react';
import { Users, UserPlus, Trash2, Phone, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/hooks/useLanguage';
import { useToast } from '@/hooks/use-toast';

export const GuardianConnections = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newGuardian, setNewGuardian] = useState({
    name: '',
    relation: '',
    phone: '',
    email: '',
  });

  const [guardians, setGuardians] = useState([
    {
      id: 1,
      name: 'रमेश बहादुर',
      relation: 'पुत्र',
      phone: '+977-9841234567',
      email: 'ramesh@email.com',
      status: 'active',
      connectedDate: '2024-12-01',
    },
    {
      id: 2,
      name: 'सुनिता देवी',
      relation: 'बुहारी',
      phone: '+977-9812345678',
      email: 'sunita@email.com',
      status: 'active',
      connectedDate: '2024-12-15',
    },
  ]);

  const handleAddGuardian = () => {
    if (newGuardian.name && newGuardian.relation && newGuardian.phone) {
      const guardian = {
        id: guardians.length + 1,
        ...newGuardian,
        status: 'pending' as const,
        connectedDate: new Date().toISOString().split('T')[0],
      };
      setGuardians([...guardians, guardian]);
      setNewGuardian({ name: '', relation: '', phone: '', email: '' });
      setShowAddForm(false);
      toast({
        title: t('guardianAdded'),
        description: t('invitationSent'),
      });
    }
  };

  const handleRemoveGuardian = (id: number) => {
    setGuardians(guardians.filter(guardian => guardian.id !== id));
    toast({
      title: t('guardianRemoved'),
      description: t('connectionRemoved'),
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Users className="h-8 w-8 mr-3 text-blue-500" />
            {t('guardianConnections')}
          </h2>
          <p className="text-gray-600 text-lg mt-1">{t('manageGuardians')}</p>
        </div>
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="text-lg px-6 py-3"
        >
          <UserPlus className="h-5 w-5 mr-2" />
          {t('addGuardian')}
        </Button>
      </div>

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{t('addNewGuardian')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-lg">{t('fullName')}</Label>
                <Input
                  value={newGuardian.name}
                  onChange={(e) => setNewGuardian({...newGuardian, name: e.target.value})}
                  className="text-lg"
                  placeholder={t('enterName')}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-lg">{t('relation')}</Label>
                <Input
                  value={newGuardian.relation}
                  onChange={(e) => setNewGuardian({...newGuardian, relation: e.target.value})}
                  className="text-lg"
                  placeholder={t('enterRelation')}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-lg">{t('phoneNumber')}</Label>
                <Input
                  value={newGuardian.phone}
                  onChange={(e) => setNewGuardian({...newGuardian, phone: e.target.value})}
                  className="text-lg"
                  placeholder={t('enterPhone')}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-lg">{t('email')} ({t('optional')})</Label>
                <Input
                  value={newGuardian.email}
                  onChange={(e) => setNewGuardian({...newGuardian, email: e.target.value})}
                  className="text-lg"
                  placeholder={t('enterEmail')}
                />
              </div>
            </div>
            <div className="flex space-x-2 mt-6">
              <Button onClick={handleAddGuardian} className="text-lg px-6 py-3">
                {t('sendInvitation')}
              </Button>
              <Button
                onClick={() => setShowAddForm(false)}
                variant="outline"
                className="text-lg px-6 py-3"
              >
                {t('cancel')}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {guardians.map((guardian) => (
          <Card key={guardian.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="text-lg">
                      {guardian.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{guardian.name}</h3>
                    <p className="text-gray-600">{guardian.relation}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <div className="flex items-center text-gray-500">
                        <Phone className="h-4 w-4 mr-1" />
                        <span className="text-sm">{guardian.phone}</span>
                      </div>
                      {guardian.email && (
                        <div className="flex items-center text-gray-500">
                          <Mail className="h-4 w-4 mr-1" />
                          <span className="text-sm">{guardian.email}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(guardian.status)}>
                    {guardian.status === 'active' ? t('active') : 
                     guardian.status === 'pending' ? t('pending') : t('inactive')}
                  </Badge>
                  <Button
                    onClick={() => handleRemoveGuardian(guardian.id)}
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

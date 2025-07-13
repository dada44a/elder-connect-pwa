
import React, { useState } from 'react';
import { User, Edit, Save, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useLanguage } from '@/hooks/useLanguage';

export const UserProfile = () => {
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'राम बहादुर',
    age: '72',
    phone: '+977-9841234567',
    address: 'काठमाडौं, नेपाल',
    emergencyContact: '+977-9812345678',
    medicalConditions: 'मधुमेह, उच्च रक्तचाप',
  });

  const [editedProfile, setEditedProfile] = useState(profile);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile(profile);
  };

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleChange = (field: string, value: string) => {
    setEditedProfile(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <User className="h-8 w-8 mr-3 text-blue-500" />
            {t('userProfile')}
          </h2>
          <p className="text-gray-600 text-lg mt-1">{t('manageYourInfo')}</p>
        </div>
        {!isEditing ? (
          <Button onClick={handleEdit} className="text-lg px-6 py-3">
            <Edit className="h-5 w-5 mr-2" />
            {t('editProfile')}
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button onClick={handleSave} className="text-lg px-6 py-3">
              <Save className="h-5 w-5 mr-2" />
              {t('save')}
            </Button>
            <Button onClick={handleCancel} variant="outline" className="text-lg px-6 py-3">
              <X className="h-5 w-5 mr-2" />
              {t('cancel')}
            </Button>
          </div>
        )}
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-6 mb-8">
            <Avatar className="w-20 h-20">
              <AvatarFallback className="text-2xl">
                {profile.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{profile.name}</h3>
              <p className="text-lg text-gray-600">{profile.age} {t('yearsOld')}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-lg font-medium">{t('fullName')}</Label>
              {isEditing ? (
                <Input
                  value={editedProfile.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="text-lg"
                />
              ) : (
                <p className="text-lg text-gray-700 p-2 bg-gray-50 rounded">{profile.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-lg font-medium">{t('age')}</Label>
              {isEditing ? (
                <Input
                  value={editedProfile.age}
                  onChange={(e) => handleChange('age', e.target.value)}
                  className="text-lg"
                />
              ) : (
                <p className="text-lg text-gray-700 p-2 bg-gray-50 rounded">{profile.age}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-lg font-medium">{t('phoneNumber')}</Label>
              {isEditing ? (
                <Input
                  value={editedProfile.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="text-lg"
                />
              ) : (
                <p className="text-lg text-gray-700 p-2 bg-gray-50 rounded">{profile.phone}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-lg font-medium">{t('address')}</Label>
              {isEditing ? (
                <Input
                  value={editedProfile.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  className="text-lg"
                />
              ) : (
                <p className="text-lg text-gray-700 p-2 bg-gray-50 rounded">{profile.address}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-lg font-medium">{t('emergencyContact')}</Label>
              {isEditing ? (
                <Input
                  value={editedProfile.emergencyContact}
                  onChange={(e) => handleChange('emergencyContact', e.target.value)}
                  className="text-lg"
                />
              ) : (
                <p className="text-lg text-gray-700 p-2 bg-gray-50 rounded">{profile.emergencyContact}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-lg font-medium">{t('medicalConditions')}</Label>
              {isEditing ? (
                <Input
                  value={editedProfile.medicalConditions}
                  onChange={(e) => handleChange('medicalConditions', e.target.value)}
                  className="text-lg"
                />
              ) : (
                <p className="text-lg text-gray-700 p-2 bg-gray-50 rounded">{profile.medicalConditions}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

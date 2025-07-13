
import React, { useState } from 'react';
import { MessageCircle, Send, RefreshCw, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/hooks/useLanguage';

export const ChatWithGuardian = () => {
  const { t } = useLanguage();
  const [newMessage, setNewMessage] = useState('');
  const [selectedGuardian, setSelectedGuardian] = useState('रमेश (पुत्र)');
  
  // Sample guardians list
  const guardians = [
    { id: 'ramesh', name: 'रमेश (पुत्र)' },
    { id: 'sunita', name: 'सुनिता (बुहारी)' },
    { id: 'maya', name: 'माया (छोरी)' },
  ];

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'guardian',
      senderName: 'रमेश (पुत्र)',
      content: 'नमस्ते बाबा! कस्तो छ तपाईंको स्वास्थ्य?',
      timestamp: '2025-01-13 10:30',
      isRead: true,
      guardianId: 'ramesh',
    },
    {
      id: 2,
      sender: 'elder',
      senderName: 'तपाईं',
      content: 'सबै राम्रै छ बेटा। म योगा कक्षामा जाने छु भोलि।',
      timestamp: '2025-01-13 11:00',
      isRead: true,
      guardianId: 'ramesh',
    },
    {
      id: 3,
      sender: 'guardian',
      senderName: 'सुनिता (बुहारी)',
      content: 'वाह! त्यो धेरै राम्रो कुरा हो। के तपाईंले आफ्नो औषधि खानुभयो?',
      timestamp: '2025-01-13 14:15',
      isRead: false,
      guardianId: 'sunita',
    },
    {
      id: 4,
      sender: 'guardian',
      senderName: 'माया (छोरी)',
      content: 'बुबा, कहिले घर आउनुहुन्छ? सबैले तपाईंलाई सम्झिरहेका छन्।',
      timestamp: '2025-01-13 16:20',
      isRead: false,
      guardianId: 'maya',
    },
  ]);

  // Filter messages based on selected guardian
  const filteredMessages = messages.filter(message => {
    if (message.sender === 'elder') return true; // Show all elder messages
    const guardian = guardians.find(g => g.name === selectedGuardian);
    return message.guardianId === guardian?.id;
  });

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const guardian = guardians.find(g => g.name === selectedGuardian);
      const message = {
        id: messages.length + 1,
        sender: 'elder' as const,
        senderName: 'तपाईं',
        content: newMessage,
        timestamp: new Date().toLocaleString(),
        isRead: true,
        guardianId: guardian?.id || 'ramesh',
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const handleRefresh = () => {
    // Simulate fetching new messages
    console.log('Refreshing messages...');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <MessageCircle className="h-8 w-8 mr-3 text-blue-500" />
            {t('chatWithGuardian')}
          </h2>
          <p className="text-gray-600 text-lg mt-1">{t('stayConnected')}</p>
        </div>
        <Button onClick={handleRefresh} variant="outline" className="text-lg px-6 py-3">
          <RefreshCw className="h-5 w-5 mr-2" />
          {t('refresh')}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl">{t('messages')}</CardTitle>
            <div className="flex items-center space-x-2">
              <Label htmlFor="guardian-select" className="text-lg">{t('chatWith')}:</Label>
              <Select value={selectedGuardian} onValueChange={setSelectedGuardian}>
                <SelectTrigger className="w-48 text-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {guardians.map((guardian) => (
                    <SelectItem key={guardian.id} value={guardian.name} className="text-lg">
                      {guardian.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-96 overflow-y-auto mb-4">
            {filteredMessages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${
                  message.sender === 'elder' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <Avatar className="w-10 h-10">
                  <AvatarFallback>
                    <User className="h-6 w-6" />
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.sender === 'elder'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="text-sm font-medium mb-1">{message.senderName}</div>
                  <div className="text-base">{message.content}</div>
                  <div className="text-xs mt-1 opacity-70">{message.timestamp}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex space-x-2">
            <Textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={`${t('typeYourMessage')} ${selectedGuardian}`}
              className="flex-1 text-lg"
              rows={2}
            />
            <Button
              onClick={handleSendMessage}
              className="text-lg px-6 py-3 h-auto"
              disabled={!newMessage.trim()}
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

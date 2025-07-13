
import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  Shield, 
  BarChart3, 
  Settings, 
  AlertTriangle,
  UserCheck,
  Clock,
  Heart,
  MessageSquare,
  Plus,
  Search,
  Filter,
  Download
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useLanguage } from '@/hooks/useLanguage';

type AdminTab = 'overview' | 'users' | 'events' | 'alerts' | 'settings';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const { t } = useLanguage();

  const adminTabs = [
    { id: 'overview' as AdminTab, label: t('overview'), icon: BarChart3 },
    { id: 'users' as AdminTab, label: t('userManagement'), icon: Users },
    { id: 'events' as AdminTab, label: t('eventManagement'), icon: Calendar },
    { id: 'alerts' as AdminTab, label: t('systemAlerts'), icon: AlertTriangle },
    { id: 'settings' as AdminTab, label: t('systemSettings'), icon: Settings },
  ];

  const stats = [
    { label: t('totalUsers'), value: '1,247', icon: Users, color: 'text-blue-600' },
    { label: t('activeSeniors'), value: '892', icon: UserCheck, color: 'text-green-600' },
    { label: t('connectedGuardians'), value: '355', icon: Shield, color: 'text-purple-600' },
    { label: t('upcomingEvents'), value: '23', icon: Calendar, color: 'text-orange-600' },
    { label: t('pendingAlerts'), value: '7', icon: AlertTriangle, color: 'text-red-600' },
    { label: t('systemHealth'), value: '98%', icon: Heart, color: 'text-green-600' },
  ];

  const recentUsers = [
    { id: 1, name: 'Maria Garcia', type: 'Senior', status: 'Active', joinDate: '2024-01-15', lastActivity: '2 hours ago' },
    { id: 2, name: 'John Smith', type: 'Guardian', status: 'Active', joinDate: '2024-01-14', lastActivity: '1 day ago' },
    { id: 3, name: 'Anna Johnson', type: 'Senior', status: 'Inactive', joinDate: '2024-01-12', lastActivity: '3 days ago' },
    { id: 4, name: 'Robert Brown', type: 'Guardian', status: 'Active', joinDate: '2024-01-10', lastActivity: '5 hours ago' },
  ];

  const systemAlerts = [
    { id: 1, type: 'High', message: 'Medicine reminder missed by Maria Garcia', time: '2 hours ago', status: 'Unresolved' },
    { id: 2, type: 'Medium', message: 'Server response time above threshold', time: '4 hours ago', status: 'Investigating' },
    { id: 3, type: 'Low', message: 'Weekly backup completed successfully', time: '1 day ago', status: 'Resolved' },
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <Icon className={`h-8 w-8 ${stat.color}`} />
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>{t('recentUsers')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUsers.slice(0, 4).map((user) => (
                <div key={user.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.type} • {user.lastActivity}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {user.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5" />
              <span>{t('recentAlerts')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemAlerts.slice(0, 4).map((alert) => (
                <div key={alert.id} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    alert.type === 'High' ? 'bg-red-500' : 
                    alert.type === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{alert.message}</p>
                    <p className="text-xs text-gray-600">{alert.time} • {alert.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderUserManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{t('userManagement')}</h3>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            {t('filter')}
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            {t('export')}
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            {t('addUser')}
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('name')}</TableHead>
                <TableHead>{t('type')}</TableHead>
                <TableHead>{t('status')}</TableHead>
                <TableHead>{t('joinDate')}</TableHead>
                <TableHead>{t('lastActivity')}</TableHead>
                <TableHead>{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.type}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.status}
                    </span>
                  </TableCell>
                  <TableCell>{user.joinDate}</TableCell>
                  <TableCell>{user.lastActivity}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">{t('edit')}</Button>
                      <Button variant="ghost" size="sm">{t('view')}</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'users':
        return renderUserManagement();
      case 'events':
        return (
          <Card>
            <CardHeader>
              <CardTitle>{t('eventManagement')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{t('eventManagementDesc')}</p>
            </CardContent>
          </Card>
        );
      case 'alerts':
        return (
          <Card>
            <CardHeader>
              <CardTitle>{t('systemAlerts')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className={`h-5 w-5 mt-0.5 ${
                        alert.type === 'High' ? 'text-red-500' : 
                        alert.type === 'Medium' ? 'text-yellow-500' : 'text-green-500'
                      }`} />
                      <div>
                        <p className="font-medium">{alert.message}</p>
                        <p className="text-sm text-gray-600">{alert.time}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-sm bg-gray-100">
                      {alert.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      case 'settings':
        return (
          <Card>
            <CardHeader>
              <CardTitle>{t('systemSettings')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{t('systemSettingsDesc')}</p>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">{t('adminDashboard')}</h2>
          <p className="text-gray-600">{t('adminDashboardDesc')}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Search className="h-4 w-4 mr-2" />
            {t('search')}
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            {t('settings')}
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b">
        <nav className="flex space-x-8">
          {adminTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      {renderContent()}
    </div>
  );
};

export default AdminDashboard;

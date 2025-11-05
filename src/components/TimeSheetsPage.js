import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar as CalendarPicker } from './ui/calendar';
import { format, startOfToday } from 'date-fns';
import {
  Clock,
  Calendar,
  Plus,
  Users,
  LogOut,
  Eye,
  Edit,
  CheckCircle,
  Send,
  Save,
  Trash2,
} from 'lucide-react';

// =======================
// Sidebar
// =======================
const Sidebar = ({ activeTab, setActiveTab }) => (
  <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen">
    <Logo />
    <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
    <UserProfile />
  </div>
);

// =======================
// Logo Component
// =======================
const Logo = () => (
  <div className="p-6 border-b border-gray-200">
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
        <Users className="w-6 h-6 text-white" />
      </div>
      <div>
        <h1 className="text-xl font-bold text-gray-900">EMS</h1>
        <p className="text-sm text-gray-500">Employee Management</p>
      </div>
    </div>
  </div>
);

// =======================
// Navigation
// =======================
const Navigation = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'grid', path: '/' },
    { id: 'timesheets', label: 'Timesheets', icon: Clock, path: '/timesheets' },
    { id: 'leave', label: 'Leave Requests', icon: Calendar, path: '/leave' },
  ];

  return (
    <nav className="flex-1 p-4">
      {navItems.map((item) => (
        <NavItem
          key={item.id}
          item={item}
          isActive={activeTab === item.id}
          onClick={() => {
            setActiveTab(item.id);
            navigate(item.path);
          }}
        />
      ))}
    </nav>
  );
};

// =======================
// Nav Item
// =======================
const NavItem = ({ item, isActive, onClick }) => {
  const Icon = item.icon;
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
        isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
      }`}
    >
      {item.icon === 'grid' ? (
        <div className="w-5 h-5 grid grid-cols-2 gap-0.5">
          <div className="bg-current rounded-sm" />
          <div className="bg-current rounded-sm" />
          <div className="bg-current rounded-sm" />
          <div className="bg-current rounded-sm" />
        </div>
      ) : (
        <Icon className="w-5 h-5" />
      )}
      <span className="font-medium">{item.label}</span>
    </button>
  );
};

// =======================
// User Profile
// =======================
const UserProfile = () => (
  <div className="p-4 border-t border-gray-200">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
        JD
      </div>
      <div className="flex-1">
        <p className="font-semibold text-gray-900 text-sm">John Doe</p>
        <p className="text-xs text-gray-500">Employee • Engineering</p>
      </div>
    </div>
    <button className="w-full flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors text-sm">
      <LogOut className="w-4 h-4" />
      <span>Sign Out</span>
    </button>
  </div>
);


// =======================
// Timesheets Header
// =======================
const TimesheetsHeader = ({ userName, openDialog }) => {
  return (
    <div className="bg-white px-8 py-6">
      <h2 className="text-xl text-gray-600 mb-6 border-b border-gray-200">
        Welcome back, <span className="font-semibold text-gray-900">{userName}</span>
      </h2>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Timesheets</h1>
          <p className="text-gray-500">Track your working hours and manage timesheets</p>
        </div>
        <Button
          onClick={openDialog} 
          className="bg-blue-500 hover:bg-blue-600 text-white h-11"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Timesheet
        </Button>
      </div>
    </div>
  );
};

// =======================
// Log Hours Modal
// =======================
const LogHoursModal = ({ isOpen, onClose }) => {
  const today = startOfToday();
  const [formData, setFormData] = useState({
    date: '',
    dateObj: null,
    hoursWorkedHours: '',
    hoursWorkedMinutes: '',
    hoursWorked: 0,
    breakHours: '',
    overtimeHours: '0',
    tasks: [{ id: 1, name: '', time: '' }],
    description: '',
  });
  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState('tasks');

  useEffect(() => {
    if (isOpen) {
      const formattedToday = format(today, 'MMMM do, yyyy');
      setFormData((prev) => ({
        ...prev,
        date: formattedToday,
        dateObj: today,
        hoursWorkedHours: '',
        hoursWorkedMinutes: '',
        hoursWorked: 0,
        overtimeHours: '0',
      }));
      setErrors({});
    }
  }, [isOpen]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => {
      let updated = { ...prev, [field]: value };
      // Overtime calculation
      if (field === 'hoursWorkedHours' || field === 'hoursWorkedMinutes') {
        const hours = parseInt(updated.hoursWorkedHours || 0, 10);
        const minutes = parseInt(updated.hoursWorkedMinutes || 0, 10);
        const totalHours = hours + minutes / 60;
        updated.overtimeHours = totalHours > 8 ? (totalHours - 8).toFixed(2) : '0';
      }
      return updated;
    });
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = () => {
    console.log('Submitting:', formData);
    onClose();
  };

  const handleSaveDraft = () => {
    console.log('Saving draft:', formData);
    onClose();
  };

  const addTask = () => {
    setFormData((prev) => ({
      ...prev,
      tasks: [...prev.tasks, { id: Date.now(), name: '', time: '' }],
    }));
  };

  const removeTask = (id) => {
    setFormData((prev) => ({
      ...prev,
      tasks: prev.tasks.filter((task) => task.id !== id),
    }));
  };

  const updateTask = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      tasks: prev.tasks.map((task) => (task.id === id ? { ...task, [field]: value } : task)),
    }));
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl p-0 gap-0 bg-white">
        <DialogHeader className="px-8 pt-8 pb-6 border-b border-gray-200">
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Log Working Hours
          </DialogTitle>
        </DialogHeader>

        <div className="px-8 py-6 space-y-6">
          {/* Work Date */}
          <div className="space-y-2">
            <Label htmlFor="date">Work Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-full justify-start text-left font-normal h-12 pl-3`}
                >
                  <Calendar className="mr-2 h-5 w-5 text-blue-500" />
                  {formData.date || 'Pick a date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <CalendarPicker
                  mode="single"
                  selected={formData.dateObj}
                  onSelect={(date) => {
                    if (date && date >= today) {
                      const formatted = format(date, 'MMMM do, yyyy');
                      handleInputChange('date', formatted);
                      handleInputChange('dateObj', date);
                    }
                  }}
                  disabled={(date) => date < today}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Hours / Break / Overtime */}
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label>Total Work Hours</Label>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 h-12 bg-white">
                <input
                  type="number"
                  min="0"
                  max="24"
                  value={formData.hoursWorkedHours}
                  onChange={(e) => handleInputChange('hoursWorkedHours', e.target.value)}
                  className="w-14 text-right border-none focus:outline-none text-base"
                  placeholder="8"
                />
                <span className="text-gray-700 ml-1 font-medium">hr</span>
                <span className="mx-2 text-gray-500">:</span>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={formData.hoursWorkedMinutes}
                  onChange={(e) => handleInputChange('hoursWorkedMinutes', e.target.value)}
                  className="w-14 text-right border-none focus:outline-none text-base"
                  placeholder="30"
                />
                <span className="text-gray-700 ml-1 font-medium">min</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Break Hours</Label>
              <Input
                type="number"
                step="0.5"
                min="0"
                value={formData.breakHours}
                onChange={(e) => handleInputChange('breakHours', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Overtime Hours</Label>
              <Input value={formData.overtimeHours} readOnly className="bg-gray-100" />
            </div>
          </div>

          {/* Tasks */}
          <div className="space-y-2">
            <Label>Tasks</Label>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 bg-gray-100 p-1 rounded-lg">
                <TabsTrigger value="tasks">Tasks</TabsTrigger>
                <TabsTrigger value="description">Description</TabsTrigger>
              </TabsList>

              <TabsContent value="tasks" className="mt-4 space-y-3">
                {formData.tasks.map((task) => (
                  <div key={task.id} className="flex gap-3 items-start">
                    <Input
                      placeholder="Task name"
                      value={task.name}
                      onChange={(e) => updateTask(task.id, 'name', e.target.value)}
                    />
                    <Input
                      type="number"
                      placeholder="Hours"
                      value={task.time}
                      onChange={(e) => updateTask(task.id, 'time', e.target.value)}
                      min="0"
                    />
                    {formData.tasks.length > 1 && (
                      <Button onClick={() => removeTask(task.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button onClick={addTask}>
                  <Plus className="w-4 h-4 mr-2" /> Add Another Task
                </Button>
              </TabsContent>

              <TabsContent value="description">
                <Textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe your work activities..."
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="px-8 py-6 border-t border-gray-200 flex items-center justify-between gap-4">
          <Button onClick={handleSaveDraft} className="flex-1 h-12">
            <Save className="w-4 h-4 mr-2" /> Save as Draft
          </Button>
          <Button onClick={handleSubmit} className="flex-1 h-12 bg-blue-500 text-white">
            <Send className="w-4 h-4 mr-2" /> Submit for Approval
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// =======================
// Stats Cards
// =======================
const StatsCard = ({ icon: Icon, iconBg, title, value }) => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-gray-500 text-sm mb-2">{title}</p>
        <p className="text-4xl font-bold text-gray-900">{value}</p>
      </div>
      {Icon && (
        <div className={`w-12 h-12 ${iconBg || 'bg-gray-50'} rounded-lg flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-green-600" />
        </div>
      )}
    </div>
  </div>
);

const StatsGrid = () => (
  <div className="grid grid-cols-3 gap-6 mb-8">
    <StatsCard icon={Clock} iconBg="bg-blue-50" title="This Week" value="24.5h" />
    <StatsCard title="Overtime" value="1h" />
    <StatsCard icon={CheckCircle} iconBg="bg-green-50" title="Approved" value="1" />
  </div>
);

// =======================
// Timesheet List
// =======================
const TimesheetItem = ({ date, hours, breakTime, overtime, description, status }) => {
  const StatusIcon =
    status === 'Approved' ? CheckCircle : status === 'Submitted' ? Clock : Clock;

  const getStatusStyles = () => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-600';
      case 'Submitted':
        return 'bg-blue-100 text-blue-600';
      case 'Draft':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="mt-1 text-gray-500">
            <StatusIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-lg mb-2">{date}</h3>
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-1">
              <span>Hours: {hours}</span>
              <span>Break: {breakTime}</span>
              {overtime && <span>Overtime: {overtime}</span>}
            </div>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${getStatusStyles()}`}>
            {status}
          </span>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Eye className="w-5 h-5 text-gray-600" />
          </button>
          {status === 'Draft' && (
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Edit className="w-5 h-5 text-gray-600" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const RecentTimesheets = () => {
  const timesheets = [
    { date: 'Monday, January 15, 2024', hours: '8', breakTime: '1h', overtime: null, description: 'Regular workday', status: 'Approved' },
    { date: 'Tuesday, January 16, 2024', hours: '9', breakTime: '1h', overtime: '1h', description: 'Project deadline work', status: 'Submitted' },
    { date: 'Wednesday, January 17, 2024', hours: '7.5', breakTime: '0.5h', overtime: null, description: 'Half day training', status: 'Draft' },
  ];

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Calendar className="w-6 h-6 text-blue-500" />
        <h2 className="text-xl font-semibold text-gray-900">Recent Timesheets</h2>
      </div>
      <div className="space-y-4">
        {timesheets.map((t, idx) => (
          <TimesheetItem key={idx} {...t} />
        ))}
      </div>
    </div>
  );
};

// =======================
// Timesheets Page
// =======================
const TimesheetsPage = () => {
  const [activeTab, setActiveTab] = useState('timesheets');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const userName = 'John Doe';

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 overflow-auto">
        <TimesheetsHeader
          userName={userName}
          openDialog={() => setIsDialogOpen(true)}
        />

        {isDialogOpen && (
          <LogHoursModal
            isOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
          />
        )}

        <div className="px-8 py-8">
          <StatsGrid />
          <RecentTimesheets />
        </div>
      </div>
    </div>
  );
};

export default TimesheetsPage;

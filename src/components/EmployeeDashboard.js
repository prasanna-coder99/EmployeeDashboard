import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Clock, Calendar, TrendingUp, CheckCircle, Plus, Users, LogOut, X, Save, Send, Eye, Edit } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar as CalendarPicker } from './ui/calendar';
import { format, startOfToday, differenceInBusinessDays } from "date-fns";


import { useNavigate } from 'react-router-dom';

// =======================
// Request Leave Modal Component (with validation)
// =======================
const RequestLeaveModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    startDateObj: null,
    endDateObj: null,
    reason: "",
  });
  const [errors, setErrors] = useState({});
  const today = startOfToday();

  // ✅ Calculate duration (business days)
  const calculateDuration = () => {
    const { startDateObj, endDateObj } = formData;
    if (startDateObj && endDateObj && endDateObj >= startDateObj) {
      const businessDays = differenceInBusinessDays(endDateObj, startDateObj) + 1;
      return `${businessDays} business day${businessDays > 1 ? "s" : ""}`;
    }
    return null;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = (data) => {
    const newErrors = {};
    if (!data.leaveType) newErrors.leaveType = "Please select a leave type.";
    if (!data.startDate) newErrors.startDate = "Start date is required.";
    if (!data.endDate) newErrors.endDate = "End date is required.";
    if (!data.reason || !data.reason.trim()) newErrors.reason = "Please provide a reason.";
    if (data.startDateObj && data.endDateObj && data.endDateObj < data.startDateObj) {
      newErrors.endDate = "End date cannot be before start date.";
    }
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    console.log("Submitting leave request:", formData);
    setErrors({});
    onClose();
  };

  const durationText = calculateDuration();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          setErrors({});
          onClose();
        }
      }}
    >
      <DialogContent className="max-w-3xl p-0 gap-0 bg-white">
        <DialogHeader className="px-8 pt-8 pb-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <DialogTitle className="text-2xl font-bold text-gray-900">
                Request Time Off
              </DialogTitle>
            </div>
            <button
              onClick={() => {
                setErrors({});
                onClose();
              }}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
            >
              
            </button>
          </div>
        </DialogHeader>

        <div className="px-8 py-6 space-y-6">
          {/* Leave Type */}
          <div className="space-y-2">
            <Label htmlFor="leaveType" className="text-sm font-medium text-gray-700">
              Leave Type <span className="text-red-500">*</span>
            </Label>
            <select
              id="leaveType"
              value={formData.leaveType}
              onChange={(e) => handleInputChange("leaveType", e.target.value)}
              className={`w-full h-12 px-4 text-base rounded-lg focus:outline-none ${
                errors.leaveType ? "border border-red-500" : "border border-blue-400"
              }`}
            >
              <option value="">Select leave type</option>
              <option value="sick">Sick Leave</option>
              <option value="casual">Casual Leave</option>
              <option value="vacation">Vacation</option>
              <option value="personal">Personal Leave</option>
            </select>
            {errors.leaveType && <p className="text-red-500 text-sm">{errors.leaveType}</p>}
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-6">
            {/* Start Date */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Start Date <span className="text-red-500">*</span>
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left h-12 pl-3 ${
                      formData.startDate ? "text-gray-900" : "text-gray-400"
                    }`}
                  >
                    <Calendar className="mr-2 h-5 w-5  text-blue-500" />
                    {formData.startDate || "Pick Start Date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100">
                  <CalendarPicker
                    mode="single"
                    selected={formData.startDateObj}
                    onSelect={(date) => {
                      if (date) {
                        handleInputChange("startDate", format(date, "MMMM do, yyyy"));
                        handleInputChange("startDateObj", date);

                        // reset end date if it's before start date
                        if (formData.endDateObj && formData.endDateObj < date) {
                          handleInputChange("endDate", "");
                          handleInputChange("endDateObj", null);
                        }
                      }
                    }}
                    disabled={(date) => date < today}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate}</p>}
            </div>

            {/* End Date */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                End Date <span className="text-red-500">*</span>
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left h-12 pl-3 ${
                      formData.endDate ? "text-gray-900" : "text-gray-400"
                    }`}
                  >
                    <Calendar className="mr-2 h-5 w-5 text-blue-500" />
                    {formData.endDate || "Pick End Date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100">
                  <CalendarPicker
                    mode="single"
                    selected={formData.endDateObj}
                    onSelect={(date) => {
                      if (date) {
                        handleInputChange("endDate", format(date, "MMMM do, yyyy"));
                        handleInputChange("endDateObj", date);
                      }
                    }}
                    disabled={(date) =>
                      date < (formData.startDateObj || today)
                    } 
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate}</p>}
            </div>
          </div>

          {/* ✅ Duration Display */}
          {durationText && (
            <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 text-blue-700 text-sm flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-500" />
              Duration: <span className="font-semibold text-blue-800">{durationText}</span>
            </div>
          )}

          {/* Reason */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Reason for Leave <span className="text-red-500">*</span>
            </Label>
            <Textarea
              value={formData.reason}
              onChange={(e) => handleInputChange("reason", e.target.value)}
              className={`min-h-32 text-base resize-none ${
                errors.reason ? "border border-red-500" : ""
              }`}
              placeholder="Please provide a detailed reason..."
            />
            {errors.reason && <p className="text-red-500 text-sm">{errors.reason}</p>}
          </div>
        </div>

        {/* Submit Button */}
        <div className="px-8 py-6 border-t border-gray-200">
          <Button
            onClick={handleSubmit}
            className="w-full h-12 text-base bg-blue-500 hover:bg-blue-600 text-white"
          >
            <Send className="w-4 h-4 mr-2" /> Submit Leave Request
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// =======================
// Log Hours Modal (with past date disabled)
// =======================
const LogHoursModal = ({ isOpen, onClose }) => {
  const today = startOfToday();

  const [formData, setFormData] = useState({
    date: '',
    dateObj: null,
    hoursWorked: '',
    breakHours: '',
    overtimeHours: '0',
    notes: '',
  });

  const [errors, setErrors] = useState({});

  // ✅ Set default to today’s date automatically when modal opens
  useEffect(() => {
    if (isOpen) {
      const formattedToday = format(today, 'MMMM do, yyyy');
      setFormData((prev) => ({
        ...prev,
        date: formattedToday,
        dateObj: today,
      }));
      setErrors({});
    }
  }, [isOpen]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };

      // Auto-calculate overtime if hours > 8
      if (field === 'hoursWorked') {
        const hours = parseFloat(value) || 0;
        updated.overtimeHours = hours > 8 ? (hours - 8).toFixed(1) : '0';
      }

      return updated;
    });

    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validateForm = (data) => {
    const newErrors = {};

    // ✅ Validate only Work Date and Hours Worked
    if (!data.date) newErrors.date = 'Work date is required.';

    const hours = parseFloat(data.hoursWorked);
    if (isNaN(hours) || hours <= 0) newErrors.hoursWorked = 'Hours worked must be greater than 0.';
    if (hours > 24) newErrors.hoursWorked = 'Hours worked cannot exceed 24.';

    // Prevent negative break hours
    const breakH = parseFloat(data.breakHours || '0');
    if (!isNaN(breakH) && breakH < 0) newErrors.breakHours = 'Break hours cannot be negative.';

    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    console.log('Submitting for approval:', formData);
    setErrors({});
    onClose();
  };

  const handleSaveDraft = () => {
    console.log('Saving as draft:', formData);
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          setErrors({});
          onClose();
        }
      }}
    >
      <DialogContent className="max-w-3xl p-0 gap-0 bg-white">
        <DialogHeader className="px-8 pt-8 pb-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <DialogTitle className="text-2xl font-bold text-gray-900">
                Log Working Hours
              </DialogTitle>
            </div>
          </div>
        </DialogHeader>

        <div className="px-8 py-6 space-y-6">
          {/* ✅ Work Date */}
          <div className="space-y-2">
            <Label htmlFor="date" className="text-sm font-medium text-gray-700">
              Work Date <span className="text-red-500">*</span>
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-full justify-start text-left font-normal h-12 pl-3 ${
                    formData.date ? 'text-gray-900' : 'text-gray-400'
                  }`}
                >
                  <Calendar className="mr-2 h-5 w-5 text-blue-500" />
                  {formData.date || 'Pick a date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto p-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100"
                align="start"
              >
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
                  disabled={(date) => date < today} // disable past dates
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
          </div>

          {/* ✅ Hours / Break / Overtime */}
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="hoursWorked" className="text-sm font-medium text-gray-700">
                Hours Worked <span className="text-red-500">*</span>
              </Label>
              <Input
                id="hoursWorked"
                type="number"
                step="0.5"
                value={formData.hoursWorked}
                onChange={(e) => handleInputChange('hoursWorked', e.target.value)}
                className={`h-12 text-base ${errors.hoursWorked ? 'border border-red-500' : ''}`}
                placeholder="8.0"
                min="0"
              />
              {errors.hoursWorked && (
                <p className="text-red-500 text-sm">{errors.hoursWorked}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="breakHours" className="text-sm font-medium text-gray-700">
                Break Hours
              </Label>
              <Input
                id="breakHours"
                type="number"
                step="0.5"
                value={formData.breakHours}
                onChange={(e) =>
                  handleInputChange('breakHours', Math.max(0, e.target.value))
                }
                className={`h-12 text-base ${errors.breakHours ? 'border border-red-500' : ''}`}
                placeholder="1"
                min="0"
              />
              {errors.breakHours && (
                <p className="text-red-500 text-sm">{errors.breakHours}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="overtimeHours" className="text-sm font-medium text-gray-700">
                Overtime Hours
              </Label>
              <Input
                id="overtimeHours"
                type="number"
                step="0.1"
                value={formData.overtimeHours}
                readOnly
                className="h-12 text-base bg-gray-50"
                placeholder="0"
              />
              <p className="text-xs text-gray-500">Auto-calculated (hours &gt; 8)</p>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-sm font-medium text-gray-700">
              Notes (optional)
            </Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              className="min-h-32 text-base resize-none"
              placeholder="Describe your work activities, meetings, or any relevant details..."
            />
          </div>
        </div>

        <div className="px-8 py-6 border-t border-gray-200 flex items-center justify-between gap-4">
          <Button
            variant="outline"
            onClick={handleSaveDraft}
            className="flex-1 h-12 text-gray-800 text-base font-medium border-gray-300 hover:bg-gray-50"
          >
            <Save className="w-4 h-4 mr-2" />
            Save as Draft
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1 h-12 text-base font-medium bg-blue-500 hover:bg-blue-600 text-white"
          >
            <Send className="w-4 h-4 mr-2" />
            Submit for Approval
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// =======================
// Sidebar
// =======================
const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <Logo />
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <UserProfile />
    </div>
  );
};

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
        isActive
          ? 'bg-blue-50 text-blue-600'
          : 'text-gray-600 hover:bg-gray-50'
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
// Header, Tabs, Cards etc (unchanged)
// =======================
const Header = ({ userName }) => (
  <div className="bg-white border-b border-gray-200 px-8 py-4">
    <h2 className="text-{12px} text-gray-600">
      Welcome back, <span className="font-semibold text-gray-900">{userName}</span>
    </h2>
  </div>
);

const Tabs = () => (
  <div className="px-8 pt-6">
    <div className="flex gap-4 px-4 py-2 mb-6 bg-gray-100 ">
      <button className="px-4 py-1 bg-white rounded-lg font-semibold text-gray-900 shadow-sm ">
        Dashboard
      </button>
      <button className="px-4 py-1   text-gray-600 hover:text-gray-900">
        Attendance & Calendar
      </button>
    </div>
  </div>
);

const GreetingCard = ({ userName, onLogHours, onRequestLeave }) => (
  <Card className="mb-6">
    <CardHeader>
      <div className="flex items-center justify-between">
        <div>
          <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
            Good morning, {userName}!
          </CardTitle>
          <CardDescription className="text-base text-gray-500">
            Here's your activity summary for today
          </CardDescription>
        </div>
        <div className="flex gap-3">
          <Button 
            onClick={onLogHours}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Log Hours
          </Button>
          <Button 
            onClick={onRequestLeave}
            variant="outline" 
            className="border-gray-300 text-gray-700"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Request Leave
          </Button>
        </div>
      </div>
    </CardHeader>
  </Card>
);

const StatCard = ({ icon: Icon, iconColor, title, value, description, progressBar }) => (
  <Card>
    <CardHeader className="pb-3">
      <div className="flex items-center gap-2 text-gray-600 mb-2">
        <Icon className={`w-4 h-4 ${iconColor}`} />
        <CardDescription className="text-sm font-medium">{title}</CardDescription>
      </div>
      <CardTitle className="text-3xl font-bold text-gray-900">{value}</CardTitle>
    </CardHeader>
    <CardContent>
      {progressBar && (
        <div className="mb-2">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: progressBar.percentage }}></div>
          </div>
        </div>
      )}
      {description && <p className="text-sm text-gray-500">{description}</p>}
    </CardContent>
  </Card>
);

const LeaveBalanceCard = ({ sick, casual }) => (
  <Card>
    <CardHeader className="pb-3">
      <div className="flex items-center gap-2 text-gray-600 mb-2">
        <Calendar className="w-4 h-4 text-orange-500" />
        <CardDescription className="text-sm font-medium">Leave Balance</CardDescription>
      </div>
      <CardTitle className="text-4xl font-bold text-gray-900">{sick + casual}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex gap-4 text-sm">
        <div className='px-2 py-2 bg-gray-200 rounded-2xl '>
          <p className="text-gray-500">Sick:</p>
          <p className="font-semibold text-gray-900">{sick}</p>
        </div>
        <div className='px-2 py-2 bg-gray-200 rounded-2xl '>
          <p className="text-gray-500">Casual:</p>
          <p className="font-semibold text-sm text-gray-900">{casual}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

const StatsGrid = () => (
  <div className="grid grid-cols-4 gap-6 mb-8">
    <StatCard
      icon={Clock}
      iconColor="text-blue-500"
      title="Today's Hours"
      value="6.5h"
      description="+2.5h from yesterday"
    />
    <StatCard
      icon={TrendingUp}
      iconColor="text-green-500"
      title="Weekly Progress"
      value="28.5h"
      description="71% of weekly target"
      progressBar={{ percentage: '71%' }}
    />
    <LeaveBalanceCard sick={8} casual={12} />
    <StatCard
      icon={CheckCircle}
      iconColor="text-green-500"
      title="This Month"
      value="158h"
      description="Above average performance"
    />
  </div>
);

const TimesheetItem = ({ date, hours, status }) => {
  const statusStyles = status === 'approved' 
    ? 'bg-green-500 text-white' 
    : 'bg-white text-gray-700 border border-gray-200';

  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
      <div>
        <p className="font-semibold text-gray-900 mb-1">{date}</p>
        <p className="text-sm text-gray-500">{hours} hours</p>
      </div>
      <div className="flex items-center gap-2">
        {status === 'pending' && (
          <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
        )}
        <span className={`px-4 py-1.5 text-sm font-medium rounded-full ${statusStyles}`}>
          {status}
        </span>
      </div>
    </div>
  );
};

const RecentTimesheets = () => {
  const timesheets = [
    { date: 'Mon, Jan 15', hours: 8, status: 'approved' },
    { date: 'Sun, Jan 14', hours: 7.5, status: 'approved' },
    { date: 'Sat, Jan 13', hours: 8, status: 'pending' }
  ];

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold text-gray-900">Recent Timesheets</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-0 mb-4">
          {timesheets.map((timesheet, index) => (
            <TimesheetItem key={index} {...timesheet} />
          ))}
        </div>
        <button className="flex items-center gap-2 text-gray-700 font-medium hover:text-gray-900 transition-colors mt-6">
          <span>View All Timesheets</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </CardContent>
    </Card>
  );
};

const QuickActionButton = ({ icon: Icon, label, primary, onClick }) => (
  <Button
    onClick={onClick}
    className={`w-full justify-start h-12 ${primary ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
    variant={primary ? 'default' : 'outline'}
  >
    <Icon className="w-4 h-4 mr-3" />
    {label}
  </Button>
);

const QuickActions = ({ onLogHours, onRequestLeave }) => {
  const actions = [
    { icon: Clock, label: "Log Today's Hours", primary: true, onClick: onLogHours },
    { icon: Calendar, label: 'Request Time Off', primary: false, onClick: onRequestLeave },
    { icon: TrendingUp, label: 'View Reports', primary: false, onClick: () => {} }
  ];

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold text-gray-900">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action, index) => (
          <QuickActionButton key={index} {...action} />
        ))}
        <div className="pt-4 mt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-2">Need help?</p>
          <button className="text-blue-500 hover:text-blue-600 font-medium text-sm">
            Contact HR Support
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

const DashboardContent = ({ userName, onLogHours, onRequestLeave }) => (
  <div className="px-8 pb-8">
    <GreetingCard userName={userName} onLogHours={onLogHours} onRequestLeave={onRequestLeave} />
    <StatsGrid />
    <div className="grid grid-cols-2 gap-6">
      <RecentTimesheets />
      <QuickActions onLogHours={onLogHours} onRequestLeave={onRequestLeave} />
    </div>
  </div>
);

// =======================
// Main Page
// =======================
const EmployeeDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLogHoursModalOpen, setIsLogHoursModalOpen] = useState(false);
  const [isRequestLeaveModalOpen, setIsRequestLeaveModalOpen] = useState(false);
  const userName = 'John';

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 overflow-auto">
        <Header userName={userName} />
        <Tabs />
        <DashboardContent 
          userName={userName} 
          onLogHours={() => setIsLogHoursModalOpen(true)}
          onRequestLeave={() => setIsRequestLeaveModalOpen(true)}
        />
      </div>

      <LogHoursModal 
        isOpen={isLogHoursModalOpen} 
        onClose={() => setIsLogHoursModalOpen(false)} 
      />
      <RequestLeaveModal 
        isOpen={isRequestLeaveModalOpen} 
        onClose={() => setIsRequestLeaveModalOpen(false)} 
      />
    </div>
  );
};

export default EmployeeDashboard;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar,
  Users,
  LogOut,
  Heart,
  Coffee,
  Zap,
  Plus,
  Send,
  Clock,
  CheckCircle
} from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar as CalendarPicker } from './ui/calendar';
import { format, startOfToday, differenceInCalendarDays } from 'date-fns';

export default function LeaveRequests() {
  const navigate = useNavigate();
  const today = startOfToday();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('leave');

  const [formData, setFormData] = useState({
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: '',
    startDateObj: null,
    endDateObj: null
  });

  // inline validation errors (no alerts)
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    // clear single-field error on change
    setErrors(prev => ({ ...prev, [field]: '' }));

    setFormData(prev => {
      // if startDate changes and endDate exists but becomes invalid, reset endDate
      if (field === 'startDateObj') {
        const updated = {
          ...prev,
          startDateObj: value,
          startDate: value ? format(value, 'MMMM do, yyyy') : ''
        };
        if (updated.endDateObj && value && updated.endDateObj < value) {
          updated.endDateObj = null;
          updated.endDate = '';
        }
        return updated;
      }

      if (field === 'endDateObj') {
        return {
          ...prev,
          endDateObj: value,
          endDate: value ? format(value, 'MMMM do, yyyy') : ''
        };
      }

      return { ...prev, [field]: value };
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.leaveType) newErrors.leaveType = 'Please select a leave type.';
    if (!formData.startDateObj) newErrors.startDate = 'Start date is required.';
    if (!formData.endDateObj) newErrors.endDate = 'End date is required.';
    if (formData.startDateObj && formData.endDateObj && formData.endDateObj < formData.startDateObj) {
      newErrors.endDate = 'End date cannot be before start date.';
    }
    if (!formData.reason || !formData.reason.trim()) newErrors.reason = 'Please provide a reason.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    // Submit (replace with real API call)
    console.log('Submitting leave request:', formData);

    // reset after submit
    setFormData({
      leaveType: '',
      startDate: '',
      endDate: '',
      reason: '',
      startDateObj: null,
      endDateObj: null
    });
    setErrors({});
    setIsDialogOpen(false);
  };

  const durationText = (() => {
    if (formData.startDateObj && formData.endDateObj) {
      const days = differenceInCalendarDays(formData.endDateObj, formData.startDateObj) + 1;
      if (days <= 0) return null;
      return `${days} day${days > 1 ? 's' : ''}`;
    }
    return null;
  })();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
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

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <button
            onClick={() => { setActiveTab('dashboard'); navigate('/'); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
              activeTab === 'dashboard' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <div className="w-5 h-5 grid grid-cols-2 gap-0.5">
              <div className="bg-current rounded-sm"></div>
              <div className="bg-current rounded-sm"></div>
              <div className="bg-current rounded-sm"></div>
              <div className="bg-current rounded-sm"></div>
            </div>
            <span className="font-medium">Dashboard</span>
          </button>

          <button
            onClick={() => { setActiveTab('timesheets'); navigate('/timesheets'); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
              activeTab === 'timesheets' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Clock className="w-5 h-5" />
            <span className="font-medium">Timesheets</span>
          </button>

          <button
            onClick={() => { setActiveTab('leave'); navigate('/leave'); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
              activeTab === 'leave' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span className="font-medium">Leave Requests</span>
          </button>
        </nav>

        {/* User Profile */}
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
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-white">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="text-sm text-gray-500 mb-2">Welcome back, John</div>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-semibold text-gray-900 mb-1">Leave Requests</h1>
                <p className="text-gray-500">Manage your time off and leave applications</p>
              </div>
              <Button
                className="bg-blue-500 hover:bg-blue-600 text-white"
                onClick={() => setIsDialogOpen(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Request Leave
              </Button>
            </div>
          </div>

          {/* Leave Balance Cards */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            {/* Sick Leave */}
            <div className="p-6 bg-white rounded-lg ">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                  <Heart className="w-6 h-6 text-red-500" />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900">7</div>
                  <div className="text-xs text-gray-500">days left</div>
                </div>
              </div>
              <div className="text-base font-semibold text-gray-900 mb-1">Sick Leave</div>
              <div className="text-sm text-gray-500">1 used of 8 days</div>
            </div>

            {/* Casual Leave */}
            <div className="p-6 bg-white rounded-lg ">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Coffee className="w-6 h-6 text-blue-500" />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900">12</div>
                  <div className="text-xs text-gray-500">days left</div>
                </div>
              </div>
              <div className="text-base font-semibold text-gray-900 mb-1">Casual Leave</div>
              <div className="text-sm text-gray-500">0 used of 12 days</div>
            </div>

            {/* Emergency Leave */}
            <div className="p-6 bg-white rounded-lg ">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-yellow-500" />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900">2</div>
                  <div className="text-xs text-gray-500">days left</div>
                </div>
              </div>
              <div className="text-base font-semibold text-gray-900 mb-1">Emergency Leave</div>
              <div className="text-sm text-gray-500">1 used of 3 days</div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="p-6 bg-white rounded-lg ">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Total Days Used</div>
                  <div className="text-3xl font-bold text-gray-900">2</div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-lg ">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Pending Requests</div>
                  <div className="text-3xl font-bold text-gray-900">1</div>
                </div>
              </div>
            </div>
          </div>

          {/* Leave History */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-900">Leave History</h2>
            </div>

            <div className="space-y-4">
              {/* Sick Leave - Approved */}
              <div className="p-6 bg-white rounded-lg border border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col gap-2 pt-1">
                      <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center">
                        <Heart className="w-5 h-5 text-red-500" />
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-900">Sick Leave</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-sm text-gray-500">1 day</span>
                      </div>
                      <div className="text-sm text-gray-500 mb-2">Jan 20 - Jan 22, 2024</div>
                      <div className="text-sm text-gray-600 mb-1">Flu and fever - doctor recommended rest</div>
                      <div className="text-sm text-green-600">Approved by Manager Name</div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                      Approved
                    </span>
                    <span className="text-xs text-gray-500">Applied Jan 18</span>
                  </div>
                </div>
              </div>

              {/* ... other history items ... (kept unchanged) */}
            </div>
          </div>
        </div>
      </div>

      {/* Request Time Off Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl p-0 gap-0 bg-white">
          <DialogHeader className="px-8 pt-8 pb-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <DialogTitle className="text-2xl font-bold text-gray-900">
                  Request Time Off
                </DialogTitle>
              </div>
              <button
                onClick={() => {
                  // reset errors and close
                  setErrors({});
                  setIsDialogOpen(false);
                }}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
              >
                
              </button>
            </div>
          </DialogHeader>

          <div className="px-8 py-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="leaveType" className="text-sm font-medium text-gray-700">
                Leave Type <span className="text-red-500">*</span>
              </Label>
              <select
                id="leaveType"
                value={formData.leaveType}
                onChange={(e) => handleInputChange('leaveType', e.target.value)}
                className={`w-full h-12 px-4 text-base rounded-lg focus:outline-none ${
                  errors.leaveType ? 'border border-red-500' : 'border border-gray-300'
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

            <div className="grid grid-cols-2 gap-6">
              {/* Start Date */}
              <div className="space-y-2">
                <Label htmlFor="startDate" className="text-sm font-medium text-gray-700">
                  Start Date <span className="text-red-500">*</span>
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full justify-start text-left font-normal h-12 pl-3 ${
                        formData.startDate ? 'text-gray-900' : 'text-gray-400'
                      }`}
                    >
                      <Calendar className="mr-2 h-5 w-5 text-blue-500" />
                      {formData.startDate ? formData.startDate : 'Select Start Date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100"
                    align="start"
                  >
                    <CalendarPicker
                      mode="single"
                      selected={formData.startDateObj}
                      onSelect={(date) => {
                        if (!date) return;
                        // don't allow past dates
                        if (date < today) return;
                        handleInputChange('startDateObj', date);
                      }}
                      // disables past days (only today and future)
                      disabled={(date) => date < today}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate}</p>}
              </div>

              {/* End Date */}
              <div className="space-y-2">
                <Label htmlFor="endDate" className="text-sm font-medium text-gray-700">
                  End Date <span className="text-red-500">*</span>
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full justify-start text-left font-normal h-12 pl-3 ${
                        formData.endDate ? 'text-gray-900' : 'text-gray-400'
                      }`}
                      disabled={!formData.startDateObj}
                    >
                      <Calendar className="mr-2 h-5 w-5 text-blue-500" />
                      {formData.endDate ? formData.endDate : (formData.startDateObj ? 'Select End Date' : 'Select Start First')}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100"
                    align="start"
                  >
                    <CalendarPicker
                      mode="single"
                      selected={formData.endDateObj}
                      onSelect={(date) => {
                        if (!date) return;
                        // if start is defined, ensure end >= start
                        if (formData.startDateObj && date < formData.startDateObj) return;
                        // also disallow dates before today
                        if (date < today) return;
                        handleInputChange('endDateObj', date);
                      }}
                      // disable dates before startDateObj OR before today if start not set
                      disabled={(date) => {
                        if (!formData.startDateObj) return date < today;
                        return date < formData.startDateObj;
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate}</p>}
              </div>
            </div>

            {/* Duration display */}
            {durationText && (
              <div className="text-sm text-gray-600">
                <strong>Duration:</strong> {durationText}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="reason" className="text-sm font-medium text-gray-700">
                Reason for Leave <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="reason"
                value={formData.reason}
                onChange={(e) => handleInputChange('reason', e.target.value)}
                className={`min-h-32 text-base resize-none ${errors.reason ? 'border border-red-500' : ''}`}
                placeholder="Please provide a detailed reason for your leave request..."
              />
              {errors.reason && <p className="text-red-500 text-sm">{errors.reason}</p>}
            </div>
          </div>

          <div className="px-8 py-6 border-t border-gray-200">
            <Button
              onClick={handleSubmit}
              className="w-full h-12 text-base font-medium bg-blue-500 hover:bg-blue-600 text-white"
            >
              <Send className="w-4 h-4 mr-2" />
              Submit Leave Request
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

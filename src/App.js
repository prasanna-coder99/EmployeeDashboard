import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EmployeeDashboard from './components/EmployeeDashboard';
import TimesheetsPage from './components/TimeSheetsPage';

import LeaveRequests from './components/LeaveRequests';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmployeeDashboard />} />
        <Route path="/timesheets" element={<TimesheetsPage />} />
        <Route path="/leave" element={<LeaveRequests/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
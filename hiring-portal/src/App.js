import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Login from './Login';
import JobListingCreation from './JobListingCreation';
import JobDetails from './JobDetails';
import JobApplicationForm from './JobApplicationForm';
import NotificationHistory from './NotificationHistory';
import ResponsesManagement from './ResponsesManagement';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>Hiring Portal</h1>
          <nav>
            <ul>
              <li style={{ padding: '5px' }}>
                <Link to="/login" style={{ textDecoration: 'none' }}>Login</Link>
              </li>
              <li style={{ padding: '5px' }}>
                <Link to="/create" style={{ textDecoration: 'none' }}>Create Job Listing</Link>
              </li>
              <li style={{ padding: '5px' }}>
                <Link  path="/job/:jobId" style={{ textDecoration: 'none' }}>Job Details</Link>
              </li>
              <li style={{ padding: '5px' }}>
                <Link to="/apply/:jobId" style={{ textDecoration: 'none' }}>Apply for job</Link>
              </li>
              <li style={{ padding: '5px' }}>
                <Link to="/notifications" style={{ textDecoration: 'none' }}>Notification History</Link>
              </li>
              <li style={{ padding: '5px' }}>
                <Link to="/responses" style={{ textDecoration: 'none' }}> Responses for the jobs</Link>
              </li>
              
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/create" element={<JobListingCreation />} />
            <Route path="/job/:jobId" element={<JobDetails />} />
            <Route path="/apply/:jobId" element={<JobApplicationForm />} />
            <Route path="/notifications" element={<NotificationHistory />} />
            <Route path="/responses" element={<ResponsesManagement />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;


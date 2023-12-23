// src/JobApplicationForm.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { submitJobApplication } from './api';
const JobApplicationForm = () => {
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicationText, setApplicationText] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState(null);
  
  const navigate = useNavigate();

  const handleApplicationSubmit = async (e) => {
    e.preventDefault();

    // Add logic to submit the application details (e.g., send to Firebase)
      // Create an object with application details
  const applicationData = {
    applicantName,
    applicantEmail,
    applicationText,
    jobId: 'the_job_id', // Replace with the actual job ID
    // Add more details as needed
  };

  // Add the application data to Firebase Firestore
  const db = getFirestore();
  await addDoc(collection(db, 'jobApplications'), applicationData);
// Submit the job application
const submissionResult = await submitJobApplication(applicationData);

if (submissionResult) {
  // Set confirmation message after successful submission
  setConfirmationMessage('Application submitted successfully!');

  // Redirect to a confirmation page after successful submission
  navigate('/confirmation'); // Replace with your confirmation page path
    setApplicantName('');
    setApplicantEmail('');
    setApplicationText('');

    // Add any additional logic, such as displaying a confirmation message
  }else {
    setConfirmationMessage('Error submitting application. Please try again.');
  }
  };

  
return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>Job Application Form</h2>

      {confirmationMessage && <p style={{ color: 'green', marginBottom: '15px' }}>{confirmationMessage}</p>}

      <form onSubmit={handleApplicationSubmit}>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          Name:
          <input
            type="text"
            value={applicantName}
            onChange={(e) => setApplicantName(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </label>
        <br />
        <label style={{ display: 'block', marginBottom: '10px' }}>
          Email:
          <input
            type="email"
            value={applicantEmail}
            onChange={(e) => setApplicantEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </label>
        <br />
        <label style={{ display: 'block', marginBottom: '10px' }}>
          Application Text:
          <textarea
            value={applicationText}
            onChange={(e) => setApplicationText(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', minHeight: '100px' }}
          />
        </label>
        <br />
        <button type="submit" style={{ backgroundColor: '#007BFF', color: 'white', padding: '10px', border: 'none' }}>Submit Application</button>
      </form>
    </div>
  );
};

export default JobApplicationForm;

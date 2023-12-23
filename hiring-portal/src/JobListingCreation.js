
import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { addJobListingToFirestore } from './api';
import { Link } from 'react-router-dom';

const JobListingCreation = () => {
  const [user, setUser] = useState(null);
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobRequirements, setJobRequirements] = useState('');
  const [error, setError] = useState(null);
  const [creatingJob, setCreatingJob] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleCreateJobListing = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in to create a job listing.');
      return;
    }

    try {
      setCreatingJob(true); // Set creatingJob to true while job creation is in progress

      const jobId = await addJobListingToFirestore(jobTitle, jobDescription, jobRequirements);
      console.log('Job listing created with ID:', jobId);
      // You can add additional logic or redirect the user after successful job listing creation
    } catch (error) {
      setError('Error creating job listing: ' + error.message);
      console.error('Error creating job listing: ', error);
    } finally {
      setCreatingJob(false); // Set creatingJob back to false after job creation completes
    }
  };

  return (
    <div style={{ padding: '10px', maxWidth: '600px', margin: 'auto' }}>
      <h2>Create Job Listing</h2>

      {user ? (
        <form onSubmit={handleCreateJobListing}>
          <label style={{ display: 'block', marginBottom: '10px' }}>Job Title:
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              required
              style={{ width: '100%', padding: '8px' }}
            />
          </label>
          <br />
          <label style={{ display: 'block', marginBottom: '10px' }}>Job Description:
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              required
              style={{ width: '100%', padding: '8px' }}
            />
          </label>
          <br />
          <label style={{ display: 'block', marginBottom: '10px' }}>Job Requirements:
            <textarea
              value={jobRequirements}
              onChange={(e) => setJobRequirements(e.target.value)}
              required
              style={{ width: '100%', padding: '8px' }}
            />
          </label>
          <br />
          <button type="submit" style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px', border: 'none' }}>Create Job Listing</button>
        </form>
      ) : (
        <p style={{ color: 'red' }}>Please log in to create a job listing.</p>
      )}

      {creatingJob && <p>Creating job...</p>}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {user && (
        <div>
          <h3>Your Job Listings</h3>
          <ul>
            {/* Replace 'jobId' with the actual job ID */}
            <li style={{ marginBottom: '5px' }}><Link to={`/job/XaYzcQge1X6avKzcW2hV`} style={{ textDecoration: 'none', color: '#007BFF' }}>Job Title 1</Link></li>
            <li style={{ marginBottom: '5px' }}><Link to={`/job/Dg9kBukmTSwtCc20BLKj`} style={{ textDecoration: 'none', color: '#007BFF' }}>Job Title 2</Link></li>
            <li style={{ marginBottom: '5px' }}><Link to={`/job/9VfzhYiCBP3hqABgLzSi`} style={{ textDecoration: 'none', color: '#007BFF' }}>Job Title 3</Link></li>
            <li style={{ marginBottom: '5px' }}><Link to={`/job/B5fUKN5cttzGvF1TqBVp`} style={{ textDecoration: 'none', color: '#007BFF' }}>Job Title 4</Link></li>
            {/* Add more job listings as needed */}
          </ul>
        </div>
      )}
    </div>
  );
};

export default JobListingCreation;

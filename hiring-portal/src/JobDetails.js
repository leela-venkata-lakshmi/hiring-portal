import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const JobDetails = () => {
  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { jobId } = useParams();
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchJobDetails = async () => {
      if (!user) {
        setError('You must be logged in to view job details.');
        setLoading(false);
        return;
      }

      const db = getFirestore();
      const jobRef = doc(db, 'jobListings', jobId);

      try {
        const docSnapshot = await getDoc(jobRef);

        if (docSnapshot.exists()) {
          setJobDetails(docSnapshot.data());
        } else {
          setError('Job not found.');
        }
      } catch (error) {
        setError('Error fetching job details: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [user, jobId]);

  if (loading) {
    return <p></p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!user) {
    // Redirect to the login page if the user is not logged in
    return <Navigate to="/login" />;
  }

return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2 style={{ marginBottom: '15px' }}>{jobDetails.title}</h2>
      <p style={{ marginBottom: '10px' }}>Description: {jobDetails.description}</p>
      <p style={{ marginBottom: '15px' }}>Requirements: {jobDetails.requirements}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default JobDetails;


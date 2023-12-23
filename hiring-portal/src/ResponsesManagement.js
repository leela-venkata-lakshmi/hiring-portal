// src/ResponsesManagement.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { auth } from './index.js';

const ResponsesManagement = () => {
  const [responses, setResponses] = useState([]);
  const { jobId } = useParams();
  const navigate =useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
        if (!user) {
          // User is not logged in, redirect to the login page
          navigate.push('/login');
        } else {
          // User is logged in, fetch responses
          fetchResponses();
        }
      });
  
      return () => unsubscribe(); // Cleanup on unmount
    }, [jobId, navigate]);
    const fetchResponses = async () => {
      const db = getFirestore();
      const jobApplicationsCollection = collection(db, 'jobApplications');

      try {
        // Query job applications for the specific job listing
        const q = query(jobApplicationsCollection, where('jobId', '==', jobId));
        const querySnapshot = await getDocs(q);

        const fetchedResponses = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setResponses(fetchedResponses);
      } catch (error) {
        console.error('Error fetching responses:', error);
      }
    };

   
return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2 style={{ marginBottom: '15px' }}>Responses for Job Listing ID: {jobId}</h2>

      {responses.length === 0 ? (
        <p style={{ color: '#888' }}>No responses yet for this job listing.</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {responses.map((response) => (
            <li key={response.id} style={{ marginBottom: '15px', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
              <strong style={{ fontSize: '1.2em' }}>{response.applicantName}</strong> applied on {new Date(response.timestamp?.seconds * 1000).toLocaleString()}
              {/* Add more details or formatting as needed */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ResponsesManagement;

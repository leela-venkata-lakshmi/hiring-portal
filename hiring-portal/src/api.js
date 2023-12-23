import { getFirestore, collection, addDoc } from 'firebase/firestore';

const addJobListingToFirestore = async (jobTitle, jobDescription, jobRequirements) => {
  const db = getFirestore();

  try {
    // Add a new job listing to the 'jobListings' collection
    const docRef = await addDoc(collection(db, 'jobListings'), {
      title: jobTitle,
      description: jobDescription,
      requirements: jobRequirements,
    });

    console.log('Job listing created with ID: ', docRef.id);
    return docRef.id; // Return the ID of the created document if needed
  } catch (error) {
    console.error('Error creating job listing: ', error);
    throw error; // Propagate the error to handle it in the component
  }
};

const submitJobApplication = async (applicationData) => {
  const db = getFirestore();
  const jobApplicationsCollection = collection(db, 'jobApplications');

  try {
    await addDoc(jobApplicationsCollection, applicationData);
    console.log('Job application submitted successfully!');
    return true; // Indicates successful submission
  } catch (error) {
    console.error('Error submitting job application:', error);
    return false; // Indicates an error during submission
  }
};

export { addJobListingToFirestore, submitJobApplication };

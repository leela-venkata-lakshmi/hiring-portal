import React, { useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const Login = () => {
  // State for holding email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // State for login status and error message
  const [loginStatus, setLoginStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const handleNotificationPermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        console.log('Notification permission:', permission);
      } catch (error) {
        console.error('Error requesting notification permission:', error);
      }
    };

    handleNotificationPermission();
  }, []);

  const subscribeToNotifications = async (userId) => {
    const messaging = getMessaging();

    try {
      const currentToken = await getToken(messaging);
      console.log('FCM Token:', currentToken);

      // Subscribe the user to a topic (e.g., based on user ID or some unique identifier)
      messaging.subscribeToTopic(currentToken, 'user_' + userId);
    } catch (error) {
      console.error('Error subscribing to notifications:', error);
    }
  };

  const setupMessageListener = () => {
    const messaging = getMessaging();

    onMessage(messaging, (payload) => {
      console.log('Notification received:', payload);
      // Handle the notification payload as needed
    });
  };

  // Function to handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    // Get the Firebase auth object
    const auth = getAuth();

    try {
      // Sign in with email and password
      await signInWithEmailAndPassword(auth, email, password);
      const userId = auth.currentUser.uid;

      console.log('Login successful!');
      
      // Set login status and clear error message
      setLoginStatus(true);
      setErrorMessage('');

      // Subscribe to notifications after successful login
      subscribeToNotifications(userId);

      // Set up notification listener
      setupMessageListener();
    } catch (error) {
      console.error('Login error:', error.message);
      // Set login status and display error message
      setLoginStatus(false);
      setErrorMessage('Incorrect email or password. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Login</h2>
      {/* Display login status and error message */}
      {loginStatus === false && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {loginStatus === true && <p style={{ color: 'green' }}>Login successful!</p>}

      <form style={styles.form} onSubmit={handleLogin}>
        <label style={styles.label}>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />
        <br />
        <label style={styles.label}>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        <br />
        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '300px',
    margin: 'auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    marginTop: '20px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center',
    fontSize: '24px',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '5px',
    fontSize: '14px',
  },
  input: {
    padding: '8px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '3px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
  },
};

export default Login;



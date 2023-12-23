// NotificationHistory.js
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { auth } from './index.js'; // Import the auth object

const NotificationHistory = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const user = auth.currentUser;

      if (user) {
        const db = getFirestore();
        const notificationsCollection = collection(db, 'notifications');

        try {
          // Query notifications for the current user
          const q = query(notificationsCollection, where('userId', '==', user.uid));
          const querySnapshot = await getDocs(q);

          const fetchedNotifications = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setNotifications(fetchedNotifications);
        } catch (error) {
          console.error('Error fetching notifications:', error);
        }
      }
    };

    fetchNotifications();
  }, []);

return (
  <div style={styles.container}>
    <h2 style={styles.title}>Notification History</h2>
    {notifications.length === 0 ? (
      <p style={styles.noNotifications}>No notifications in your history.</p>
    ) : (
      <ul style={styles.notificationList}>
        {notifications.map((notification) => (
          <li key={notification.id} style={styles.notificationItem}>
            <strong style={styles.notificationTitle}>{notification.title}</strong> - {notification.body} ({new Date(notification.timestamp?.seconds * 1000).toLocaleString()})
            {/* Add more details or formatting as needed */}
          </li>
        ))}
      </ul>
    )}
  </div>
);
};

const styles = {
container: {
  padding: '20px',
  maxWidth: '600px',
  margin: 'auto',
},
title: {
  fontSize: '24px',
  marginBottom: '20px',
  textAlign: 'center',
},
noNotifications: {
  textAlign: 'center',
  color: '#555',
},
notificationList: {
  listStyle: 'none',
  padding: 0,
},
notificationItem: {
  marginBottom: '10px',
  borderBottom: '1px solid #ccc',
  paddingBottom: '10px',
},
notificationTitle: {
  color: '#007BFF',
},
};

export default NotificationHistory;

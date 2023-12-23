import { initializeApp } from 'firebase/app';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { getAuth} from "firebase/auth"
import reportWebVitals from './reportWebVitals';
import 'firebase/firestore'; // Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyBYGgYhXKUlkQ2HCsP1yQvLSk7bmxBWy8U",
  authDomain: "hiring-portal-75763.firebaseapp.com",
  projectId: "hiring-portal-75763",
  storageBucket: "hiring-portal-75763.appspot.com",
  messagingSenderId: "23703966011",
  appId: "1:23703966011:web:ebcf446adf45f81f39e71e",
  measurementId: "G-ER64D3FLF0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
//const db = getFirestore(app); // Initialize Firestore
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
export { app, auth };

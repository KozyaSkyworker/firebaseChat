import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyC-BxNvggKk-d4WkwuN_nNcJTS1-kWCXYI',
  authDomain: 'realtimechat-5ed47.firebaseapp.com',
  projectId: 'realtimechat-5ed47',
  storageBucket: 'realtimechat-5ed47.appspot.com',
  messagingSenderId: '356815992934',
  appId: '1:356815992934:web:a6710b8edd0abc1be115a7',
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export const db = getFirestore(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

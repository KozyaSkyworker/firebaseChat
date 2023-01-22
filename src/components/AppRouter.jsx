import React from 'react';

import { Route, Routes } from 'react-router-dom';

import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';

import { useContext } from 'react';

import { FireBaseContext } from '../App';

import Chat from './Chat/Chat';
import Login from './Login/Login';

const AppRouter = () => {
  const auth = getAuth();

  const { authUser, setAuthUser } = useContext(FireBaseContext);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;

      setAuthUser(user);
    } else {
    }
  });

  signOut(auth)
    .then(() => {
      /* setAuthUser(null); */
    })
    .catch((error) => {
      alert(error.message);
    });

  return authUser ? (
    <Routes>
      <Route path="/chat" element={<Chat />} />
      <Route path="*" element={<Chat />} />
    </Routes>
  ) : (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default AppRouter;

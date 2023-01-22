import React, { useState, createContext } from 'react';

import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import AppRouter from './components/AppRouter';

import { getAuth } from 'firebase/auth';

export const FireBaseContext = createContext(null);

function App() {
  const auth = getAuth();

  const [authUser, setAuthUser] = useState();

  return (
    <FireBaseContext.Provider
      value={{
        authUser,
        setAuthUser,
        auth,
      }}>
      <BrowserRouter>
        <div className="wrapper">
          <Header />
          <AppRouter />
        </div>
      </BrowserRouter>
    </FireBaseContext.Provider>
  );
}

export default App;

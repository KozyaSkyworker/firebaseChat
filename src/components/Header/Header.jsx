import React from 'react';

import { Link } from 'react-router-dom';

import { useContext } from 'react';

import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';

import { FireBaseContext } from '../../App';

import styles from './header.module.scss';

const Header = () => {
  const { authUser, setAuthUser } = useContext(FireBaseContext);

  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      setAuthUser(user);
    } else {
    }
  });

  const logoutHanlde = () => {
    signOut(auth)
      .then(() => {
        setAuthUser(null);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <header className={styles.header}>
      {authUser ? (
        <>
          <span className={styles.header__email}>{authUser.email}</span>
          <button className={styles.header__btn} onClick={() => logoutHanlde()}>
            Выйти
          </button>
        </>
      ) : (
        <Link to="/login">
          <button className={styles.header__btn}> Войти</button>
        </Link>
      )}
    </header>
  );
};

export default Header;

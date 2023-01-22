import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useContext } from 'react';

import { useState } from 'react';

import { FireBaseContext } from '../../App';

import styles from './login.module.scss';

const Login = () => {
  const { setAuthUser } = useContext(FireBaseContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setAuthUser(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  const handleRegistration = () => {
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  return (
    <div className="main">
      <div className={styles.login}>
        <div className={styles.login__box}>
          <form>
            <input
              className={styles.login__input}
              type="text"
              placeholder="email@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />{' '}
            <br />
            <input
              className={styles.login__input}
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button className={styles.login__btn} onClick={() => handleLogin()} type="button">
              Логин
            </button>
            <button
              className={styles.login__btn}
              onClick={() => handleRegistration()}
              type="button">
              Зарегистрироваться
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

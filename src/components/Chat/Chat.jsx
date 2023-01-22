import React, { useState, useContext, useEffect } from 'react';

import { doc, collection, addDoc, getDoc } from 'firebase/firestore';
import { db } from './../../index';
import { FireBaseContext } from '../../App';

import { useCollectionData } from 'react-firebase-hooks/firestore';

import styles from './chat.module.scss';
import { async } from '@firebase/util';

const Chat = () => {
  const [textValue, setTextValue] = useState('');
  const { authUser } = useContext(FireBaseContext);
  const [value, loading] = useCollectionData(collection(db, 'messages'));

  const sendMessage = async () => {
    try {
      const docRef = await addDoc(collection(db, 'messages'), {
        uid: authUser.uid,
        login: authUser.email,
        data: textValue,
      });
      setTextValue('');
    } catch (e) {
      alert(e.message);
    }
  };

  if (loading) {
    return <div>loading</div>;
  }

  return (
    <div className={styles.chat}>
      <div className={styles.chat__inner}>
        <div className={styles.chat__content}>
          {value.map((msg, idx) => {
            return (
              <div
                key={idx}
                className={
                  authUser.uid === msg.uid
                    ? `${styles.chat__message} ${styles.chat__self}`
                    : `${styles.chat__message}`
                }>
                <p className={styles.chat__name}>{msg.login}</p>
                <p className={styles.chat__text}>{msg.data}</p>
              </div>
            );
          })}
        </div>
        <div className={styles.chat__controls}>
          <form className={styles.chat__form}>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}></textarea>
            <button className={styles.chat__btn} onClick={sendMessage} type="button">
              Отправить
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;

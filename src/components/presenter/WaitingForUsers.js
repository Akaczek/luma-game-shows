import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/presenter/user/quizId.module.css'
import logo from '../../../public/woluma_logo.png';
import qr_code from '../../../public/qr.png';
import exitImageFile from '../../../public/exit.svg';
import groupImageFile from '../../../public/group.svg';
import { getRandomInt } from '@/utils/functions';

const userNames = [
  { name: 'Jan', id: 1 },
  { name: 'Kasia', id: 2 },
  { name: 'Marek', id: 3 },
  { name: 'Kuba', id: 4 },
  { name: 'Łukasz', id: 5 },
];

const WaitingForUsers = ({ users, handleRunQuiz, handleExit, gameCode }) => {
  const userQty = Object.entries(users).length;
  let cssClass = '';

  return (
    <>
      <div className={styles.header}>
        <Image src={logo} alt="logo" className={styles.logo} />
        <Image src={exitImageFile} alt="exit" className={styles.exitImage} onClick={handleExit} />
      </div>
      <div className={styles.gameInfoContainer}>
        <div
          className={userQty === 0 ? styles.participantQtyInfo : styles.hidden}
        >
          <Image
            src={groupImageFile}
            alt="group"
            className={styles.participantQtyImg}
          />
          <span className={styles.participantQtyText}>0</span>
        </div>
        <div
          className={styles.quizInfoContainer}
        >
          <div className={styles.quizInfo}>
            <span className={styles.quizInfoText}>Dołącz do teleturnieju:</span>
            <span className={styles.quizInfoText}>woluma-game-shows.vercel.app</span>
          </div>
          <div className={styles.quizCode}>
            <span className={styles.quizCodeLbl}>Kod gry:</span>
            <span className={styles.quizCodeText}>{gameCode}</span>
          </div>
          <div className={styles.quizQRCode}>
            <Image
              src={qr_code}
              alt="qr_code"
              className={styles.qr_code}
            />
          </div>
        </div>
        <div
          className={userQty !== 0 ? styles.startGameContainer : styles.hidden}
        >
          <div className={styles.participantQtyInfo}>
            <Image
              src={groupImageFile}
              alt="group"
              className={styles.participantQtyImg}
            />
            <span className={styles.participantQtyText}>{userQty}</span>
          </div>

          <button className={styles.runButton} onClick={handleRunQuiz}>
            Start
          </button>
        </div>

        {userQty > 0 ? (
          <div className={styles.quizUsersContainer}>
            {Object.entries(users).map(([id, user]) => {
              cssClass = 'quizUserColor' + getRandomInt(1, 4).toString();
              console.log(cssClass);
              return (
                <div
                  className={`${styles.quizUser}  ${styles[cssClass]}`}
                  key={id}
                >
                  <span className={styles.quizUserName}>{user.userName}</span>
                </div>
              );
            })}
          </div>
        ) : (
          <span className={styles.noUsersText}>
            Oczekiwanie na użytkowników...
          </span>
        )}
      </div>
    </>
  );
};

export default WaitingForUsers;
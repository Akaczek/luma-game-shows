import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/presenter/user/quizId.module.css'
import logo from '../../../public/luma_logo.png';
import exitImageFile from '../../../public/exit.svg';
import groupImageFile from '../../../public/group.svg';
import { getRandomInt } from '@/utils/random';

const userNames = [
  { name: 'Jan', id: 1 },
  { name: 'Kasia', id: 2 },
  { name: 'Marek', id: 3 },
  { name: 'Kuba', id: 4 },
  { name: 'Łukasz', id: 5 },
];

const WaitingForUsers = ({ users, handleRunQuiz, handleExit }) => {

  const gameQuizCode = '134270';
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
          className={
            userQty === 0
              ? styles.quizInfoContainer
              : `${styles.quizInfoContainer} ${styles.smaller}`
          }
        >
          <div className={styles.quizInfo}>
            <span className={styles.quizInfoText}>Dołącz do teleturnieju:</span>
            <span className={styles.quizInfoText}>www.luma/join.pl</span>
          </div>
          <div className={styles.quizCode}>
            <span className={styles.quizCodeLbl}>Kod gry:</span>
            <span className={styles.quizCodeText}>{gameQuizCode}</span>
          </div>
          <div className={styles.quizQRCode}>
            <span className={styles.quizQRCodeLbl}>Tu bedzie kod qr</span>
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
import { useSingleUser, useUserQuizes } from '@/network/getData';
import React from 'react';
import '../../../styles/presenter/user/quizId.module.css';
import sharedStyles from '../../../styles/presenter/sharedPresenterStyles.module.css';
import styles from '../../../styles/presenter/user/quizId.module.css';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../../public/luma_logo.png';
import exitImageFile from '../../../../public/exit.svg';
import groupImageFile from '../../../../public/group.svg';
import { useRouter } from 'next/router';
import { getRandomInt } from '../../../utils/random';

const userNames = [
  { name: 'Jan', id: 1 },
  { name: 'Kasia', id: 2 },
  { name: 'Marek', id: 3 },
  { name: 'Kuba', id: 4 },
  { name: 'Łukasz', id: 5 },
];

const RunQuiz = () => {
  const router = useRouter();
  const { user } = router.query;
  const [userObject, setUserObject] = useSingleUser(user);

  const gameQuize = '134270';
  const userQty = 5;
  let cssClass = '';

  const handleRunQuiz = () => {
    console.log('start');
  };

  return (
    <div className={sharedStyles.pageContainer}>
      <div className={styles.header}>
        <Image src={logo} alt="logo" className={styles.logo} />
        <Link href="/">
          <Image src={exitImageFile} alt="exit" className={styles.exitImage} />
        </Link>
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
            <span className={styles.quizCodeText}>{gameQuize}</span>
          </div>
          <div className={styles.quizQRCode}>
            <span className={styles.quizQRCodeLbl}>Tu bedzie kod qr</span>
          </div>
        </div>
        <div className={styles.startGameContainer}>
          <div
            className={
              userQty !== 0 ? styles.participantQtyInfo : styles.hidden
            }
          >
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
            {userNames.map((user) => {
              cssClass = 'quizUserColor' + getRandomInt(1, 4).toString();
              console.log(cssClass);
              return (
                <div
                  className={`${styles.quizUser}  ${styles[cssClass]}`}
                  key={user.id}
                >
                  <span className={styles.quizUserName}>{user.name}</span>
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
    </div>
  );
};

export default RunQuiz;

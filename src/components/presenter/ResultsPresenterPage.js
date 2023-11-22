import React from 'react';
import sharedStyles from '@/styles/presenter/sharedPresenterStyles.module.css';
import Image from 'next/image';
import logo from '../../../public/woluma_logo.png';
import styles from '@/styles/presenter/user/gameQuestion.module.css';
import exitImageFile from '../../../public/exit.svg';
import Link from 'next/link';

const ResultsPresenterPage = ({ranking, handleExit}) => {
  return (
    <>
      <div className={styles.header}>
        <button
          className={`${sharedStyles.buttonStylesGreen} ${sharedStyles.backButton}`}
          onClick={() => {handleExit()}}
        >
          Powrót
        </button>
        <Image src={logo} alt="logo" className={styles.logo} />
        <div className={styles.userSetupContainer}>
          <Link href="/">
            <Image
              src={exitImageFile}
              alt="exit"
              className={styles.exitImage}
            />
          </Link>
        </div>
      </div>
      <div className={styles.resultsLabel}>
        Gratulacje! Zagramy jeszcze raz?
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.resultsTable}>
          <tbody>
            <tr>
              <td className={`${styles.rightTh} ${styles.boldText}`}>
                Miejsce
              </td>
              <td className={`${styles.rightTh} ${styles.boldText}`}>Nick</td>
              <td className={`${styles.rightTh} ${styles.boldText}`}>
                Ilość punktów
              </td>
            </tr>
            {ranking.map((player, index) => (
              <tr key={index}>
                <td className={styles.rightTh}>{player.rank}</td>
                <td className={styles.rightTh}>{player.userName}</td>
                <td className={styles.rightTh}>{player.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ResultsPresenterPage;

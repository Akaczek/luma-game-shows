import React from 'react';
import sharedStyles from '@/styles/presenter/sharedPresenterStyles.module.css';
import Image from 'next/image';
import logo from '../../../public/luma_logo.png';
import styles from '@/styles/presenter/user/gameQuestion.module.css';
import exitImageFile from '../../../public/exit.svg';
import Link from 'next/link';

const ranking = [
  { position: 1, name: 'John', score: 100 },
  { position: 2, name: 'Emma', score: 95 },
  { position: 3, name: 'Michael', score: 90 },
  { position: 4, name: 'Sophia', score: 85 },
  { position: 5, name: 'Daniel', score: 80 },
  { position: 1, name: 'John', score: 100 },
  { position: 2, name: 'Emma', score: 95 },
  { position: 3, name: 'Michael', score: 90 },
  { position: 4, name: 'Sophia', score: 85 },
  { position: 5, name: 'Daniel', score: 80 },
  { position: 1, name: 'John', score: 100 },
  { position: 2, name: 'Emma', score: 95 },
  { position: 3, name: 'Michael', score: 90 },
  { position: 4, name: 'Sophia', score: 85 },
  { position: 5, name: 'Daniel', score: 80 },
];

const ResultsPresenterPage = () => {
  return (
    <div className={sharedStyles.pageContainer}>
      <div className={styles.header}>
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
                <td className={styles.rightTh}>{player.position}</td>
                <td className={styles.rightTh}>{player.name}</td>
                <td className={styles.rightTh}>{player.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultsPresenterPage;

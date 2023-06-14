import React from 'react';
import styles from '../../styles/participant/resultsPage.module.css';
import sharedStyles from '../../styles/participant/questionPage.module.css';
import Image from 'next/image';
import Link from 'next/link';
import exitImageFile from '../../../public/exit.svg';

const ResultsPage = ({ score, maxScore, place, joinAgain, userName }) => {
  return (
    <>
      <Link href="/" className={sharedStyles.exitImageLink}>
        <Image
          src={exitImageFile}
          alt="exit"
          className={sharedStyles.exitImage}
        />
      </Link>
      <div className={sharedStyles.questionPageContainer}>
        <div className={styles.results}>
          <div className={styles.resultsLabelTitleRow}>
            {place < 3
              ? `Gratulacje, ${userName}!`
              : `Następnym razem Ci się uda, ${userName}!`}
          </div>
          <div className={styles.resultsLabelTitleRow}>Wyniki</div>
          <div className={styles.resultsLabelRow}>
            Twój wynik: {score}/{maxScore}
          </div>
          <div className={styles.resultsLabelRow}>Miejsce: {place}</div>
        </div>
        <button className={styles.submitJoiningBtn} onClick={joinAgain}>
          Dołącz do innego quizu
        </button>
      </div>
    </>
  );
};

export default ResultsPage;

import styles from '../../styles/participant/waitingForAnswers.module.css';
import React from 'react';
import { PulseLoader } from 'react-spinners';

const WaitingForStartPage = () => {
  const participantCount = 5;
  return (
    <div className={styles.waitingForAnswersPageContainer}>
      <div className={styles.waitingLabel}>Oczekiwanie na rozpoczęcie...</div>
      <div className={styles.loaderContainer}>
        <PulseLoader color="white" size={30} speedMultiplier={0.7} />
      </div>
      {/* <div>
        <div className={styles.answerState}>{participantCount}</div>
        <div className={styles.answerLabel}>UCZESTNIKÓW</div>
      </div> */}
    </div>
  );
};

export default WaitingForStartPage;

import styles from '../../styles/participant/waitingForAnswers.module.css';
import React from 'react';
import { ClockLoader } from 'react-spinners';

const WaitingForAnswersPage = () => {
  const allParticipants = 5;
  const answerCount = 3;
  return (
    <div className="gradient-animation-1">
      <div className={styles.loaderContainer}>
        <ClockLoader color="white" size={100} />
      </div>
      <div className={styles.waitingLabel}>
        Oczekiwanie na pozostałych uczestników...
      </div>
    </div>
  );
};

export default WaitingForAnswersPage;

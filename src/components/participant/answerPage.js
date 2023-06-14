import React from 'react';
import styles from '../../styles/participant/answerPage.module.css';

const AnswerPage = ({ isCorrect }) => {
  return (
    <div className={isCorrect ? styles.correctAnswer : styles.wrongAnswer}>
      <div className={styles.answerLabelRow}>
        {isCorrect ? 'Poprawna odpowiedź' : 'Zła odpowiedź'}
      </div>
      <div className={styles.answerLabelRow}>{isCorrect ? ':)' : ':('}</div>
      <div className={styles.waitingLabelRow}>
        Oczekiwanie na następne pytanie...
      </div>
    </div>
  );
};

export default AnswerPage;

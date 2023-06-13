import styles from '@/styles/participant/waitingForAnswers.module.css';
import React from 'react';
import { PulseLoader } from 'react-spinners';

const LoadingPage = () => {
  return (
    <div className="gradient-animation-1">
      <PulseLoader color="white" size={30} speedMultiplier={0.7} />
      <div className={[styles.answerLabel, styles.loadingLabel].join(' ')}>
        ŁADOWANIE
      </div>
    </div>
  );
};

export default LoadingPage;
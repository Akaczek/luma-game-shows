import React from 'react';
import styles from '../../styles/presenter/QuestionText.module.css';

const QuestionText = ({ questionText, time }) => {
  return (
    <div className={styles.questionTextContainer}>
      <div className={styles.timeContainer}>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
        />
        <span className="material-symbols-outlined">update</span>
        {time}
      </div>
      <h1 className={styles.questionText}>{questionText}</h1>
      <div className={styles.answerCountContainer}>liczba</div>
    </div>
  );
};

export default QuestionText;

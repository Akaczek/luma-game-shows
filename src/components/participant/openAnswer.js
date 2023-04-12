import styles from '../../styles/participant/openAnswer.module.css';
import React, { useState } from 'react';

const OpenAnswer = () => {
  const [answer, setAnswer] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Twoja odpowiedz to ' + e.target.openAnswerTextArea.value);
  };

  return (
    <form className={styles.openAnswerContainer} onSubmit={handleSubmit}>
      <label className={styles.openAnswerLabel} for="openAnswerTextArea">
        Wpisz odpowiedź:
      </label>
      <textarea
        className={styles.answerInput}
        id="openAnswerTextArea"
        name="openAnswerTextArea"
      ></textarea>
      <input type="submit" className={styles.openAnswerButton} />
    </form>
  );
};

export default OpenAnswer;

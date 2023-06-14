import styles from '../../styles/participant/openAnswer.module.css';
import React, { useState } from 'react';

const OpenAnswer = ({ sendAnswer }) => {
  const [answer, setAnswer] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // alert('Twoja odpowiedz to ' + e.target.openAnswerTextArea.value);
    sendAnswer(e.target.openAnswerTextArea.value);
    setAnswer('');
  };

  return (
    <form className={styles.openAnswerContainer} onSubmit={handleSubmit}>
      <label className={styles.openAnswerLabel} htmlFor="openAnswerTextArea">
        Wpisz odpowiedź:
      </label>
      <textarea
        className={styles.answerInput}
        id="openAnswerTextArea"
        name="openAnswerTextArea"
        value={answer}
        required
        onChange={(e) => setAnswer(e.target.value)}
      ></textarea>
      <input type="submit" className={styles.openAnswerButton} />
    </form>
  );
};

export default OpenAnswer;

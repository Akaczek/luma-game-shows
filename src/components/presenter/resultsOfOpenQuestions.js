import sharedStyles from '@/styles/presenter/sharedPresenterStyles.module.css';
import styles from '@/styles/presenter/user/resultsOfOpenQuestions.module.css';
import { useState } from 'react';

const ResultsOfOpenQuestions = ({handleSendAnswers, players}) => {
  const [correctAnswers, setCorrectAnswers] = useState([]);

  const toggleAnswer = (result) => {
    if (correctAnswers.includes(result.userSocketId)) {
      setCorrectAnswers(
        correctAnswers.filter((answer) => answer !== result.userSocketId)
      );
    } else {
      setCorrectAnswers([...correctAnswers, result.userSocketId]);
    }
    console.log(correctAnswers);
  };

  const results = Object.keys(players).map((player) => ({
    userNick: players[player].userName,
    answer: players[player].currentOpenAnswer,
    userSocketId: player,
  }));

  return (
    <div className={sharedStyles.pageContainer}>
      <h1 className={styles.questionText}>Treść pytania</h1>
      <div className={styles.answersContainer}>
        {results.map((result, index) => (
          <div
            key={index}
            className={`${styles.answerBox} ${
              correctAnswers.includes(result.userSocketId)
                ? styles.correctBackground
                : styles.wrongBackground
            }`}
          >
            <div className={styles.userInfo}>
              <span className={styles.userNick}>{result.userNick}</span>
              <label className="checkboxContainer">
                <input
                  type="checkbox"
                  className={styles.correctCheckbox}
                  value={result.correct}
                  onClick={() => toggleAnswer(result)}
                />
                <span className="checkmark"></span>
              </label>
            </div>
            <div className={styles.userAnswer}>{result.answer}</div>
          </div>
        ))}
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.nextQuestionButton} onClick={() => handleSendAnswers(correctAnswers)}>Następne pytanie</button>
      </div>
    </div>
  );
};

export default ResultsOfOpenQuestions;

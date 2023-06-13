import sharedStyles from '@/styles/presenter/sharedPresenterStyles.module.css';
import styles from '@/styles/presenter/user/resultsOfOpenQuestions.module.css';
import { useState } from 'react';

const results = [
  {
    userNick: 'user1',
    answer:
      'lorem5fsnfnsdnkjvnxdn ffdsgfds gf gs gh gfdsgrdfdgh gdsgt few5 1lorem5fsnfnsdnkjvnxdn ffdsgfds gf gs gh gfdsgrdfdgh gdsgt few5 1',
    userSocketId: '123',
  },
  {
    userNick: 'user2',
    answer: 'Odpowiedź 2',
    userSocketId: '4',
  },
  {
    userNick: 'user3',
    answer: 'Odpowiedź 3',
    userSocketId: '5',
  },
  {
    userNick: 'user4',
    answer: 'Odpowiedź 4',
    userSocketId: '6',
  },
  {
    userNick: 'user5',
    answer: 'Odpowiedź 5',
    userSocketId: '7',
  },
  {
    userNick: 'user6',
    answer: 'Odpowiedź 6',
    userSocketId: '8',
  },
  {
    userNick: 'user7',
    answer: 'Odpowiedź 7',
    userSocketId: '9',
  },
];

const ResultsOfOpenQuestions = ({}) => {
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
              <label class="checkboxContainer">
                <input
                  type="checkbox"
                  className={styles.correctCheckbox}
                  value={result.correct}
                  onClick={() => toggleAnswer(result)}
                />
                <span class="checkmark"></span>
              </label>
            </div>
            <div className={styles.userAnswer}>{result.answer}</div>
          </div>
        ))}
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.nextQuestionButton}>Następne pytanie</button>
      </div>
    </div>
  );
};

export default ResultsOfOpenQuestions;

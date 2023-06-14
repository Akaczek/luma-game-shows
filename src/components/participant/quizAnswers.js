import React from 'react';
import styles from '../../styles/participant/quizAnswers.module.css';

const QuizAnswers = ({ answerLetters, isAnswerBig, sendAnswer }) => {
  let cssClass = '';

  const onClickAnswer = (letter) => {
    if (letter === 'A') sendAnswer(1);
    else if (letter === 'B') sendAnswer(2);
    else if (letter === 'C') sendAnswer(3);
    else if (letter === 'D') sendAnswer(4);
  };

  console.log(answerLetters);

  return (
    <div className={styles.answersContainer}>
      {answerLetters.map((letter, index) => {
        cssClass = 'class' + index.toString();
        return (
          <div
            className={[
              letter !== 'empty'
                ? styles.answerButton
                : styles.answerButtonHidden,
              isAnswerBig ? styles.answerButtonBig : styles.answerButtonSmall,
            ].join(' ')}
            key={index}
          >
            <div
              className={[
                letter !== 'empty'
                  ? styles.buttonView
                  : styles.buttonViewHidden,
                styles[cssClass],
              ].join(' ')}
              onClick={() => onClickAnswer(letter)}
            >
              <span>{letter !== 'empty' ? letter : ''}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QuizAnswers;

import React from 'react';
import styles from '../../styles/presenter/quizTextAnswers.module.css';

const QuizTextAnswers = ({ answers }) => {
  let cssClass = '';

  const onClickAnswer = (letter) => {
    alert('kliknieto ' + letter);
  };

  //   isAnswerBig ? styles.answerButtonBig : styles.answerButtonSmall,

  return (
    <div className={styles.answersContainer}>
      {answers.map((answer, index) => {
        cssClass = 'class' + index.toString();
        return (
          <div
            className={[
              answer.letter !== 'empty'
                ? styles.answerButton
                : styles.answerButtonHidden,
              styles.answerButtonSmall,
            ].join(' ')}
            key={index}
          >
            <div
              className={[
                answer.letter !== 'empty'
                  ? styles.buttonView
                  : styles.buttonViewHidden,
                styles[cssClass],
              ].join(' ')}
              onClick={() => onClickAnswer(answer.letter)}
            >
              <span className={styles.letterSpan}>
                {answer.letter !== 'empty' ? answer.letter : ''}
              </span>
              <span className={styles.answerTextSpan}>
                {answer.letter !== 'empty' ? answer.text : ''}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QuizTextAnswers;

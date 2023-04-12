import styles from '../../styles/participant/quizAnswers.module.css';

const QuizAnswers = ({ answerLetters, isAnswerBig }) => {
  let cssClass = '';

  const onClickAnswer = (letter) => {
    alert('kliknieto ' + letter);
  };

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

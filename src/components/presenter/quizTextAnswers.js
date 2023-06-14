import React from 'react';
import styles from '../../styles/presenter/quizTextAnswers.module.css';
import Image from 'next/image';

const QuizTextAnswers = ({ questionObject, ifAnswerPage, correctAnswer }) => {
  //   isAnswerBig ? styles.answerButtonBig : styles.answerButtonSmall,
  const { collectionName, photo, id, question, yt_link } = questionObject;

  const answers = [
    { letter: 'A', text: questionObject?.answer_1 },
    { letter: 'B', text: questionObject?.answer_2 },
    { letter: 'C', text: questionObject?.answer_3 },
    { letter: 'D', text: questionObject?.answer_4 },
  ];

  return (
    <>
      {yt_link !== '' && yt_link && (
        <iframe
          className={styles.ytVideo}
          src={yt_link.replace('watch?v=', 'embed/') + '?autoplay=1'}
          allow="autoplay;"
          allowFullScreen={false}
        ></iframe>
      )}
      {photo !== '' && photo && (
        <img
          src={`http://127.0.0.1:8090/api/files/${collectionName}/${id}/${photo}`}
          alt="question image"
          width={'auto'}
          height={350}
          className={styles.questionImage}
        />
      )}
      <div className={styles.questionContainer}> {question} </div>
      {collectionName === 'quiz_question' && (
        <div className={styles.answersContainer}>
          {answers
            .filter((answer) => answer.text !== '')
            .map((answer, index) => {
              return (
                <div
                  key={index}
                  className={`${styles.singleAnswerContainer} ${
                    styles['class' + index.toString()]
                  } ${
                    ifAnswerPage && (correctAnswer - 1) === index
                      ? styles.classCorrect
                      : ''
                  }
                  ${
                    ifAnswerPage && (correctAnswer - 1) !== index
                      ? styles.classWrong
                      : ''
                  }`}
                >
                  <span className={styles.answerLabel}>{answer.letter}</span>
                  <span className={styles.answerText}>{answer.text}</span>
                </div>
              );
            })}
        </div>
      )}
    </>
  );
};

export default QuizTextAnswers;

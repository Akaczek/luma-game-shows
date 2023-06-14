import React from 'react';
import styles from '@/styles/presenter/user/gameQuestion.module.css';
import sharedStyles from '@/styles/presenter/sharedPresenterStyles.module.css';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../public/luma_logo.png';
import exitImageFile from '../../../public/exit.svg';
import QuizTextAnswers from '@/components/presenter/quizTextAnswers';
import { questionsTypes } from '@/utils/constants';

const PresenterQuestion = ({
  questionObject,
  ifAnswerPage,
  correctAnswer,
  handleNextQuestion,
}) => {
  return (
    <>
      <div className={styles.header}>
        <Image src={logo} alt="logo" className={styles.logo} />
        <Link href="/">
          <Image src={exitImageFile} alt="exit" className={styles.exitImage} />
        </Link>
      </div>
      <div className={styles.gameQuestionContainer}>
        <div className={styles.clockContainer}>
          {ifAnswerPage && (
            <>
              <span className="material-symbols-outlined biggerIcon">
                schedule
              </span>
              <span className={styles.clockTimeLeft}>
                {/*todo*/}
                25
              </span>
            </>
          )}
        </div>
        <div className={styles.questionTypeContainer}>
          <QuizTextAnswers
            questionObject={questionObject}
            ifAnswerPage={ifAnswerPage}
            correctAnswer={correctAnswer}
          />
        </div>
        <div className={styles.answersContainer}>
          {ifAnswerPage ? (
            <>
              <span className={styles.answeredLbl}>1/2 {/*todo*/}</span>
              <span className={styles.answeredTxt}>ODPOWIEDZI</span>
            </>
          ) : (
            <button
              className={sharedStyles.buttonStylesGreen}
              onClick={handleNextQuestion}
            >
              Dalej
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default PresenterQuestion;

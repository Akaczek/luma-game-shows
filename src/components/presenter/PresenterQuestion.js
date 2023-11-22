import React, {useState, useEffect} from 'react';
import styles from '@/styles/presenter/user/gameQuestion.module.css';
import sharedStyles from '@/styles/presenter/sharedPresenterStyles.module.css';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../public/woluma_logo.png';
import exitImageFile from '../../../public/exit.svg';
import QuizTextAnswers from '@/components/presenter/quizTextAnswers';
import useInterval from '@/utils/useInterval';
import { questionsTypes } from '@/utils/constants';

const PresenterQuestion = ({
  questionObject,
  ifAnswerPage,
  correctAnswer,
  handleNextQuestion,
  handleTimesUp,
  numberOfAnswers
}) => {
  const MAX_TIME = 60;
  const [time, setTime] = useState(0);

  useInterval(() => {
    if (ifAnswerPage) return;
    if (time < MAX_TIME) {
      setTime(time + 1);
    } else {
      setTime(0);
      handleTimesUp();
    }
  }, 1000);

  

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
          {!ifAnswerPage && (
            <>
              <span className="material-symbols-outlined biggerIcon">
                schedule
              </span>
              <span className={styles.clockTimeLeft}>
                {/*todo*/}
                {MAX_TIME - time}
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
            <button
              className={sharedStyles.buttonStylesGreen}
              onClick={() => {
                setTime(0);
                handleNextQuestion()
              }}
            >
              Dalej
            </button>
          ) : (
            <>
              <span className={styles.answeredLbl}>{numberOfAnswers}</span>
              <span className={styles.answeredTxt}>ODPOWIEDZI</span>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PresenterQuestion;

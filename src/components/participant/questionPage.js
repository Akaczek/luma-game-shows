import styles from '../../styles/participant/questionPage.module.css';
import QuizAnswers from '@/components/participant/quizAnswers';
import { createAnswerLetters, calculateAnswerHeight } from '@/utils/answers';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import exitImageFile from '../../../public/exit.svg';
import OpenAnswer from '@/components/participant/openAnswer';

const QuestionPage = ({
  answerType,
  questionText,
  sendAnswer,
  answersQuantity,
}) => {
  // const answersQuantity = 4;
  const answers = createAnswerLetters(answersQuantity);
  const isAnswerBig = calculateAnswerHeight(answersQuantity);
  return (
    <>
      <Link href="/" className={styles.exitImageLink}>
        <Image src={exitImageFile} alt="exit" className={styles.exitImage} />
      </Link>
      <div className={styles.questionPageContainer}>
        <div className={styles.question}>
          <div className={styles.questionText}>{questionText}</div>
        </div>
        {answerType === 'quiz_question' ? (
          <QuizAnswers
            answerLetters={answers}
            isAnswerBig={isAnswerBig}
            sendAnswer={sendAnswer}
          />
        ) : (
          <OpenAnswer sendAnswer={sendAnswer} />
        )}
      </div>
    </>
  );
};

export default QuestionPage;

import React from 'react';
import sharedStyles from '../../../../../../styles/presenter/sharedPresenterStyles.module.css';
import { useSingleUser } from '@/network/getData';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../../../../../public/luma_logo.png';
import styles from '../../../../../../styles/presenter/user/gameQuestion.module.css';
import exitImageFile from '../../../../../../../public/exit.svg';
import groupImageFile from '../../../../../../../public/group.svg';
import QuizTextAnswers from '@/components/presenter/quizTextAnswers';

const gameQuestion = () => {
  const question =
    'Jaki jest najwyższy szczyt na świecie? Jaki jest najwyższy szczyt na świecie? Jaki jest najwyższy szczyt na świecie? Jaki jest najwyższy';
  const answeredUsers = 5;
  const allUsers = 10;
  const timeLeft = 25;

  const questionType = 'text'; // photo / music / text
  const answersType = 'quiz'; // quiz / open

  const answers = [
    { letter: 'A', text: 'Mount Everest' },
    { letter: 'B', text: 'K2' },
    { letter: 'C', text: 'Kangczenjunga' },
    { letter: 'D', text: 'Lhotse' },
  ];

  return (
    <div className={sharedStyles.pageContainer}>
      <div className={styles.header}>
        <Image src={logo} alt="logo" className={styles.logo} />
        <Link href="/">
          <Image src={exitImageFile} alt="exit" className={styles.exitImage} />
        </Link>
      </div>
      <div className={styles.gameQuestionContainer}>
        <div className={styles.clockContainer}>
          <span class="material-symbols-outlined biggerIcon">schedule</span>
          {/* zegar */}
          <span className={styles.clockTimeLeft}>{timeLeft}</span>
        </div>
        <div className={styles.questionContainer}> {question} </div>
        <div className={styles.answersContainer}>
          <span className={styles.answeredLbl}>
            {answeredUsers}/{allUsers}
          </span>
          <span className={styles.answeredTxt}>ODPOWIEDZI</span>
        </div>
      </div>
      <div className={styles.gameAnswersContainer}>
        <QuizTextAnswers answers={answers} />
      </div>
    </div>
  );
};

export default gameQuestion;

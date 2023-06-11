import React from 'react';
import sharedStyles from '../../../styles/presenter/sharedPresenterStyles.module.css';
import QuestionText from '@/components/presenter/QuestionText';
import styles from '../../../styles/presenter/user/question.module.css';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../../public/luma_logo.png';
import exitImageFile from '../../../../public/exit.svg';

//TODO zmienic nazwe na [gameId]

const question = () => {
  const questionType = 'text';
  const answersType = 'test';

  const questionText =
    'Kto uciekł z sylwestra w roku 2021/2022 i kto go gonił?';

  const time = 25; //czas w sekundach

  return (
    <div className={sharedStyles.pageContainer}>
      <div className={styles.header}>
        <Image src={logo} alt="logo" className={styles.logo} />
        <Link href="/">
          <Image src={exitImageFile} alt="exit" className={styles.exitImage} />
        </Link>
      </div>

      {questionType === 'text' ? (
        <QuestionText questionText={questionText} time={time} />
      ) : (
        <div>pytanie ze zdjeciem / muzyka </div>
      )}
    </div>
  );
};

export default question;

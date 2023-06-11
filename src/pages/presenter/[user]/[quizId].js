import { useSingleUser, useUserQuizes } from '@/network/getData';
import React from 'react';
import sharedStyles from '../../../styles/presenter/sharedPresenterStyles.module.css';
import styles from '../../../styles/presenter/user/quizId.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getRandomInt } from '../../../utils/random';
import WaitingForUsers from '@/components/presenter/WaitingForUsers';

const userNames = [
  { name: 'Jan', id: 1 },
  { name: 'Kasia', id: 2 },
  { name: 'Marek', id: 3 },
  { name: 'Kuba', id: 4 },
  { name: 'Łukasz', id: 5 },
];

const RunQuiz = () => {
  const router = useRouter();
  const { quizId, user } = router.query;
  const [userObject, setUserObject] = useSingleUser(user);

  const handleRunQuiz = () => {
    console.log('start');
    //todo - get question number from db
    //todo - wyslac serwerowi ze rozpoczynamy gre
  };

  return (
    <div className={sharedStyles.pageContainer}>
      <WaitingForUsers quizId={quizId} user={userObject} handleRunQuiz={handleRunQuiz}/>
    </div>
  );
};

export default RunQuiz;

import { useSingleUser, useUserQuizes } from '@/network/getData';
import { useRouter } from 'next/router';
import sharedStyles from '../../../styles/presenter/sharedPresenterStyles.module.css';
import { isEmpty } from 'ramda';
import Image from 'next/image';
import logo from '../../../../public/woluma_logo.png';
import search from '../../../../public/search.svg';
import styles from '../../../styles/presenter/user/quizes.module.css';
import exitImageFile from '../../../../public/exit.svg';
import smileImageFile from '../../../../public/smile.svg';
import Link from 'next/link';
import Table from '@/components/presenter/Table';
import React, { useEffect, useState } from 'react';

const UserPage = () => {
  const router = useRouter();
  const { user } = router.query;
  const [userObject, setUserObject] = useSingleUser(user);
  const [userQuizes, setUserQuizes] = useUserQuizes(userObject.id);
  const [searchText, setSearchText] = useState('');

  const handleRunQuiz = (quizId) => {
    router.push(`/presenter/${userObject.username}/${quizId}`); //todo
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <div className={sharedStyles.pageContainer}>
      <div className={styles.header}>
        <button
          onClick={() =>
            router.push(`/presenter/${userObject.username}/createQuiz`)
          }
          className={styles.createQuizButton}
        >
          Stwórz nowy quiz
        </button>
        <Image src={logo} alt="logo" className={styles.logo} />
        <div className={styles.userSetupContainer}>
          <div className={styles.welcome}>
            <Image
              src={smileImageFile}
              alt="smile"
              className={styles.smileImage}
            />
            <span className={styles.welcomeText}>Witaj, {user}</span>
          </div>
          <Link href="/">
            <Image
              src={exitImageFile}
              alt="exit"
              className={styles.exitImage}
            />
          </Link>
        </div>
      </div>
      <div className={styles.searchQuizes}>
        <Image src={search} alt="wyszukaj" className={styles.searchIcon} />
        <input
          type="text"
          className={styles.searchInput}
          value={searchText}
          onChange={handleSearchChange}
          placeholder="Wyszukaj..."
        />
      </div>
      <div className={styles.quizContainer}>
        {!isEmpty(userQuizes) && (
          <Table
            quizes={userQuizes}
            runQuiz={handleRunQuiz}
            searchText={searchText}
          />
        )}
      </div>
    </div>
  );
};

export default UserPage;

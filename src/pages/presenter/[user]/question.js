import { useSingleUser, useUserQuizes } from '@/network/getData';
import React from 'react';
import sharedStyles from '../../../styles/presenter/sharedPresenterStyles.module.css';
import styles from '../../../styles/presenter/user/question.module.css';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../../public/luma_logo.png';
import exitImageFile from '../../../../public/exit.svg';
import groupImageFile from '../../../../public/group.svg';
import { useRouter } from 'next/router';

const question = () => {
  return (
    <div className={sharedStyles.pageContainer}>
      <h1>question</h1>
    </div>
  );
};

export default question;

import { fetchSingleUser } from '@/network/getData';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import logo from '../../../public/woluma_logo.png';
import styles from '../../styles/presenter/loginPage.module.css';
import sharedStyles from '../../styles/presenter/sharedPresenterStyles.module.css';

const Login = () => {
  const [userNick, setUserNick] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchSingleUser(userNick)
      .then((data) => {
        if (data) {
          router.push(`/presenter/${userNick}/quizes`);
        } else {
          alert('Nie ma takiego użytkownika');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={sharedStyles.pageContainer}>
      <Head>
        <title>WOLUMA - game shows</title>
      </Head>
      <Image src={logo} alt="exit" className={styles.logo} />
      <div className={styles.formBackground}>
        <form className={styles.joinForm} onSubmit={handleSubmit}>
          <div className={styles.labelInfo}>Zaloguj się</div>
          <label htmlFor="nick-input" className={styles.inputLabel}>
            LOGIN
          </label>
          <input
            type="text"
            id="nick-input"
            name="nick-input"
            className={styles.inputJoin}
            value={userNick}
            onChange={(e) => setUserNick(e.target.value)}
          />
          <input
            type="submit"
            className={styles.submitJoiningBtn}
            value="ZALOGUJ"
          />
          {/* <Link href="/presenter/register" className={styles.registerInfo}>
            Nie masz konta? Zarejestruj się.
          </Link> */}
          <div href="/presenter/register" className={styles.registerInfo}>
            Nie masz konta? Zarejestruj się.
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import sharedStyles from './../styles/presenter/sharedPresenterStyles.module.css';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/woluma_logo.png';

export default function Home() {
  return (
    <>
      <Head>
        <title>WOLUMA - game shows</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={sharedStyles.pageContainer}>
        <Image src={logo} alt="exit" className={styles.logo} />
        <div className={styles.boxesContainer}>
          <Link href="/participant/game" className={styles.linkBox}>
            <span className={styles.linkBoxTitle}>Jesteś uczestnikiem?</span>
            <span className={styles.linkBoxLink}>
              Kliknij tutaj, aby rozpocząć udział w teleturnieju!
            </span>
          </Link>
          <Link
            href="/presenter/login"
            className={`${styles.linkBox} ${styles.hiddenOnSmallScreen}`}
          >
            <span
              className={[styles.linkBoxTitle, styles.hiddenOnSmallScreen].join(
                ' '
              )}
            >
              Jesteś prezenterem?
            </span>
            <span
              className={[styles.linkBoxLink, styles.hiddenOnSmallScreen].join(
                ' '
              )}
            >
              Przejdź do logowania.
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}

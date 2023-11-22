import sharedStyles from '../../styles/presenter/sharedPresenterStyles.module.css';
import styles from '../../styles/presenter/loginPage.module.css';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../public/woluma_logo.png';
import { useState } from 'react';

const Register = () => {
  const submitJoining = () => {};
  const [gameCode, setGameCode] = useState('');
  const [userNick, setUserNick] = useState('');

  return (
    <div className={sharedStyles.pageContainer}>
      <Image src={logo} alt="exit" className={styles.logo} />
      <div className={styles.formBackground}>
        <form className={styles.joinForm} onSubmit={submitJoining}>
          <div className={styles.labelInfo}>Stwórz konto</div>
          <label htmlFor="nick-input" className={styles.inpuLabel}>
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
            value="ZAREJESTRUJ"
          />
          <Link href="/presenter/login" className={styles.registerInfo}>
            Masz już konto? Zaloguj się.
          </Link>
        </form>
      </div>
      <div className={styles.registerAdditionalInfo}>
        Zarejestrowani użytkownicy mogą tworzyć własne teleturnieje oraz
        przeprowadzać je wśród swoich znajomych. Dołącz!
      </div>
    </div>
  );
};

export default Register;

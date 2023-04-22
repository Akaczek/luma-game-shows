import { useSingleUser } from '@/network/getData';
import { useRouter } from 'next/router';
import sharedStyles from '../../../styles/presenter/sharedPresenterStyles.module.css';

const UserPage = () => {
  const router = useRouter();
  const { user } = router.query;
  const [userObject, setUserObject] = useSingleUser(user);

  console.log(user);

  return (
    <div className={sharedStyles.pageContainer}>
      <p>Elo</p>
    </div>
  );
};

export default UserPage;

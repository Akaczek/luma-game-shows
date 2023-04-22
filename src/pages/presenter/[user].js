import { useSingleUser, useUserQuizes } from '@/network/getData';
import { useRouter } from 'next/router';
import sharedStyles from '../../styles/presenter/sharedPresenterStyles.module.css';
import { isEmpty } from 'ramda';

const UserPage = () => {
  const router = useRouter();
  const { user } = router.query;
  const [userObject, setUserObject] = useSingleUser(user);
  const userQuizes = useUserQuizes(userObject.id);

  console.log(userQuizes);

  console.log(user);

  return (
    <div className={sharedStyles.pageContainer}>
      <p>Elo</p>
      {!isEmpty(userQuizes) && (
        <>
          <h2>Twoje quizy to:</h2>
          <ul>
            {userQuizes.items.map((quiz) => (
              <li key={quiz.id}>{quiz.name}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default UserPage;

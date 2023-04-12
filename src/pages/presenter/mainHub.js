import { useSingleUser, useUserQuizes } from '@/network/getData';

const MainHub = () => {
  const user = useSingleUser('Ukasz');
  const userQuizes = useUserQuizes(user.id);

  console.log(userQuizes);

  return (
    <>
      <p>Elo</p>
    </>
  );
};

export default MainHub;

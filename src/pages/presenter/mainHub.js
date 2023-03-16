import { databaseURL } from "@/network/urls";
import { getUser } from "@/network/getData";

export async function getServerSideProps() {
  const data = await getUser();

  return { props: { data } };
}

const MainHub = ({ data }) => {
  console.log(data);

  return (
    <>
      <p>Elo {data.items[0].username}</p>
    </>
  );
};

export default MainHub;

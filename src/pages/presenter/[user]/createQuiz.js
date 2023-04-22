import AddQuestionForm from '@/components/presenter/AddQuestionForm';
import { useSingleUser } from '@/network/getData';
import { addQuiz } from '@/network/postData';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { isEmpty } from 'ramda';
import { useState } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import logo from '../../../../public/luma_logo.png';
import sharedStyles from '../../../styles/presenter/sharedPresenterStyles.module.css';
import styles from '../../../styles/presenter/user/createQuiz.module.css';
import { questionsTypes } from '../../../utils/constants';

const UserPage = () => {
  const router = useRouter();
  const { user } = router.query;
  const [userObject, setUserObject] = useSingleUser(user);
  const [quizObject, setQuizObject] = useState({});
  const [questions, setQuestions] = useState([]);
  const [quizName, setQuizName] = useState('');
  const [questionType, setQuestionType] = useState(questionsTypes[0]);

  const quizMock = {
    collectionId: '66y533j8gxkn4jh',
    collectionName: 'quiz',
    created: '2023-04-12 08:07:29.676Z',
    id: '372aa5nmgxuuioe',
    name: 'Wieczorowy',
    updated: '2023-04-12 08:07:29.676Z',
    user: 'htr0nfhiitojqjt',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addQuiz(userObject.id, quizName).then((data) => {
      setQuizObject(data);
    });
  };

  const handleQuestionTypeChange = (e) => {
    setQuestionType(questionsTypes.find((type) => type.value === e.value));
  };

  return (
    <div className={sharedStyles.pageContainer}>
      <Image src={logo} alt="exit" className={styles.logo} />
      {!isEmpty(quizObject) ? (
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit} className={styles.inputForm}>
            <label htmlFor="quiz-name" className={styles.inputLabel}>
              Nazwa teleturnieju
            </label>
            <input
              type="text"
              id="quiz-name"
              name="quiz-name"
              value={quizName}
              className={styles.inputCreate}
              onChange={(e) => setQuizName(e.target.value)}
            />
            <input
              className={styles.submitCreateBtn}
              type="submit"
              value="Stwórz teleturniej"
            />
          </form>
        </div>
      ) : (
        <>
          <h2 className={styles.createQuizTitle}>Quiz został stworzony</h2>
          <div className={styles.changeQuestionContainer}>
            <Dropdown
              options={questionsTypes.map((type) => type.value)}
              onChange={handleQuestionTypeChange}
              value={questionType.value}
              placeholder="Wybierz typ pytania"
              controlClassName={styles.changeQuestionDropdown}
            />
          </div>
          <div className={styles.addQuestionFormContainer}>
            <AddQuestionForm quiz={quizMock} questionType={questionType} />
          </div>
        </>
      )}
    </div>
  );
};

export default UserPage;

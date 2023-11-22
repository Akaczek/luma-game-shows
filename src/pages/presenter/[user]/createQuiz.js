import AddQuestionForm from '@/components/presenter/AddQuestionForm';
import { useSingleUser } from '@/network/getData';
import { addQuiz } from '@/network/postData';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { isEmpty } from 'ramda';
import React, { useState } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import logo from '../../../../public/woluma_logo.png';
import sharedStyles from '../../../styles/presenter/sharedPresenterStyles.module.css';
import styles from '../../../styles/presenter/user/createQuiz.module.css';
import { questionsTypes } from '../../../utils/constants';
import { addQuestionToQuiz } from '@/network/postData';

const UserPage = () => {
  const router = useRouter();
  const { user } = router.query;
  const [userObject, setUserObject] = useSingleUser(user);
  const [quizObject, setQuizObject] = useState({});
  const [questions, setQuestions] = useState([]);
  const [quizName, setQuizName] = useState('');
  const [questionType, setQuestionType] = useState(questionsTypes[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addQuiz(userObject.id, quizName).then((data) => {
      setQuizObject(data);
    });
  };

  const handleClose = () => {
    router.replace(`/presenter/${user}/quizes`);
  };

  const handleQuestionTypeChange = (e) => {
    setQuestionType(questionsTypes.find((type) => type.value === e.value));
  };

  const handleAddQuestion = (formData, typeOfQuestion) => {
    const response = addQuestionToQuiz(formData, typeOfQuestion);
    setQuestions([...questions, response]);
  };

  return (
    <div className={sharedStyles.pageContainer}>
      <Image src={logo} alt="exit" className={styles.logo} />
      {isEmpty(quizObject) ? (
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
          <div className={styles.quizNameContainer}>
            <h2 className={styles.createQuizTitle}>{quizObject.name}</h2>
            <p className={styles.numberOfQuizes}>
              Pytań dodano: {questions.length}
            </p>
          </div>
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
            <AddQuestionForm
              quiz={quizObject}
              questionType={questionType}
              handleClose={handleClose}
              handleAddQuestion={handleAddQuestion}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default UserPage;

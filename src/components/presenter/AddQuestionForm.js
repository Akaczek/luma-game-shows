import { isEmpty } from 'ramda';
import styles from '../../styles/presenter/addQuestionForm.module.css';
import { useEffect, useState } from 'react';
import React from 'react';

const AddQuestionForm = ({
  quiz,
  questionType,
  handleClose,
  handleAddQuestion,
}) => {
  const [question, setQuestion] = useState('');
  const [answer_1, setAnswer_1] = useState('');
  const [answer_2, setAnswer_2] = useState('');
  const [answer_3, setAnswer_3] = useState('');
  const [answer_4, setAnswer_4] = useState('');
  const [maxAnswerValue, setMaxAnswerValue] = useState(2);
  const [realAnswerClose, setRealAnswerClose] = useState(0);
  const [realAnswerOpen, setRealAnswerOpen] = useState('');
  const [photo, setPhoto] = useState(null);
  const [yt_link, setYt_link] = useState('');
  const [updateState, setUpdateState] = useState(false);

  const isValuesEmpty = () => {
    if (questionType.isOpen) {
      if (questionType.isMusic) {
        return isEmpty(yt_link) || isEmpty(question) || isEmpty(realAnswerOpen);
      }
      return isEmpty(question) || isEmpty(realAnswerOpen);
    } else {
      return (
        isEmpty(question) ||
        isEmpty(answer_1) ||
        isEmpty(answer_2) ||
        realAnswerClose === 0 ||
        realAnswerClose > maxAnswerValue
      );
    }
  };

  const resetValues = () => {
    setQuestion('');
    setAnswer_1('');
    setAnswer_2('');
    setAnswer_3('');
    setAnswer_4('');
    setRealAnswerClose(0);
    setRealAnswerOpen('');
    setUpdateState(!updateState);
    setPhoto(null);
    setYt_link('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isValuesEmpty()) {
      alert('Wypełnij wszystkie wymagane pola');
      return;
    }

    const formData = new FormData();
    formData.append('quiz', quiz.id);
    formData.append('question', question);

    if (questionType.isOpen) {
      formData.append('real_answer', realAnswerOpen);
    } else {
      formData.append('answer_1', answer_1);
      formData.append('answer_2', answer_2);
      if (!isEmpty(answer_3)) {
        formData.append('answer_3', answer_3);
      }
      if (!isEmpty(answer_4)) {
        formData.append('answer_4', answer_4);
      }
      formData.append('real_answer', realAnswerClose.toString());
    }

    if (photo) {
      formData.append('photo', photo);
    }

    if (questionType.isMusic) {
      formData.append('yt_link', yt_link);
    }

    handleAddQuestion(formData, questionType.collection);
    resetValues();
  };

  useEffect(() => {
    const additionalAnswers = [answer_3, answer_4].filter(
      (answer) => !isEmpty(answer)
    ).length;

    setMaxAnswerValue(2 + additionalAnswers);
  }, [answer_3, answer_4]);

  return (
    <>
      <form className={styles.addQuestionForm} onSubmit={handleSubmit}>
        <label htmlFor="question" className={styles.inputLabel}>
          Treść pytania <sup>*</sup>
        </label>
        <input
          type="text"
          id="question"
          name="question"
          value={question}
          className={styles.inputValue}
          onChange={(e) => setQuestion(e.target.value)}
        />

        {questionType.isOpen ? (
          <>
            <label htmlFor="realAnswerOpen" className={styles.inputLabel}>
              Poprawna odpowiedź <sup>*</sup>
            </label>
            <input
              type="textarea"
              id="realAnswerOpen"
              name="realAnswerOpen"
              className={styles.inputValue}
              value={realAnswerOpen}
              onChange={(e) => setRealAnswerOpen(e.target.value)}
            />
          </>
        ) : (
          <>
            <label htmlFor="answer_1" className={styles.inputLabel}>
              Odpowiedź 1 <sup>*</sup>
            </label>
            <input
              type="text"
              id="answer_1"
              name="answer_1"
              value={answer_1}
              onChange={(e) => setAnswer_1(e.target.value)}
              className={styles.inputValue}
            />
            <label htmlFor="answer_2" className={styles.inputLabel}>
              Odpowiedź 2 <sup>*</sup>
            </label>
            <input
              type="text"
              id="answer_2"
              name="answer_2"
              value={answer_2}
              onChange={(e) => setAnswer_2(e.target.value)}
              className={styles.inputValue}
            />
            {answer_2 && (
              <>
                <label htmlFor="answer_3" className={styles.inputLabel}>
                  Odpowiedź 3
                </label>
                <input
                  type="text"
                  id="answer_3"
                  name="answer_3"
                  value={answer_3}
                  onChange={(e) => setAnswer_3(e.target.value)}
                  className={styles.inputValue}
                />
              </>
            )}
            {answer_3 && (
              <>
                <label htmlFor="answer_4" className={styles.inputLabel}>
                  Odpowiedź 4
                </label>
                <input
                  type="text"
                  id="answer_4"
                  name="answer_4"
                  value={answer_4}
                  onChange={(e) => setAnswer_4(e.target.value)}
                  className={styles.inputValue}
                />
              </>
            )}
            <label htmlFor="realAnswerClose" className={styles.inputLabel}>
              Poprawna odpowiedź <sup>*</sup>
            </label>
            <input
              type="number"
              id="realAnswerClose"
              name="realAnswerClose"
              value={realAnswerClose}
              onChange={(e) => setRealAnswerClose(parseInt(e.target.value))}
              className={styles.inputValueNumber}
              min={1}
              max={maxAnswerValue}
            />
          </>
        )}

        {questionType.isMusic ? (
          <>
            <label htmlFor="yt_link" className={styles.inputLabel}>
              Link do filmu <sup>*</sup>
            </label>
            <input
              type="text"
              id="yt_link"
              name="yt_link"
              value={yt_link}
              onChange={(e) => setYt_link(e.target.value)}
              className={styles.inputValue}
            />
          </>
        ) : (
          <>
            <label htmlFor="image" className={styles.inputLabel}>
              Zdjęcie
            </label>
            <input
              key={updateState.toString()}
              type="file"
              accept=".jpg, .jpeg, .png"
              id="image"
              name="image"
              className={styles.inputValue}
              onChange={(e) => setPhoto(e.target.files[0])}
            />
          </>
        )}

        <input
          type="submit"
          className={styles.submitBtn}
          value="Dodaj pytanie"
        />
      </form>
      <button className={styles.closeBtn} onClick={handleClose}>
        Zakończ
      </button>
      <span className={styles.annotation}>
        <sup>*</sup>pola wymagane
      </span>
    </>
  );
};

export default AddQuestionForm;

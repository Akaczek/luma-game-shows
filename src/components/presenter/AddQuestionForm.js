import styles from '../../styles/presenter/addQuestionForm.module.css';
import { useState } from 'react';

const AddQuestionForm = ({ quiz, questionType }) => {
  const [question, setQuestion] = useState('');
  const [answer_1, setAnswer_1] = useState('');
  const [answer_2, setAnswer_2] = useState('');
  const [answer_3, setAnswer_3] = useState('');
  const [answer_4, setAnswer_4] = useState('');
  const [realAnswerClose, setRealAnswerClose] = useState(0);
  const [realAnswerOpen, setRealAnswerOpen] = useState('');
  const [photo, setPhoto] = useState(null);
  const [yt_link, setYt_link] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData);
  };

  return (
    <div>
      <form className={styles.addQuestionForm} onSubmit={handleSubmit}>
        <label htmlFor="question" className={styles.inputLabel}>
          Treść pytania
        </label>
        <input
          type="text"
          id="question"
          name="question"
          className={styles.inputValue}
        />

        {questionType.isOpen ? (
          <>
            <label htmlFor="realAnswerOpen" className={styles.inputLabel}>
              Poprawna odpowiedź
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
              Odpowiedź 1
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
              Odpowiedź 2
            </label>
            <input
              type="text"
              id="answer_2"
              name="answer_2"
              value={answer_2}
              onChange={(e) => setAnswer_2(e.target.value)}
              className={styles.inputValue}
            />
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
            <label htmlFor="realAnswerClose" className={styles.inputLabel}>
              Poprawna odpowiedź
            </label>
            <input
              type="number"
              id="realAnswerClose"
              name="realAnswerClose"
              value={realAnswerClose}
              onChange={(e) => setRealAnswerClose(e.target.value)}
              className={styles.inputValue}
              min={1}
              max={4}
            />
          </>
        )}

        {questionType.isImage && (
          <>
            <label htmlFor="image" className={styles.inputLabel}>
              Zdjęcie
            </label>
            <input
              type="file"
              accept=".jpg, .jpeg, .png"
              id="image"
              name="image"
              className={styles.inputValue}
            />
          </>
        )}

        {questionType.isMusic && (
          <>
            <label htmlFor="yt_link" className={styles.inputLabel}>
              Link do filmu
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
        )}

        <input
          type="submit"
          className={styles.submitBtn}
          value="Dodaj pytanie"
        />
      </form>
    </div>
  );
};

export default AddQuestionForm;

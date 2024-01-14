import styles from '../../styles/presenter/table.module.css';
import React from 'react';

const Table = ({ quizes, runQuiz, searchText }) => {
  const handleRunQuiz = (event) => {
    runQuiz(event.target.value);
    // console.log(event.target.value);
  };

  return (
    <table className={styles.quizesTable}>
      <thead>
        <tr className={styles.trHeader}>
          <th>Nazwa teleturnieju</th>
          <th>Data utworzenia</th>
          <th> </th>
        </tr>
      </thead>
      <tbody>
        {quizes
          .filter((quiz) =>
            quiz.name.toLowerCase().includes(searchText.toLowerCase())
          )
          .map((quiz) => (
            <tr key={quiz.id}>
              <td>{quiz.name}</td>
              <td>{quiz.created.substring(0, 10)}</td>
              <td className={styles.tdButton}>
                <button
                  className={styles.runButton}
                  value={quiz.id}
                  onClick={handleRunQuiz}
                >
                  Uruchom
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Table;

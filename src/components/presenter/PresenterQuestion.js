import React from "react";
import styles from '@/styles/presenter/user/gameQuestion.module.css';

const PresenterQuestion = ({question}) => {

  return (
    <>
      {question && <div className={styles.questionContainer}>{question.collectionName}</div>}
    </>
  )
}

export default PresenterQuestion;
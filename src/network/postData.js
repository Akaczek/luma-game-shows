export const addQuiz = (userId, quizName, setCallback) => {
  axios
    .post(`${databaseURL}collections/quiz/records`, {
      user: userId,
      name: quizName,
    })
    .then((response) => {
      setCallback(response.data);
    });
};

export const addQuestion = (quizId, formData, setCallback) => {
  axios
    .post(
      `${databaseURL}collections/quiz_question/records`,
      { ...formData, quiz: quizId },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    .then((response) => {
      setCallback(response.data);
    });
};

import axios from 'axios';
import { databaseURL } from './urls';

export const addQuiz = async (userId, quizName) => {
  const response = await axios.post(`${databaseURL}collections/quiz/records`, {
    user: userId,
    name: quizName,
  });

  return response.data;
};

export const addQuizQuestion = (quizId, formData, setCallback) => {
  axios
    .post(`${databaseURL}collections/quiz_question/records`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      setCallback(response.data);
    });
};

export const addOpenQuestion = (quizId, formData, setCallback) => {
  axios
    .post(
      `${databaseURL}collections/open_question/records`,
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

import axios from 'axios';
import { databaseURL } from './urls';

export const addQuiz = async (userId, quizName) => {
  const response = await axios.post(`${databaseURL}collections/quiz/records`, {
    user: userId,
    name: quizName,
  });

  return response.data;
};

export const addQuestionToQuiz = (formData, collectionType) => {
  axios
    .post(`${databaseURL}collections/${collectionType}/records`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      return response.data;
    });
};

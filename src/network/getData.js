import { databaseURL } from './urls';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios.get(`${databaseURL}collections/users/records`).then((response) => {
      setUsers(response.data);
    });
  }, []);

  return users;
};

export const useSingleUser = (username) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    if (username) {
      axios
        .get(
          `${databaseURL}collections/users/records?filter=(username="${username}")`
        )
        .then((response) => {
          setUser(response.data.items[0]);
        });
    }
  }, [username]);

  return [user, setUser];
};

export const fetchSingleUser = async (username) => {
  const response = await axios.get(
    `${databaseURL}collections/users/records?filter=(username="${username}")`
  );
  return response.data.items[0];
};

export const useUserQuizes = (userId) => {
  const [quizes, setQuizes] = useState({});
  useEffect(() => {
    axios
      .get(`${databaseURL}collections/quiz/records?filter=(user="${userId}")`)
      .then((response) => {
        setQuizes(response.data.items);
      });
  }, [userId]);

  return [quizes, setQuizes];
};

export const useQuizQuestions = (quizId) => {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    axios
      .get(
        `${databaseURL}collections/quiz_question/records?filter=(quiz="${quizId}")`
      )
      .then((response) => {
        setQuestions(response.data);
      });
  }, [quizId]);

  return questions;
};

import { useState } from 'react';
import React from 'react';
import { io } from 'socket.io-client';
import JoinPage from '@/components/participant/JoinPage';
import WaitingForStartPage from '@/components/participant/WaitingForStartPage';
import QuestionPage from '@/components/participant/questionPage';
import ResultsPage from '@/components/participant/resultsPage';
import AnswerPage from '@/components/participant/answerPage';
import { set } from 'ramda';
import LookAtPresenter from '@/components/participant/lookAtPresenter';
import WaitingForUsers from '@/components/presenter/WaitingForUsers';
import WaitingForAnswersPage from '@/components/participant/waitingForAnswersPage';

const gameState = {
  BEFORE_CONNECT: 'BEFORE_CONNECT',
  CONNECTED: 'CONNECTED',
  GAME_STARTED: 'GAME_STARTED',
  NEXT_QUESTION: 'NEXT_QUESTION',
  WAITING_FOR_OTHERS: 'WAITING_FOR_OTHERS',
  ANSWER: 'ANSWER',
  RESULTS: 'RESULTS',
  OPEN_RESULTS: 'OPEN_RESULTS',
  GAME_FINISHED: 'GAME_FINISHED',
};

const Game = () => {
  const [currentState, setCurrentState] = useState(gameState.BEFORE_CONNECT);
  const [userSocket, setUserSocket] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState({
    rank: null,
    score: null,
    questionQty: null,
    userName: null,
  });

  const connectToRoom = (gameCode, userName) => {
    const socket = io(`https://${gameCode}.ngrok-free.app`);
    // const socket = io(`http://localhost:8080`);

    socket.on('connect', () => {
      setCurrentState(gameState.CONNECTED);
      setUserSocket(socket);
      socket.emit('join', { type: 'player', userName: userName });
    });

    socket.on('game_started', () => {
      setCurrentState(gameState.GAME_STARTED);
      console.log('game_started');
    });

    socket.on('next_question', (question) => {
      console.log('next_question', question);
      setCurrentState(gameState.NEXT_QUESTION);
      let quantity = 4;
      if (question.collectionName === 'quiz_question') {
        if (question.answer_3 === '') quantity = 2;
        else if (question.answer_4 === '') quantity = 3;
      }
      setCurrentQuestion({ ...question, answersQuantity: quantity });
      setIsCorrect(false);
    });

    socket.on('open_answers_checked', () => {
      console.log('open_answers_checked');
      setCurrentState(gameState.OPEN_RESULTS);
    });

    socket.on('good_answer', () => {
      console.log('good_answer');
      setIsCorrect(true);
    });

    socket.on('close_answers_checked', (data) => {
      console.log('close_answers_checked', data);
      setCurrentState(gameState.RESULTS);
    });

    socket.on('game_finished', (message) => {
      console.log('game_finished', message);
      setScore({
        rank: message.rank,
        score: message.score,
        questionQty: message.questionQty,
        userName: message.userName,
      });
      setCurrentState(gameState.GAME_FINISHED);
      socket.disconnect();
    });

    socket.on('disconnect', () => {
      setUserSocket(null);
      console.log('disconnected');
    });

    socket.on('user_disconnected', (data) => {
      console.log('user_disconnected', data);
    });
  };

  const sendAnswer = (answer) => {
    userSocket.emit('answer', {
      answer: answer,
      questionId: currentQuestion.id,
    });

    setCurrentState(gameState.WAITING_FOR_OTHERS);
    console.log('waiting for others');
  };

  if (currentState === gameState.BEFORE_CONNECT) {
    return <JoinPage connectToRoom={connectToRoom} />;
  } else if (currentState === gameState.CONNECTED) {
    return <WaitingForStartPage />;
  } else if (currentState === gameState.NEXT_QUESTION) {
    return (
      <QuestionPage
        answerType={currentQuestion.collectionName}
        questionText={currentQuestion.question}
        answersQuantity={currentQuestion.answersQuantity}
        sendAnswer={sendAnswer}
      />
    );
  } else if (currentState === gameState.RESULTS) {
    return <AnswerPage isCorrect={isCorrect} />;
  } else if (currentState === gameState.OPEN_RESULTS) {
    return <LookAtPresenter />;
  } else if (currentState === gameState.WAITING_FOR_OTHERS) {
    return <WaitingForAnswersPage />;
  } else if (currentState === gameState.GAME_FINISHED) {
    return (
      <ResultsPage
        score={score.score}
        maxScore={score.questionQty}
        place={score.rank}
        userName={score.userName}
        joinAgain={() => {
          setCurrentState(gameState.BEFORE_CONNECT);
          // userSocket.disconnect();
        }}
      />
    );
  }
};

export default Game;

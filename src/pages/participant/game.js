import { useState } from 'react';
import React from 'react';
import { io } from 'socket.io-client';
import JoinPage from '@/components/participant/JoinPage';
import WaitingForStartPage from '@/components/participant/WaitingForStartPage';
import { extractNumber } from '@/utils/functions';
import QuestionPage from '@/components/participant/questionPage';
import ResultsPage from '@/components/participant/resultsPage';

const gameState = {
  BEFORE_CONNECT: 'BEFORE_CONNECT',
  CONNECTED: 'CONNECTED',
  GAME_STARTED: 'GAME_STARTED',
  NEXT_QUESTION: 'NEXT_QUESTION',
  GAME_FINISHED: 'GAME_FINISHED',
};

const Game = () => {
  const [currentState, setCurrentState] = useState(gameState.BEFORE_CONNECT);
  const [userSocket, setUserSocket] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  const score = 3; //todo - od serwera
  const maxScore = 5;
  const place = 2;

  const connectToRoom = (gameCode, userName) => {
    const numberToJoin = extractNumber(gameCode);
    const socket = io(`${numberToJoin[0]}.tcp.eu.ngrok.io:${numberToJoin[1]}`);

    socket.on('connect', () => {
      setCurrentState(gameState.CONNECTED);
      setUserSocket(socket);
      socket.emit('join', { type: 'player', userName: userName });
      console.log('connected');
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
      console.log('new next_question', {
        ...question,
        answersQuantity: quantity,
      });
    });

    socket.on('game_finished', () => {
      console.log('game_finished');
      // todo - get score, maxScore, place from server

      setCurrentState(gameState.GAME_FINISHED); //todo
      // setCurrentState(gameState.CONNECTED);
      //
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
  } else if (currentState === gameState.GAME_FINISHED) {
    return (
      <ResultsPage
        score={score}
        maxScore={maxScore}
        place={place}
        joinAgain={() => setCurrentState(gameState.BEFORE_CONNECT)}
      />
    );
  }
};

export default Game;

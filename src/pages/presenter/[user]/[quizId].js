import LoadingPage from '@/components/presenter/LoadingPage';
import PresenterQuestion from '@/components/presenter/PresenterQuestion';
import WaitingForUsers from '@/components/presenter/WaitingForUsers';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { io } from 'socket.io-client';
import sharedStyles from '../../../styles/presenter/sharedPresenterStyles.module.css';

const gameState = {
  BEFORE_CONNECT: 'BEFORE_CONNECT',
  CONNECTED: 'CONNECTED',
  GAME_STARTED: 'GAME_STARTED',
  NEXT_QUESTION: 'NEXT_QUESTION',
  SHOW_RESULTS: 'SHOW_RESULTS',
  GAME_FINISHED: 'GAME_FINISHED',
};

const RunQuiz = () => {
  const router = useRouter();
  const { quizId, user } = router.query;
  const [userSocket, setUserSocket] = useState(null);
  const [room, setRoom] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentState, setCurrentState] = useState(gameState.BEFORE_CONNECT);

  const connectToSocket = () => {
    const socket = io('http://localhost:8080');
    socket.on('connect', () => {
      setUserSocket(socket);
      socket.emit('join', { type: 'presenter', userName: user });
      setCurrentState(gameState.CONNECTED);
    });

    socket.on('user_disconnected', (room) => {
      setRoom(room);
    });

    socket.on('user_connected', (room) => {
      setRoom(room);
    });

    socket.on('game_started', () => {
      console.log('game_started');
      setCurrentState(gameState.GAME_STARTED);
    });

    socket.on('next_question', (question) => {
      console.log('next_question', question);
      setCurrentQuestion(question);
    });

    // todo - na koniec pytania i otrzymanie odpowiedxi prawidlowek, przejsc do PreasenterQuestion z tymi rzeczami,
    //state na game results
    // ifAnswerPage={ifAnswerPage}
    // correctAnswer={correctAnswer}
    // nextQuestion={nextQuestion} -> klikniecie nastepne pytanie, wyslac serwerowi ze nast pytanie

    socket.on('game_finished', () => {
      console.log('game_finished');
      socket.disconnect();
      router.replace(`/presenter/${user}/quizes`);
      setCurrentQuestion(null);
      //TODO: redirect to results page
    });
  };

  const handleExit = () => {
    userSocket.disconnect();
    setUserSocket(null);
    router.replace('/');
  };

  const handleRunQuiz = () => {
    userSocket.emit('start_game', quizId);
  };

  const componentToRender = () => {
    switch (currentState) {
      case gameState.BEFORE_CONNECT:
        return (
          <>
            <h1>Czy chcesz uruchomić ten quiz?</h1>
            <div className={sharedStyles.buttonsContainer}>
              <button
                className={sharedStyles.buttonStylesRed}
                onClick={() => {
                  router.replace(`/presenter/${user}/quizes`);
                }}
              >
                Powrót
              </button>
              <button
                className={sharedStyles.buttonStylesGreen}
                onClick={connectToSocket}
              >
                Uruchom
              </button>
            </div>
          </>
        );
      case gameState.CONNECTED:
        return (
          <WaitingForUsers
            users={room.players ?? []}
            handleRunQuiz={handleRunQuiz}
            handleExit={handleExit}
          />
        );
      case gameState.GAME_STARTED:
        if (currentQuestion) {
          //TODO - zmienic na next question
          return (
            <PresenterQuestion
              questionObject={currentQuestion}
              // ifAnswerPage={ifAnswerPage}
              // correctAnswer={correctAnswer}
              nextQuestion={() => {}}
            />
          );
        } else {
          return <LoadingPage />;
        }
      // TODO - dodac case na wyniki pytania i wywolac:
      // <PresenterQuestion
      //       questionObject={currentQuestion}
      //       ifAnswerPage={ifAnswerPage}
      //       correctAnswer={correctAnswer}
      //       nextQuestion={TODO}
      //     />
      //zmienic sta
      default:
        <h1>Niezany state</h1>;
    }
  };

  return (
    <>
      <Head>
        <title>Quiz</title>
      </Head>
      <div className={sharedStyles.pageContainer}>{componentToRender()}</div>
    </>
  );
};

export default RunQuiz;

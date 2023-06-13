import WaitingForUsers from '@/components/presenter/WaitingForUsers';
import PresenterQuestion from '@/components/presenter/PresenterQuestion';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import sharedStyles from '../../../styles/presenter/sharedPresenterStyles.module.css';



const RunQuiz = () => {
  const router = useRouter();
  const { quizId, user } = router.query;
  const [userSocket, setUserSocket] = useState(null);
  const [room, setRoom] = useState({});
  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  const connectToSocket = () => {
    const socket = io('http://localhost:8080');
    socket.on('connect', () => {
      setUserSocket(socket);
      socket.emit('join', { type: 'presenter', userName: user });
    });

    socket.on('user_disconnected', (room) => {
      setRoom(room);
    });

    socket.on('user_connected', (room) => {
      setRoom(room);
    });

    socket.on('game_started', () => {
      console.log('game_started');
      setGameStarted(true);
    });

    socket.on('next_question', (question) => {
      console.log('next_question', question);
      setCurrentQuestion(question);
    });

    socket.on('game_finished', () => {
      console.log('game_finished');
      setGameStarted(false);
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

  return (
    <>
      <Head>
        <title>Quiz</title>
      </Head>
      <div className={sharedStyles.pageContainer}>
        {userSocket
        ? gameStarted
          ? (
            <PresenterQuestion question={currentQuestion}/>
          )
          : (
            <WaitingForUsers
              users={room.players ?? []}
              handleRunQuiz={handleRunQuiz}
              handleExit={handleExit} />
          )
        : (
          <>
            <h1>Czy chcesz uruchomić ten quiz?</h1>
            <div className={sharedStyles.buttonsContainer}>
              <button className={sharedStyles.buttonStylesRed} onClick={() => {
                router.replace(`/presenter/${user}/quizes`);
              }}>Powrót</button>
              <button className={sharedStyles.buttonStylesGreen} onClick={connectToSocket}>Uruchom</button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default RunQuiz;

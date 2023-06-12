import WaitingForUsers from '@/components/presenter/WaitingForUsers';
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

  const connectToSocket = () => {
    const socket = io('http://localhost:8080');
    socket.on('connect', () => {
      setUserSocket(socket);
      socket.emit('join', { type: 'presenter', userName: user });
      console.log('connected');
    });

    socket.on('user_disconnected', (room) => {
      console.log('user_disconnected', room);
      setRoom(room);
    });

    socket.on('user_connected', (room) => {
      console.log('user_connected', room);
      setRoom(room);
    });

    socket.on('game_started', () => {
      console.log('game_started');
    });

    socket.on('next_question', (question) => {
      console.log('next_question', question);
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
            <h1>Quiz</h1>
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

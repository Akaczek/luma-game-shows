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

  };

  const handleExit = () => {
    userSocket.disconnect();
    setUserSocket(null);
    router.replace('/');
  };

  const handleRunQuiz = () => {
    console.log('start');
    //todo - get question number from db
    //todo - wyslac serwerowi ze rozpoczynamy gre
  };

  return (
    <>
      <Head>
        <title>Quiz</title>
      </Head>
      <div className={sharedStyles.pageContainer}>
        {userSocket
          ? (
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

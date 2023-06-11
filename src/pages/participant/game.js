import { useState } from 'react';
import React from 'react';
import { io } from 'socket.io-client';
import JoinPage from '@/components/participant/joinPage';
import WaitingForStartPage from '@/components/participant/waitingForStartPage';

const Game = () => {
  const [connected, setConnected] = useState(false);
  const [userSocket, setUserSocket] = useState(null);

  const extractNumber = (value) => {
    const number = value.match(/\d+/g).join('');
    console.log(number);
    return [number.slice(0, 1), number.slice(1)];
  };

  const connectToRoom = (gameCode, userName) => {
    const numberToJoin = extractNumber(gameCode);
    console.log(numberToJoin);
    const socket = io(`${numberToJoin[0]}.tcp.eu.ngrok.io:${numberToJoin[1]}`);

    socket.on('connect', () => {
      setConnected(true);
      setUserSocket(socket);
      socket.emit('join', { type: 'player', userName: userName });
      console.log('connected');
    });

    socket.on('disconnect', () => {
      setConnected(false);
      setUserSocket(null);
      console.log('disconnected');
    });

    socket.on('user_disconnected', (data) => {
      console.log('user_disconnected', data);
    });
  };

  return (
    <div>
      {connected
        ? <WaitingForStartPage />
        : <JoinPage connectToRoom={connectToRoom} />
      }
    </div>
  );
};

export default Game;

import { useState } from 'react';
import React from 'react';
import { io } from 'socket.io-client';

const TestSocket = () => {
  const [value, setValue] = useState('');
  const [connected, setConnected] = useState(false);
  const [socket, setSocket] = useState(null);

  const extractNumber = () => {
    const number = value.match(/\d+/g);
    console.log(number);
    return number;
  };

  const connectToSocket = () => {
    const socket = io('http://localhost:3001');
    socket.on('connect', () => {
      setConnected(true);
      setSocket(socket);
      socket.emit('join', { type: 'player' });
      console.log('connected');
    });

    socket.on('disconnect', () => {
      setConnected(false);
      console.log('disconnected');
    });

    socket.on('user_disconnected', (data) => {
      console.log('user_disconnected', data);
    });
  };

  const disconnectFromSocket = () => {
    socket.disconnect();
  };

  return (
    <div>
      <h1>Test socket</h1>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={extractNumber}>Extract number</button>
      {connected ? (
        <button onClick={disconnectFromSocket}>Disconnect from socket</button>
      ) : (
        <button onClick={connectToSocket}>Connect to socket</button>
      )}
    </div>
  );
};

export default TestSocket;

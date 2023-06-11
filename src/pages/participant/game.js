import { useState } from 'react';
import React from 'react';
import { io } from 'socket.io-client';

const TestSocket = () => {
  const [value, setValue] = useState('');
  const [connected, setConnected] = useState(false);
  const [socket, setSocket] = useState(null);
  const [numberToJoin, setNumberToJoin] = useState([])

  const extractNumber = () => {
    const number = value.match(/\d+/g).join('');
    console.log(number);
    setNumberToJoin([number.slice(0, 1), number.slice(1)]);
  };

  const connectToSocket = () => {
    const socket = io(`${numberToJoin[0]}.tcp.eu.ngrok.io:${numberToJoin[1]}`);
    socket.on('connect', () => {
      setConnected(true);
      setSocket(socket);
      socket.emit('join', { type: 'player', userName: 'test' });
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

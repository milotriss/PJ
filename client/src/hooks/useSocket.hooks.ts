import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

const socket = io('https://pj-ftt6.onrender.com');

const useSocket = () => {
  useEffect(() => {
    // return () => {
    //   socket.disconnect();
    // };
  }, []);
  return socket;
};

export default useSocket;
import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

const socket = io('http://localhost:9000');

const useSocket = () => {
  useEffect(() => {
    // return () => {
    //   socket.disconnect();
    // };
  }, []);
  return socket;
};

export default useSocket;
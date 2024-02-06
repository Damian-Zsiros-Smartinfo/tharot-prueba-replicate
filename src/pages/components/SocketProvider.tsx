import React, { useState, useEffect, useContext } from "react";
import io from "socket.io-client";

interface Props {
  children: React.ReactNode;
}

const SocketContext = React.createContext(null);

const SocketProvider = ({ children }: Props) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3500");

    const cleanup = () => {
      newSocket.disconnect();
    };

    return cleanup;
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;

export const useSocket = () => {
  return useContext(SocketContext);
};

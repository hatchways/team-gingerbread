import { useState, useEffect, useContext, createContext, FunctionComponent, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './useAuthContext';

interface ISocketContext {
  socket: Socket | undefined;
  initSocket: () => void;
  disconnect: () => void;
}

export const SocketContext = createContext<ISocketContext>({
  socket: undefined,
  initSocket: () => null,
  disconnect: () => null,
});

export const SocketProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  const { loggedInUser } = useAuth();

  const initSocket = useCallback(() => {
    if (loggedInUser && !socket) {
      setSocket(
        io('/', {
          withCredentials: true,
        }),
      );
    } else if (!loggedInUser && socket) {
      socket.disconnect();
    }
  }, [loggedInUser, socket]);

  const disconnect = useCallback(() => {
    if (socket) {
      socket.disconnect();
    }
  }, [socket]);

  useEffect(() => {
    initSocket();

    return () => {
      disconnect();
    };
  }, [initSocket, disconnect]);

  return <SocketContext.Provider value={{ socket, initSocket, disconnect }}>{children}</SocketContext.Provider>;
};

export function useSocket(): ISocketContext {
  return useContext(SocketContext);
}

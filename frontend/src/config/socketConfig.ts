import { Socket, io } from "socket.io-client";

interface ServerToClientEvents {
    testSocket: (a: number, b: string) => void;
  }
  
  interface ClientToServerEvents {
    testSocket: (a:string) => void;
  }

const URL = "http://localhost:8080";

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(URL, { autoConnect: false });

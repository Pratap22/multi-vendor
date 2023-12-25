import { useEffect, useState } from "react";
import { socket } from "../config/socketConfig";

const TestSocket = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  function connect() {
    socket.connect();
  }

  function disconnect() {
    socket.disconnect();
  }

  function onSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    setIsLoading(true);

    socket.emit("testSocket", value);
  }

  return (
    <div className="App">
      <p>State: {"" + isConnected}</p>
      <>
        <button onClick={connect}>Connect</button>
        <button onClick={disconnect}>Disconnect</button>
      </>
      <form onSubmit={onSubmit}>
        <input
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type a message"
        />

        <button type="submit" disabled={isLoading}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default TestSocket;

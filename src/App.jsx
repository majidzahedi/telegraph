import { useEffect, useState } from "react";
import io from "socket.io-client";
import clsx from "clsx";
import LeftPane from "./components/LeftPange";
import RightPane from "./components/RightPane";

import { FaHandshake, FaHandshakeSlash } from "react-icons/fa";

const socketUrl = import.meta.env.VITE_SOCKET_URL;
const socket = io(socketUrl);

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("pong", () => {
      setLastPong(new Date().toISOString());
    });

    socket.on("chat message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on("typing", (value) => {
      setTyping(value);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
      socket.off("chat message");
      socket.off("typing");
      socket.off("number of online users");
    };
  }, []);

  const sendMessage = (message) => {
    if (message.trim() !== "") {
      socket.emit("chat message", message);
    }
  };

  const isTypeing = (value) => {
    socket.emit("typing", value);
  };

  return (
    <div
      className="min-h-screen w-full select-none bg-gray-700 "
      draggable={false}
    >
      <div className="flex h-screen w-full justify-between">
        <div className="relative h-full w-full sm:w-1/2 md:w-1/2 lg:w-2/5 xl:w-1/5">
          <LeftPane />
          <div
            className={clsx(
              "absolute bottom-2 left-2 rounded-full p-2 leading-none text-white",
              isConnected ? "bg-green-500" : "bg-red-500"
            )}
          >
            {isConnected ? (
              <FaHandshake size="1.5rem" />
            ) : (
              <FaHandshakeSlash size="1.5rem" />
            )}
          </div>
        </div>
        <div className="relative hidden h-full bg-gray-500 sm:block sm:w-1/2 md:w-1/2 lg:w-3/5 xl:w-4/5">
          <RightPane
            sendMessage={sendMessage}
            messages={messages}
            isTypeing={isTypeing}
            someOneTyping={typing}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

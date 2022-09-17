import { useState, useEffect } from "react";
import clsx from "clsx";
import {
  FaPaperclip,
  FaLaugh,
  FaMicrophone,
  FaPaperPlane,
} from "react-icons/fa";
import { useLoaderData, useOutletContext } from "react-router-dom";

const RightPane = () => {
  const { messages, sendMessage, isTypeing, someOneTyping } =
    useOutletContext();
  const { roomInfo } = useLoaderData();
  const [message, setMessage] = useState("");
  const [typing, setTyping] = useState(false);

  const changeMsg = (e) => {
    setMessage(e.target.value);
  };

  const handleMessage = (e) => {
    e.preventDefault();
    sendMessage(message);
    setMessage("");
  };

  useEffect(() => {
    isTypeing(typing);
  }, [typing]);

  useEffect(() => {
    if (!!message && !typing) {
      setTyping(true);
    }
    const timer = setTimeout(() => {
      setTyping(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [message]);

  return (
    <>
      <div className="absolute top-0 h-[calc(100%-96px)] w-full ">
        <div className="to-0 absolute flex h-14 w-full  items-center space-x-4 bg-gray-700 px-2">
          <img
            draggable={false}
            src={`avatars/${roomInfo.name}.svg`}
            alt=""
            className={`h-10 w-10 rounded-full ring ${
              true ? "ring-green-500" : "ring-gray-500"
            }`}
          />
          <p className="text-lg text-base-100">{roomInfo.name}</p>
        </div>
        <div className="absolute bottom-2 grid w-full  grid-cols-1 justify-end space-y-2 px-4 py-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={clsx(
                "w-fit max-w-[40%] break-words rounded-xl bg-gray-700 py-2 px-4 text-white",
                !!(index % 2)
                  ? "justify-self-end rounded-r-none rounded-tr-xl"
                  : "justify-self-start rounded-l-none rounded-tl-xl"
              )}
            >
              <h1>{msg}</h1>
            </div>
          ))}
        </div>
      </div>
      <form
        onSubmit={handleMessage}
        className="absolute bottom-0 flex h-14 w-full items-center space-x-2 bg-gray-700 px-2"
      >
        <button type="button">
          <FaPaperclip size="1.5rem" className="text-gray-400" />
        </button>
        <input
          type="text"
          className="input input-ghost input-sm w-full"
          placeholder={
            someOneTyping ? "Some One Is Typing!!" : "Write a message..."
          }
          onChange={changeMsg}
          value={message}
        />
        <button type="button">
          <FaLaugh size="1.5rem" className="bg-inherit text-gray-400" />
        </button>
        <button type={!!message ? "button" : "submit"} onClick={handleMessage}>
          {!!message ? (
            <FaPaperPlane size="1.4rem" className="text-green-600" />
          ) : (
            <FaMicrophone size="1.5rem" className="text-gray-400" />
          )}
        </button>
      </form>
    </>
  );
};

export default RightPane;

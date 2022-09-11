import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { animated, useSpring } from "react-spring";

function App() {
  return (
    <div
      className="min-h-screen w-full select-none bg-gray-700 "
      draggable={false}
    >
      <div className="flex h-screen w-full justify-between">
        <div className="h-full w-full sm:w-1/2 md:w-1/2 lg:w-2/5 xl:w-1/5">
          <LeftPane />
        </div>
        <div className="hidden h-full bg-gray-500 sm:block sm:w-1/2 md:w-1/2 lg:w-3/5 xl:w-4/5"></div>
      </div>
    </div>
  );
}

const LeftPane = () => {
  function rippleEffect(event) {
    const btn = event.currentTarget;

    const circle = document.createElement("span");
    const diameter = Math.max(btn.clientWidth, btn.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - (btn.offsetLeft + radius)}px`;
    circle.style.top = `${event.clientY - (btn.offsetTop + radius)}px`;
    circle.classList.add("ripple");

    const ripple = btn.getElementsByClassName("ripple")[0];

    if (ripple) {
      ripple.remove();
    }

    btn.appendChild(circle);
  }

  const peoples = [
    {
      name: "Majid Zahedi",
      lastSeen: "Fri",
      msg: "How You Doin?",
      isOnline: true,
    },
    { name: "Ali Maski", lastSeen: "Mon", msg: "This is holesome!" },
    {
      name: "Mehdi Kermani",
      lastSeen: "8/29/22",
      msg: "i've been thinking about that whole day",
    },
    { name: "Ehsan Mahmoodian", lastSeen: "Sun", msg: "my name is Ehsan " },
    {
      name: "Hossain Hasan Zadeh",
      lastSeen: "Sat",
      msg: "please forgive me man",
    },
    { name: "Aref Mirza Ahmadi", lastSeen: "1:42 Pm", msg: "i Love you body" },
    { name: "Mehdi Farokhi", lastSeen: "9/4/22", msg: "go to hell" },
    { name: "Maryam Porghazi ", lastSeen: "Thu", msg: "End my pain" },
  ];
  return (
    <div className="grid grid-cols-1 gap-y-1 px-2 pt-4">
      <div className="flex items-center justify-around py-1 pb-4">
        <button>
          <FaBars size="1.5rem" className="mx-4 text-gray-400" />
        </button>
        <input
          type=""
          className="input input-sm w-full rounded-lg bg-gray-500 text-lg text-white placeholder:text-gray-400"
          placeholder="Search"
        />
      </div>

      {peoples.map((person, index) => (
        <div
          key={index}
          className="group relative flex items-center justify-between overflow-hidden rounded-xl px-1 py-0.5 transition-colors duration-100 ease-in hover:cursor-pointer hover:bg-gray-600"
          onClick={rippleEffect}
        >
          <div className="flex items-center space-x-4">
            <img
              draggable={false}
              src={`avatars/avatar (${index}).svg`}
              alt=""
              className={`h-16 w-16 rounded-full ring ${
                person?.isOnline ? "ring-green-500" : "ring-gray-500"
              }`}
            />
            <div className="flex flex-col justify-between">
              <h1 className="text-xl text-white">{person.name}</h1>
              <p className="text-base text-gray-400 line-clamp-1">
                {person.msg}
              </p>
            </div>
          </div>
          <div className="">
            <p className="text-gray-400">{person.lastSeen}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;

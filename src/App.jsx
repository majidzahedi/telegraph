import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { faker } from "@faker-js/faker";
import clsx from "clsx";

function App() {
  const isConnected = false;
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
              "absolute bottom-2 right-2 rounded-lg px-2 py-2 leading-none text-white",
              isConnected ? "bg-green-500" : "bg-red-500"
            )}
          >
            {isConnected ? "Connected" : "Connecting"}
            {!isConnected && (
              <span className="ml-4 h-1 w-1 animate-ping rounded-full bg-green-500" />
            )}
          </div>
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

  const peoples = Array.from(Array(8).keys()).map((index) => ({
    name: faker.name.fullName({ gender: "male" }),
    lastSeen: faker.date.weekday({ abbr: true }),
    msg: faker.lorem.lines(),
    isOnline: Math.random() < 0.5,
  }));

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

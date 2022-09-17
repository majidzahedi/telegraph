import { useState, useEffect } from "react";
import { FaBars, FaPlus } from "react-icons/fa";
import { faker } from "@faker-js/faker";
import axios from "axios";
import useSWR from "swr";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";

const LeftPane = () => {
  const [modal, setModal] = useState(false);
  const [peoples, setPeoples] = useState([]);
  const navigate = useNavigate();
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR("http://localhost:3000/rooms", fetcher);

  async function createRoom() {
    const res = await axios.post("http://localhost:3000/createRoom", {
      name: "retarded",
    });
    console.log(res);
  }

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

  useEffect(() => {
    console.log(data);
    if (data) {
      setPeoples(
        data.map(({ id, name }) => ({
          name: name,
          lastSeen: faker.date.weekday({ abbr: true }),
          msg: faker.lorem.lines(),
          isOnline: Math.random() < 0.5,
          id,
        }))
      );
    }
  }, [data]);

  return (
    <div className="scrollbar relative h-full overflow-y-scroll">
      <button
        onClick={createRoom}
        className=" absolute bottom-2 right-2 rounded-full bg-green-500 p-2 text-white"
      >
        <FaPlus size="1.5rem" className="" />
      </button>
      <div className="grid grid-cols-1 gap-y-1  px-2 pt-4">
        <div className="sticky flex items-center justify-around py-1 pb-4">
          <button
            className="btn btn-ghost  btn-circle"
            onClick={() => setModal(true)}
          >
            <FaBars size="1.5rem" className="text-gray-400" />
            <Modal isOpen={modal} setIsOpen={setModal} />
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
            onClick={(e) => {
              rippleEffect;
              navigate(`/${person.id}`);
            }}
          >
            <div className="flex items-center space-x-4">
              <img
                draggable={false}
                src={`avatars/${person.name}.svg`}
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
    </div>
  );
};

export default LeftPane;

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Login from "./components/Login";
import RightPane from "./components/RightPane";
// import SocketProvider from "./context/SocketProvider";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: ":roomId",
        element: <RightPane />,
        loader: async ({ params }) => {
          const res = await axios.get(
            `http://localhost:3000/room/${params.roomId}`
          );
          return { roomInfo: res.data };
        },
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

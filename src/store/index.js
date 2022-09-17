import create from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";
import io from "socket.io-client";
const appName = import.meta.env.VITE_APP_NAME;
const socketUrl = import.meta.env.VITE_SOCKET_URL;

const store = create(
  subscribeWithSelector(
    persist(
      (set) => ({
        token: "",
        socket: undefined,
        setToken: (token) => set((state) => ({ ...state, token })),
        setSocket: (socket) => set((state) => ({ ...state, socket })),
      }),
      {
        name: `${appName}_token`,
        partialize: (state) => ({ token: state.token }),
      }
    )
  )
);

store.subscribe(
  (state) => state.token,
  (state) => {
    const { setState } = store;
    const newSocket = io(socketUrl, { query: { token: state } });
    setState((state) => ({ ...state, socket: newSocket }));
    return () => newSocket.close();
  },
  { fireImmediately: store.getState("token") }
);

export default store;

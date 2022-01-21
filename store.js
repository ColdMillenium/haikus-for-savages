import create from 'zustand'
import {useEffect, useRef} from 'react';
import io from "socket.io-client";

const useStore = create((set,get) => ({
  username: "",
  socket: null,
  setSocket: (socket) => {
    socket.current = io("http://localhost:8000", {
      //socket.current = io("https://hfs-server.herokuapp.com", {
      reconnectionDelayMax: 10000,
      query: {
        auth: "123"
      }
    });
    socket.current.on("socketId", (id) => {
      console.log("my id is : " + id)
    })
    set({socket:socket});
  },
  setUsername: (username) => set({ username: username}),
  sayHi: () =>{
    const socket = get().socket
    socket.current.emit("hello", null);
    console.log(get().socket)
  }
}))

export default useStore;
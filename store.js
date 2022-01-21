import create from 'zustand'
import {useEffect, useRef} from 'react';
import io from "socket.io-client";

const useStore = create((set,get) => ({
  username: "",
  clientId: "",
  roomId: "",
  connected: false,
  socket: null,
  players: [],
  gamePhase: "LOBBY",
  joinRoomError: "",
  setSocket: (socket) => {
    socket.current = io("http://localhost:8000", {
      //socket.current = io("https://hfs-server.herokuapp.com", {
      reconnectionDelayMax: 10000,
      query: {
        auth: "123"
      }
    });
    socket.current.on("socketId", (id) => {
      console.log("my id is : " + id);
      set({
        connected: true,
        clientId: id
      });
    })
    socket.current.on("newRoom", roomId => {
      console.log(`roomId:${roomId} has been created in server`)
      get().joinRoom(roomId)
    });
    socket.current.on("joinedRoom", roomId => {
      console.log("You are now in room" + roomId);
      set({roomId});
    }),
    socket.current.on("joinRoomError", joinRoomError => set({joinRoomError}))
    socket.current.on("players", players => {
      console.log("Update to players in game")
      console.log(players);
      set({players})
    })
    set({socket:socket});
  },
  connect: (username) => set({ username: username}),
  makeRoom: () =>{
    const socket = get().socket;
    const username = get().username;
    const clientId = get().clientId;
    socket.current.emit("makeRoom");
    console.log(`${username}: ${clientId} is requesting to make a room`);
  },
  joinRoom: (roomId) => {
    const socket = get().socket;
    const username = get().username;
    const clientId = get().clientId;
    socket.current.emit("joinRoom", {
      username,
      roomId,
    })
    console.log(`${username}: ${clientId} is requesting to join a room ${roomId}`)
  }
}))

export default useStore;
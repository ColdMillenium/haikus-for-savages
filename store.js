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
  hostName: "",
  teamA: [],
  teamB: [],
  gamePhase: "LOBBY",
  joinRoomError: "",
  room: {},
  roomId: "",
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
    // socket.current.on("joinedRoom", roomId => {
    //   console.log("You are now in room" + roomId);
    //   set({roomId});
    // }),
    socket.current.on("joinRoomError", joinRoomError => set({joinRoomError}))
    socket.current.on("playerData", playerData => {
      const {players, hostName, teamA, teamB} = playerData;
      console.log("Update w/ Room Data")
      console.log(playerData);
      set({players, hostName, teamA, teamB});
    }),
    socket.current.on("gameStatus", room => {
      console.log(`roomId:${room.id} has update`)
      set({room, roomId:room.id});
    })
    socket.current.on("testRoom", room => {
      console.log(room);
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
  },
  playerReady: () =>{
    const socket = get().socket;
    const username = get().username;
    const clientId = get().clientId;
    const roomId = get().roomId;
    socket.current.emit("playerReady", {roomId})
    console.log(`${username}: ${clientId} is requesting to ready up for game ${roomId}`)
  },
  switchTeams: () =>{
    const socket = get().socket;
    const username = get().username;
    const clientId = get().clientId;
    const roomId = get().roomId;
    socket.current.emit("switchTeams")
    console.log(`${username}: ${clientId} is requesting to switch teams for game ${roomId}`)
  },
  startGame: () =>{
    const socket = get().socket;
    const username = get().username;
    const clientId = get().clientId;
    const roomId = get().roomId;
    socket.current.emit("startGame", {roomId})
    console.log(`${username}: ${clientId} is requesting to switch teams for game ${roomId}`)
  },
  playCard: (pile) =>{
    socket.current.emit("playCard", pile);
    console.log("client is playing card into " + pile + " pile");
  },
  getTestRoom: () =>{
    const socket = get().socket;
    socket.current.emit("getTestRoom");
  }
}))

export default useStore;
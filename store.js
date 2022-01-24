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
  connect: (username) => set({ username: username}),
  setSocket: (socket) => {
    socket.current = io("http://localhost:8000", {
      //socket.current = io("https://hfs-server.herokuapp.com", {
      reconnectionDelayMax: 10000,
      query: {
        auth: "123"
      }
    });
    set({socket:socket});


    // ---------------------------- ON SEVER EVENTS ---------------------------------------


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

    
  },


  // ---------------------------- CLIENT REQUESTS TO SERVER ---------------------------------------


  makeRoom: () =>{
    clientRequest(get, "makeRoom", {});
  },
  joinRoom: (roomId) => {
     const username = get().username;
    clientRequest(get, "joinRoom", {username, roomId}, ` ${roomId}`);
  },
  playerReady: () =>{
    playerRequest(get, "playerReady", {});
  },
  roleReady: () =>{

  },
  switchTeams: () =>{
    playerRequest(get, "switchTeams", {});
  },
  setMode: (mode) =>{
    playerRequest(get, "setMode", mode, `to ${mode}`);
  },
  startGame: () =>{
    playerRequest(get, "startGame", {});
  },
  playCard: (pile) =>{
    playerRequest(get, "playCard", pile, `into ${pile}`);
  },
}))

// ---------------------------- Heler Functions ---------------------------------------
const playerRequest = (get, event, data,  extra) =>{
  const roomId = get().roomId;
  extra = extra + `[Room ${roomId}]`;
  clientRequest(get, event, data, ` in [Room ${roomId}]`)
}

const clientRequest = (get, event, data, extra) =>{
  const socket = get().socket;
  const username = get().username;
  const clientId = get().clientId;
  let user = `${username}:${clientId}`;
  if(username == ""){
    user = clientId;
  }
  socket.current.emit(event, data)
  console.log(`[${user}] is requesting to "${event}". ${extra}`)
}

export default useStore;
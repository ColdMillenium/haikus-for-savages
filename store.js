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
  clientsTeam: null,
  clientsRole: "",
  currTeam: "",
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
      let clientsRole = get().clientsRole;
      let clientsTeam = get().clientsTeam;
      let currTeam = get().currTeam;

      if(room.inGame){
        if(room.mode == "TEAMS"){
          clientsTeam = findClientsTeam( get ,room);
          currTeam = findCurrTeam(get, room);
        }
        clientsRole = findClientsRole( get, room);
      }
      
      set({
        room, 
        roomId:room.id, 
        clientsTeam,
        clientsRole, 
        currTeam,
      });
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
    playerRequest(get, "roleReady", {});
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
  startTurn: () =>{
    playerRequest(get, "startTurn", {});
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
  const {socket, username, clientId} = get();
  let user = `${username}:${clientId}`;
  if(username == ""){
    user = clientId;
  }
  socket.current.emit(event, data)
  console.log(`[${user}] is requesting to "${event}". ${extra}`)
}

const findClientsTeam = ( get, room ) =>{
  const {clientId} = get();
  const {teamA, teamB} = room
  let clientTeam;
  if(teamHasPlayer(teamA, clientId)){
    clientTeam = "teamA";
  }else if(teamHasPlayer(teamB, clientId)){
    clientTeam = "teamB";
  }else{
    clientTeam = "Justice"
  }
  return clientTeam
}

const teamHasPlayer = (team, playerId) =>{
  return team.players.map(p=> p.id).includes(playerId);
}
const findCurrTeam = (get, room) =>{
  //if it has any player id from a team, it must be that team!
  const {teamA} = room;
  const teamAPlayer = teamA.players[0].id;
  let currTeam;
  if(teamHasPlayer(room.currTeam, teamAPlayer)){
    currTeam = "teamA";
  }else{
    currTeam = "teamB"
  }
  return currTeam;
}

const findClientsRole = (get, room) =>{
  const {speaker, audience, punisher, mode} = room;
  const clientId = get().clientId
  
  let role ="";
  if(clientId == speaker.id){
    role ="Speaker";
  }else if(punisher && punisher.id == clientId){
    role ="Punisher";
  }else if(
    audience && audience.id == clientId || 
    mode =="TEAMS" && findClientsTeam(get,room) == findCurrTeam(get,room)
  ){
    role ="Audience";
  }else{
    role = "";
  }
  return role;
}


export default useStore;
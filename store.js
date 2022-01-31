import create from 'zustand'
import {useEffect, useRef} from 'react';
import io from "socket.io-client";
import ACTION from './action';

const useStore = create((set,get) => ({
  ACTION,
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
  clientReady: false,
  readyToStart: false,
  currTeam: "",
  gameLogOpen: false,
  gameLog: [],
  disconnectedInGame: false,
  theme:{
    teamA:{
      primary: "red.600",
      secondary:"gray.50"
    },
    teamB:{
      primary: "blue.500",
      secondary:"gray.50"
    }, 
    default:{
      primary: "0d1935",
      secondary:"eaedf2"
    },
    status:{
      ready: "green.400",
      notReady: "red.600",
      error:"f40c00"
    },
  },
  connect: (username) => set({ username: username}),
  setSocket: (socket) => {
    socket.current = io(process.env.NEXT_PUBLIC_GAME_SERVER, {
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: Infinity,
        query: {
          auth: "123"
        }
    });
    set({socket:socket});


    // ---------------------------- ON SEVER EVENTS ---------------------------------------


    socket.current.on("socketId", (id) => {
      console.log(`Client <${id}> is connected to the server!`);
      if(get().disconnectedInGame){
        console.log(`Reconnecting to old Room...`);
        const room = clone(get().room);
        playerRequest(get, ACTION.RECONNECT_IN_GAME, {
          username: get().username,
          room
        })
      }
      set({
        connected: true,
        clientId: id
      });
    })

    socket.current.on("disconnect", (reason) => {
      console.log(`Client <${get().clientId}> is disconnected from the server...`);
      console.log("reason:", reason);
    
        // the disconnection was initiated by the server, you need to reconnect manually
        console.log(`Server Disconnected!`);
        if(get().room.id){
          console.log(`attempting to reconnect to room...`);
          set({disconnectedInGame: true})
        }
        // set({connected: fasle})
      
    })
    socket.current.on("reconnectedToRoom", () =>{
      console.log(`Client has been reconnected to room ${room.id}!`);
      set({disconnectedInGame: false})
    })

    socket.current.on("newRoom", roomId => {
      console.log(`room <${roomId}> has been created in server`)
      playerRequest(get, ACTION.JOIN_ROOM, {username: get().username, roomId});
    });

    socket.current.on("playerData", playerData => {
      const {players, hostName, teamA, teamB} = playerData;
      console.log(playerData);
      set({players, hostName, teamA, teamB});
    }),

    socket.current.on("gameStatus", room => {
      get().gameLog.push(room.lastGameLog);
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
      setClientReady(set,get);
      setReadyToStart(set,get)
    })
  },
  playerAction: (event, data) => playerRequest(get, event, data),
  toggleGameLog: () => {set({gameLogOpen:!get().gameLogOpen})}
}))

// ---------------------------- Heler Functions ---------------------------------------
const playerRequest = (get, event, data,  extra) =>{
  const roomId = get().roomId;
  extra = extra + `[Room ${roomId}]`;
  clientRequest(get, event, data, ` ${data} in [Room ${roomId}]`)
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

const setClientReady = (set, get) =>{
  const {clientsRole, room } = get()
  const {speakerReady, audienceReady, punisherReady} = room;
  if(clientsRole == "Speaker" && speakerReady ||
    clientsRole == "Audience" && audienceReady || 
    clientsRole == "Punisher" && punisherReady
  ){
    set({clientReady:true})
  }else{
    set({clientReady:false})
  }
};

const setReadyToStart = (set, get) =>{
  const {mode, room} = get();
  const {speakerReady, audienceReady, punisherReady} = room;

  let readyToStart = speakerReady && audienceReady;
  console.log(speakerReady, audienceReady, readyToStart);
  if(mode == "ROTATE"){
    readyToStart = speakerReady && audienceReady && punisherReady;
  }else if(mode == "TEAMS"){
    readyToStart = speakerReady && punisherReady
  }
  console.log(readyToStart);
  set({readyToStart});
}

const clone = (instance) => {
  return Object.assign(
    Object.create(
      // Set the prototype of the new object to the prototype of the instance.
      // Used to allow new object behave like class instance.
      Object.getPrototypeOf(instance),
    ),
    // Prevent shallow copies of nested structures like arrays, etc
    JSON.parse(JSON.stringify(instance)),
  );
}


export default useStore;
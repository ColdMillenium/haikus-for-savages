const ACTION = {
  JOIN_ROOM : "joinRoom",
  MAKE_ROOM : "makeRoom",
  PLAYER_READY : "playerReady",
  ROLE_READY : "roleReady",
  SWITCH_TEAMS :"switchTeams",
  SET_MODE : "setMode", 
  SET_MAX_ROUNDS: "setMaxRounds", 
  SET_MAX_TIME: "setMaxTime",
  SET_MAX_PLAYERS:"setMaxPlayers",
  TOGGLE_DECK: "toggleDeck",
  START_GAME : "startGame",
  START_TURN : "startTurn",
  PLAY_CARD : "playCard",
  END_TURN : "endTurn",
  ACCEPT_PUNISHMENT : "acceptPunishment",
  REJECT_PUNISHMENT : "rejectPunishment",
  EXECUTE_PUNISHMENT : "executePunishment",
  TO_LOBBY : "toLobby",
  RESTART : "restart",
  RECONNECT_IN_GAME : "reconnectInGame",
}

export default ACTION;


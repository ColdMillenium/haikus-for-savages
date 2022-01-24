import {useEffect, useRef, useState} from 'react';
import { useRouter } from 'next/router';
import {Text ,Button, Box, Flex} from '@chakra-ui/react'
import ModeRules from './ModeRules'
import useStore from '../store.js'

function Lobby() {
  
  const router = useRouter();
  const {hostName, players, teamA, teamB, mode, host, partySize} = useStore(store => store.room)
  
  const username = useStore(store => store.username);
  const clientId = useStore(store => store.clientId)
  const toggleReady = useStore(store => store.playerReady);
  const switchTeams = useStore(store => store.switchTeams);
  const startGame = useStore(store => store.startGame)
  const { roomId } = router.query;
  const [startHidden, setStartHidden] = useState(true);
  const [gameMode, setGameMode] = useState();
  const [gameModeDesc, setGameModeDesc] = useState();

  useEffect(() =>{
    if(clientId == host && players.filter(p => p.ready).length == players.length){
      if( (mode == "COOP" && partySize == 2) ||
      (mode == "ROTATE" && partySize == 3) ||
      (mode == "TEAMS" && partySize >= 4)
      ){
        setStartHidden(false);
        return;
      }
    }
    setStartHidden(true);
  },[players, mode, host])
  useEffect(() =>{
    if(mode == "COOP"){
      setGameMode("Co-Op Game (2 Players)")
      setGameModeDesc("Both players are on teh same team and switch off being the Poet, Paly with just the Poet Point Slate ")
    }else if(mode == "ROTATE"){
      setGameMode("Rotation Game(2 Players)")
    }else{

    }
    setStartHidden(true);
  },[mode])
  
  
  return <Box  p={5}>
    <Text fontSize="4xl">{hostName}'s Room</Text>
    Room ID: {roomId}
    <ModeRules mode={mode}/>
    <Text fontSize="4xl">Team A</Text>
    <Box pl = {5}>
      <PlayerList players = {teamA.players}/>
    </Box>
    <Text fontSize="4xl">Team B</Text>
    <Box pl = {5}>
      <PlayerList players = {teamB.players}/>
    </Box>

    <Button onClick={toggleReady} colorScheme="green"  m={5} mt={10}>Ready</Button>
    <Button onClick={switchTeams} colorScheme="gray" m={5} mt={10}>Switch Teams</Button>
    <StartButton hidden={startHidden} onClick={startGame} />
    
  </Box>;

}

const PlayerList = (props) => {
  const {players} = props
  const list = [];
  players.forEach(p =>{
    list.push(<Flex key={p.id}>
      <Text fontSize="xl" key={p.id} ml={5}>
        {p.username}
      </Text>
      <Text ml={1} fontSize="sm">{p.ready ? "[READY]" : "[NOT READY]"}</Text>
    </Flex>)
  })
  return list;
}

const StartButton = (props) =>{
  const {hidden, onClick} = props
  if(hidden){
    return null
  }else{
    return <>
      <Button 
        onClick={onClick}
        colorScheme="green"  
        m={5} 
        mt={10}
      >
        Start
      </Button>
    </>
  }
}

const TeamsDescription = (props) =>{

}


export default Lobby;
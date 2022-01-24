import {useEffect, useRef, useState} from 'react';
import { useRouter } from 'next/router';
import {Text ,Button, Box, Flex, Input, Select} from '@chakra-ui/react'
import ModeRules from './ModeRules'
import useStore from '../store.js'

function Lobby() {
  
  const router = useRouter();
  const {hostName, players, teamA, teamB, mode, host, partySize, maxTime, maxPlayers, maxRounds} = useStore(store => store.room)
  
  const username = useStore(store => store.username);
  const clientId = useStore(store => store.clientId)
  const toggleReady = useStore(store => store.playerReady);
  const switchTeams = useStore(store => store.switchTeams);
  const startGame = useStore(store => store.startGame)
  const setMode = useStore(store=> store.setMode);
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

  const onModeChange = (e) =>{
    setMode(e.target.value);
  }

  
  return <Box  p={5}>
    <Text fontSize="4xl" fontWeight="bold">{hostName}'s Room</Text>
    <Text>Room ID: {roomId}</Text>
    <Select value={mode} onChange={onModeChange} maxW={200}>
      <option value='COOP'>Co-Op (2)</option>
      <option value='ROTATE'>Rotation (3)</option>
      <option value='TEAMS'>Teams (4+)</option>
    </Select>
    
    <ModeRules mode={mode}/>
    <GameSetting field="Time Per Turn" value={maxTime}/>
    <GameSetting field="Rounds" value={maxRounds}/>
    <GameSetting field="Maximum Players" value={maxPlayers}/>
    
    {mode == 'TEAMS'? <>
      <Text fontSize="2xl" fontWeight="bold">Team A</Text>
      <Box pl = {5}>
        <PlayerList players = {teamA.players}/>
      </Box>
      <Text fontSize="2xl" fontWeight="bold">Team B</Text>
      <Box pl = {5}>
        <PlayerList players = {teamB.players}/>
      </Box>
    </>
    :
    <>
      <Text fontSize="2xl" fontWeight="bold">Players</Text>
      <Box pl = {5}>
        <PlayerList players = {players}/>
      </Box>
    </>
    }
    

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

const GameSetting = (props) =>{
  const {field, value, onChange, placeholder, width=50} = props;
  return <Flex m={2} ml={5} align="center" >
    <Text fontSize="xl" mr={3}>{field}:</Text>
    <Input 
      width = {width} 
      value={value} 
      fontSize="lg"  
      size="sm" 
      placeholder={placeholder} 
      onChange={onChange}
    />
  </Flex>
}

const TeamsDescription = (props) =>{

}


export default Lobby;
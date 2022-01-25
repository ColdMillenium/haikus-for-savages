import {useEffect, useRef, useState} from 'react';
import { useRouter } from 'next/router';
import {Text ,Button, Box, Flex, Input, Select, Spacer} from '@chakra-ui/react'
import ModeRules from '../ModeRules'
import useStore from '../../store.js'
import { Hide, Show } from '../Conditional';

function Lobby() {
  
  const router = useRouter();
  const {
    hostName, 
    players, 
    teamA, 
    teamB, 
    mode, 
    host, 
    partySize, 
    maxTime, 
    maxPlayers, 
    maxRounds
  } = useStore(store => store.room)
  
  const username = useStore(store => store.username);
  const clientId = useStore(store => store.clientId)
  const toggleReady = useStore(store => store.playerReady);
  const switchTeams = useStore(store => store.switchTeams);
  const startGame = useStore(store => store.startGame)
  const setMode = useStore(store=> store.setMode);
  const { roomId } = router.query;
  const [startHidden, setStartHidden] = useState(true);
  const [switchTeamsHidden, setSwitchTeamsHidden] = useState(true);

  useEffect(() =>{
    if(mode == "TEAMS"){
      setSwitchTeamsHidden(false);
    }else{
      setSwitchTeamsHidden(true);
    }
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

  const onModeChange = (e) =>{
    setMode(e.target.value);
  }
  
  const copyRoomId = () =>{
    navigator.clipboard.writeText(roomId);
  }
  console.log("room Teams", teamA, teamB);
  return <Box  p={5}>
    <Flex align="center">
      <Text fontSize="4xl" fontWeight="bold">{hostName}'s Room</Text> 
      <Spacer/>
      <Button mb={3} onClick={copyRoomId}>
        <div>Copy ID: </div>
        <div>{roomId}</div>
      </Button>
    </Flex>
    <Box  p={5}>
      <Flex align="center">
        <Text fontSize="lg">Mode: </Text>
        <Select value={mode} onChange={onModeChange} maxW={200}>
          <option value='COOP'>Co-Op (2)</option>
          <option value='ROTATE'>Rotation (3)</option>
          <option value='TEAMS'>Teams (4+)</option>
        </Select>
      </Flex>
    </Box>
    <ModeRules mode={mode}/>
    <GameSetting field="Time Per Turn" value={maxTime}/>
    <GameSetting field="Rounds" value={maxRounds}/>
    <GameSetting field="Maximum Players" value={maxPlayers}/>
    <Show when={mode == 'TEAMS'}>
      <PlayerList title="Team A" players={teamA.players}/>
      <PlayerList title="Team B" players={teamB.players}/>
    </Show>
    <Show when={mode != "TEAMS"}>
      <PlayerList title="Players" players={players}/>
    </Show>
    <Button onClick={toggleReady} colorScheme="green"  m={5} mt={10}>
      Ready
    </Button>
    <HiddenButton hidden={switchTeamsHidden} onClick={switchTeams}>
      Switch Teams
    </HiddenButton>
    <HiddenButton hidden={startHidden} onClick={startGame} colorScheme="red">
      Start Game
    </HiddenButton>
    
  </Box>;
}

const PlayerList = ({players, title}) => {
  console.log(title,players)
  const list = [];
  players.forEach(p =>{
    list.push(<Flex key={p.id} >
      <Flex>
        <Text 
          fontSize="xl" 
          key={p.id} 
          width = {200} 
          m={3} 
          ml={5} 
          p={3} 
          pl={5} 
          pr={5} 
          backgroundColor="#d5f1f2" 
          boxShadow="md"
          rounded={5}
          align="center"
        >
          {p.username}
        </Text>
      </Flex>
      <Text ml={1} fontSize="sm">{p.ready ? "[READY]" : "[NOT READY]"}</Text>
    </Flex>)
  })
  return <>
    <Text fontSize="2xl" fontWeight="bold">
      {title} ({players.length})
      </Text>
    <Box pl = {5}>
      {list}
    </Box>
  </>
}

const HiddenButton = (props) =>{
  const {hidden, children, onClick, ...rest} = props
    return <>
      <Hide when={hidden}>
        <Button 
          m={5} 
          mt={10}
          onClick={onClick}
          {...rest}
        >
          {children}
        </Button>
      </Hide>
    </>
  
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
export default Lobby;
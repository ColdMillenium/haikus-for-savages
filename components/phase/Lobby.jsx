import {useEffect, useRef, useState} from 'react';
import { useRouter } from 'next/router';
import {Text ,Button, Box, Flex, Input, Select, Spacer} from '@chakra-ui/react'
import ModeRules from '../ModeRules'
import useStore from '../../store.js'
import { Hide, Show } from '../Conditional';
import PlayerList from '../PlayerList';

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

  const {clientId, theme} = useStore(store => store)
  const toggleReady = useStore(store => () =>store.playerAction(store.ACTION.PLAYER_READY))
  const switchTeams = useStore(store => () =>store.playerAction(store.ACTION.SWITCH_TEAMS))
  const startGame = useStore(store => () =>store.playerAction(store.ACTION.START_GAME))
  const setMode = useStore(store => (mode) =>store.playerAction(store.ACTION.SET_MODE, mode))
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
  },[players, mode, host, partySize])

  const onModeChange = (e) =>{
    setMode(e.target.value);
  }
  
  const copyRoomId = () =>{
    navigator.clipboard.writeText(roomId);
  }
  return <Box  p={5} width="100%">
    <Flex align="center">
      <Text fontSize="4xl" fontWeight="bold">Lobby for {hostName}'s Room</Text> 
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
      <PlayerList 
        title="Team A" 
        players={teamA.players} 
        backgroundColor={theme.teamA.primary}
        color={theme.teamA.secondary}
      />
      <PlayerList 
        title="Team B" 
        players={teamB.players} 
        backgroundColor={theme.teamB.primary}
        color={theme.teamB.secondary}
      />
    </Show>
    <Show when={mode != "TEAMS"}>
      <PlayerList title="Players" players={players} />
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
import {useEffect, useRef, useState} from 'react';
import { useRouter } from 'next/router';
import {Text ,Button, Box, Flex, Input, Select, Spacer, Checkbox} from '@chakra-ui/react'
import ModeRules from '../ModeRules'
import useStore from '../../store.js'
import { Hide, Show } from '../Conditional';
import PlayerList from '../PlayerList';
import {CopyIcon} from '@chakra-ui/icons';

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
    maxRounds,
    decksUsed,
    deckTypes
  } = useStore(store => store.room)

  const {clientId, theme} = useStore(store => store)
  const toggleReady = useStore(store => () =>store.playerAction(store.ACTION.PLAYER_READY))
  const switchTeams = useStore(store => () =>store.playerAction(store.ACTION.SWITCH_TEAMS))
  const startGame = useStore(store => () =>store.playerAction(store.ACTION.START_GAME))
  const setMode = useStore(store => (mode) =>store.playerAction(store.ACTION.SET_MODE, mode))
  const toggleDeck = useStore(store => (deckType) =>store.playerAction(store.ACTION.TOGGLE_DECK, deckType))
  const setMaxTime = useStore(store => (time) =>store.playerAction(store.ACTION.SET_MAX_TIME, time))
  const setMaxPlayers = useStore(store => (playerCount) =>store.playerAction(store.ACTION.SET_MAX_PLAYERS, playerCount))
  const setMaxRounds = useStore(store => (rounds) =>store.playerAction(store.ACTION.SET_MAX_ROUNDS, rounds))
  const { roomId } = router.query;
  const [startHidden, setStartHidden] = useState(true);
  const [switchTeamsHidden, setSwitchTeamsHidden] = useState(true);
  const clientReady = players.filter(p => p.id == clientId)[0]?.ready;
  const everyoneReady = () =>{
    if(Object.keys(decksUsed).length == 0){
      return false;
    }
    return players.filter(p => p.ready).length == players.length;
  }
  useEffect(() =>{
    if(mode == "TEAMS"){
      setSwitchTeamsHidden(false);
    }else{
      setSwitchTeamsHidden(true);
    }
    if(clientId == host && everyoneReady()){
      if( (mode == "COOP" && partySize == 2) ||
      (mode == "ROTATE" && partySize == 3) ||
      (mode == "TEAMS" && partySize >= 4)
      ){
        setStartHidden(false);
        return;
      }
    }
    setStartHidden(true);
  },[players, mode, host, partySize, clientId, everyoneReady])

  const onModeChange = (e) =>{

    setMode(e.target.value);
  }
  
  const copyRoomId = () =>{
    const url = `${process.env.NEXT_PUBLIC_CLIENT_SITE}/JoinGame?roomId=${roomId}`;
    navigator.clipboard.writeText(url);;
  }
 
  return <Box  p={5} width="100%">
    <Flex align="center">
      <Text mr={3} fontSize="4xl" fontWeight="bold">Lobby for {hostName}{`'`}s Room</Text> 
      <Button size="sm" variant="outline" colorScheme="gray" mb={3} onClick={copyRoomId}>
        <div>Copy Link</div>
        <CopyIcon ml={2}/>
      </Button>
    </Flex>
    <Box  p={5}>
      <Flex align="center">
        <Text fontWeight="bold" fontSize="lg">Mode: </Text>
        <Select disabled={clientId!=host} value={mode} onChange={onModeChange} maxW={200} ml={2}>
          <option value='COOP'>Co-Op (2)</option>
          <option value='ROTATE'>Rotation (3)</option>
          <option value='TEAMS'>Teams (4+)</option>
        </Select>
      </Flex>
      <GameSetting 
        type="input"
        disabled={clientId!=host} 
        field="Time Per Turn" 
        value={maxTime/1000} 
        w={14} 
        onBlur={(e)=>{
          const val = e.target.value
          if( val!= "" && val != maxTime/1000){
            setMaxTime(val);
          }
        }}
      />
      <GameSetting 
        type="input"
        disabled={clientId!=host}
        field="Rounds" 
        value={maxRounds} 
        min = {1}
        onBlur={(e)=>{
          const val = e.target.value
          console.log(val,maxRounds);
          if( val>=1 && val!= "" && val != maxTime/1000){
            setMaxRounds(val);
          }
        }}
      />
      <Show when={mode == "TEAMS"}>
        <GameSetting 
          type="input"
          disabled={clientId!=host} 
          field="Maximum Players" 
          value={maxPlayers} 
          min = {players.length>4? players.length: 4}
          onBlur={(e)=>{
            const val = e.target.value
            const min = players.length>4? players.length: 4;
            if(val == maxPlayers){
              return;
            }
            if( val!= "" && val != maxTime/1000){
              setMaxPlayers(val);
            }
          }}
        />
      </Show>
      {Object.keys(deckTypes).map(deckType =>{
        return  <GameSetting 
          type="checkbox"
          disabled={clientId!=host} 
          value={decksUsed.includes(deckType)} 
          onChange={()=>toggleDeck(deckType)}
          key={deckType}
        >
          {deckType} Deck
        </GameSetting>
      })}
      <Show when={Object.keys(decksUsed).length ==0}>
        <Box mt={3}> 
          <Text color="red" fontWeight="bold"  as="i">
          *** Host must select at least one deck !***
          </Text>
        </Box>
        
      </Show>
     
    </Box>
    <ModeRules mode={mode}/>
    <Text ml={5} mt={5}>
      <Show when={everyoneReady()}>
        <i>Waiting on host to start game...</i>
      </Show>
      <Show when={!everyoneReady()}>
        <i>Waiting on all players to Ready...</i>
      </Show>
     
    </Text>
    <Button onClick={toggleReady} colorScheme={clientReady? "red" :"green"}  ml={5} w={120}>
      {clientReady? "Not Ready!":"Ready"}
    </Button>
    <HiddenButton hidden={switchTeamsHidden} onClick={switchTeams}>
      Switch Teams
    </HiddenButton>
    <HiddenButton hidden={startHidden} onClick={startGame} colorScheme="green">
      Start Game
    </HiddenButton>
    <Show when={mode == 'TEAMS'}>
      <Flex>
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
      </Flex>
      
    </Show>
    <Show when={mode != "TEAMS"}>
      <PlayerList title="Players" players={players} />
    </Show>
   
    
  </Box>;
}



const HiddenButton = (props) =>{
  const {hidden, children, onClick, ...rest} = props
    return <>
      <Hide when={hidden}>
        <Button 
          m={5} 
  
          onClick={onClick}
          {...rest}
        >
          {children}
        </Button>
      </Hide>
    </>
  
}

const GameSetting = (props) =>{
  const {type, field, min=0, value, onBlur, onChange, placeholder, width=50, ...rest} = props;
  const [inputValue, setInputValue] = useState(value);
  useEffect(()=>{
    if(inputValue == ""){
      setInputValue(0);
    }
  }, [setInputValue, inputValue])
  return <Flex mt={2} align="center" >
    <Show when={field}>
      <Text fontWeight="bold" fontSize="lg" mr={3}>{field}:</Text>
    </Show>
    <Show when={type == "input"}>
      <Input 
        width = {width} 
        value={inputValue} 
        fontSize="lg" 
        size="sm" 
        placeholder={placeholder}
        onBlur={e=>{
          const val = e.target.value;
          if(val==value){
            return;
          }
          if(val < min){
            setInputValue(min);
          }else{
            onBlur(e);
          }
        }} 
        onChange={(e) => {
          const val = e.target.value;
          if(val >=0 && val<1000){
            setInputValue(Number(val));
          }
        }}
        {...rest}
      />
    </Show>
    <Show when={type == "checkbox"}>
      <Checkbox isChecked={value} onChange={onChange} {...rest}>{props.children}</Checkbox>
    </Show>
    
  </Flex>
}
export default Lobby;
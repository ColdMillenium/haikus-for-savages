import React, {useEffect, useState} from 'react';
import {Show, Hide} from '../Conditional'
import TurnOrder from '../TurnOrder'
import {Text ,Button, Box, Flex, Input, Select, Spacer, Center, Icon} from '@chakra-ui/react'
import useStore from '../../store'
import ReadyIcon from './../ReadyIcon'
import {IoEarOutline, IoSkull} from 'react-icons/io5'
import {HiSpeakerphone} from 'react-icons/hi'
import {AiOutlineStop} from 'react-icons/ai'



function TurnTransition() {
  const {
    punisherReady,
    audienceReady,
    speakerReady,
    audience,
    punisher,
    speaker,
    mode,
    teamA,
    teamB,
    players
  } = useStore(store => store.room)
  const {
    username,
    currTeam,
    clientsRole,
    clientsTeam,
    theme,
  } = useStore(store => store);
  const roleReady = useStore(store => () =>store.playerAction(store.ACTION.ROLE_READY))
  const startTurn = useStore(store => () =>store.playerAction(store.ACTION.START_TURN))
  const [isYourTeamTurn, setIsYourTeamTurn] = useState(false);
  const [readyToStart, setReadyToStart] = useState(false);
  const [clientReady, setClientReady] = useState(false);

  

  
  //Is it your team's turn?
  useEffect(()=>{
    if(currTeam == clientsTeam){
      setIsYourTeamTurn(true)
    }else{
      setIsYourTeamTurn(false);
    }
  }, [currTeam, clientsTeam])
  
 
  //Are necessary players ready to start?
  useEffect(()=>{
    if(clientsRole == "Speaker" && speakerReady ||
      clientsRole == "Audience" && audienceReady || 
      clientsRole == "Punisher" && punisherReady
    ){
      setClientReady(true);
    }else{
      setClientReady(false);
    }
    if(mode == "COOP"){
      setReadyToStart(speakerReady && audienceReady);
    }else if(mode == "ROTATE"){
      setReadyToStart(speakerReady && audienceReady && punisherReady);
    }else{//TEAMS
      setReadyToStart(speakerReady && punisherReady);
    }
  }, [speakerReady, audienceReady, punisherReady, mode, clientsRole])

  const getTeamColor = () => {
    if(clientsTeam == "teamA"){
      return theme.teamA.primary
    }else if(clientsTeam == "teamB"){
      return theme.teamB.primary
    }
    return "#f7f7f7"
  }
  return <Box 
    h="100%" 
  >
    <Center h="100%" w="100%">
      <Flex align="center" justify="center" direction="column" boxShadow="md" p={5} rounded={5} width={350} h='fit-content'>
        {/* <Show when={mode == "TEAMS"}>
          <Text 
            fontSize="4xl" 
            mb={3} 
            fontWeight="bold" 
            color={currTeam == "teamA"? theme.teamA.primary: theme.teamB.primary}
          >
            {isYourTeamTurn? "Your Team's Turn": "Enemy Team's Turn"}
          </Text>
        </Show> */}

          <Text fontSize="2xl" fontWeight="bold">
            Next Turn
          </Text>
       
        <RoleDisplay 
          username={username}
          role={clientsRole} 
          mode={mode} 
          onClick={roleReady}
          backgroundColor={getTeamColor()}
          clientReady={clientReady}
          readyToStart={readyToStart}
        />
        <Hide when={readyToStart && clientsRole=="Speaker"}>
        <Box h='fit-content'>
          <ReadyStatuses 
            mode={mode} 
            teamA={teamA}
            teamB={teamB}
            currTeam={currTeam}
            clientsTeam={clientsTeam}
            speakerReady={speakerReady} 
            audienceReady={audienceReady} 
            punisherReady={punisherReady}
            audience={audience}
            punisher={punisher}
            speaker={speaker}
            allPlayers={players}
            clientsRole={clientsRole}
          />
          </Box>
        </Hide>
        <Show when={readyToStart && clientsRole=="Speaker"}>
          <Center h={50}>
            <Button  colorScheme="green" size='md' onClick={startTurn}>
              Start Turn!
            </Button>
          </Center>
        </Show>
      </Flex>
    </Center>
    <Show when={false}>
      <TurnOrder/>
    </Show>
  </Box>
}

const RoleDisplay = props =>{
  const {onClick, role, mode, backgroundColor, clientReady, readyToStart, username} = props;
  const color = mode == 'TEAMS'? "white" : "black"
  const hideButton =  mode == "TEAMS" && (role=="" || role=="Audience");

  return <>
    <Flex 
      boxShadow="inner" 
      direction="column" 
      align="center" p={5} 
      backgroundColor={backgroundColor} 
      rounded={5} 
      m={3}
      width={290}
    > 
      <Text align="center" color={color} fontSize="lg"><strong>{username}</strong>, You are the <strong>{role == ""? "Spectator": role}</strong></Text>
      <Center w={50} h={50} color="black" backgroundColor="white" rounded={100}>
        <Show when={role == "Audience"}>
          <Icon color={backgroundColor} w={10} h={20} as={IoEarOutline}/>
        </Show>
        <Show when={role == "Punisher"}>
          <Icon color={backgroundColor} w={10} h={20} as={IoSkull}/>
        </Show>
        <Show when={role == "Speaker"}>
          <Icon color={backgroundColor} w={10} h={20} as={HiSpeakerphone}/>
        </Show>
        <Show when={role == ""}>
          <Icon color={backgroundColor} w={10} h={20} as={AiOutlineStop}/>
        </Show>
      </Center>
      <Text color={color} fontSize="sm">
        <Show when={readyToStart}>Waiting for Speaker to start the turn...</Show>
        <Show when={clientReady && !readyToStart}>Waiting for other players to ready...</Show>
        <Show when={!hideButton && !clientReady}>When you{`'`}re ready to begin, click ready</Show>
        <Show when={hideButton}>Waiting on other players to ready up...</Show>
      </Text>
      <Hide when={hideButton}>
        <Button 
          mt={3} 
          colorScheme={clientReady? 'red':'green'} 
          size="sm"
          onClick={onClick}
        >
          {clientReady? "Not Ready!": "Ready!"}
        </Button>
      </Hide> 
    </Flex>
  </>

}

const ReadyStatuses = props =>{
  const {
    mode, 
    speakerReady, 
    audienceReady, 
    punisherReady, 
    audience, 
    speaker,
    punisher,
    teamA,
    teamB,
    allPlayers,
    currTeam,
    clientsTeam,
    clientsRole,
    
  } = props;
  const mr=2;
  const mb=1;
  const fontSize="sm";
  const fontWeight="light"
  const icons = {};
  console.log(teamA.players)
  console.log(currTeam);
  console.log(clientsTeam);
  console.log(clientsRole);
  const showStatuses = (players) =>{
    return players.map(p=> {
      let isSpeaker = speaker?.username == p.username;
      let isPunisher = punisher?.username == p.username;
      let isAudience = audience?.username == p.username;
      let isSpectator = false;
      if(mode == "TEAMS"){
        const team = ""
        if(teamA.players.map(i=>i.username).includes(p.username)){
          team = "teamA"
        }else if(teamB.players.map(i=>i.username).includes(p.username)){
          team = "teamB"
        }
        if(!isAudience && currTeam == team && !isSpeaker){
          isAudience = true;
        }
        if(!isAudience && !isPunisher && !isSpeaker){
          isSpectator = true;
        }
      }
    
      return <Flex>
        <Show when={isAudience }>
          <Icon as={IoEarOutline}/>
        </Show>
        <Show when={isPunisher}>
          <Icon as={IoSkull}/>
        </Show>
        <Show when={isSpeaker}>
          <Icon as={HiSpeakerphone}/>
        </Show>
        <Show when={isSpectator}>
          <Icon as={AiOutlineStop}/>
        </Show>
        <Text fontSize={fontSize} fontWeight={fontWeight} mr={mr} ml={2}>  
          {p.username}
        </Text>
        <Show when={audience?.username == p.username}>
          <ReadyIcon ready={audienceReady} />
        </Show>
        <Show when={punisher?.username == p.username}>
          <ReadyIcon ready={punisherReady} />
        </Show>
        <Show when={speaker?.username == p.username}>
          <ReadyIcon ready={speakerReady} />
        </Show>
      </Flex>
    })
  }
  return <>
    <Show when={mode=="TEAMS"}>
      <Flex width="250px" direction="row">
        <Flex  direction="column">
          <Text fontSize="md" fontWeight="bold">Team A</Text>
          {showStatuses(teamA.players)}
        </Flex>
        <Spacer/>
        <Flex  direction="column">
          <Text fontSize="md" fontWeight="bold">Team B</Text>
          {showStatuses(teamB.players)}
        </Flex>
      </Flex>
    </Show>
    <Show when={mode!="TEAMS"}>
      {showStatuses(allPlayers)}
    </Show>
  </>
    
  
}

export default TurnTransition;

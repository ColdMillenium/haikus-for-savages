import React, {useEffect, useState} from 'react';
import {Show, Hide} from '../Conditional'
import TurnOrder from '../TurnOrder'
import {Text ,Button, Box, Flex, Input, Select, Spacer, Center} from '@chakra-ui/react'
import useStore from '../../store'
import ReadyIcon from './../ReadyIcon'

function TurnTransition() {
  const {
    punisherReady,
    audienceReady,
    speakerReady,
    audience,
    punisher,
    speaker,
    mode,
  } = useStore(store => store.room)
  const {
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
      <Flex align="center" justify="center" direction="column" boxShadow="md" p={5} rounded={5} width={350} h={350}>
        <Show when={mode == "TEAMS"}>
          <Text 
            fontSize="4xl" 
            mb={3} 
            fontWeight="bold" 
            color={currTeam == "teamA"? theme.teamA.primary: theme.teamB.primary}
          >
            {isYourTeamTurn? "Your Team's Turn": "Enemy Team's Turn"}
          </Text>
        </Show>
        <Show when={mode != "TEAMS"}>
          <Text fontSize="2xl" fontWeight="bold">
            Next Turn
          </Text>
        </Show>
        <RoleDisplay 
          role={clientsRole} 
          mode={mode} 
          onClick={roleReady}
          backgroundColor={getTeamColor()}
          clientReady={clientReady}
          readyToStart={readyToStart}
        />
        <Hide when={readyToStart && clientsRole=="Speaker"}>
        <Box h={50}>
          <ReadyStatuses 
            mode={mode} 
            speakerReady={speakerReady} 
            audienceReady={audienceReady} 
            punisherReady={punisherReady}
            audience={audience}
            punisher={punisher}
            speaker={speaker}
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
  const {onClick, role, mode, backgroundColor, clientReady, readyToStart} = props;
  const color = mode == 'TEAMS'? "white" : "black"
  return <Hide when={ (role=="Audience" && mode == 'TEAMS') || role == ""}>
    <Flex 
      boxShadow="inner" 
      direction="column" 
      align="center" p={5} 
      backgroundColor={backgroundColor} 
      rounded={5} 
      m={3}
      width={290}
      > 
        <Text color={color} fontSize="lg">You are the <strong>{role}</strong></Text>
        <Text color={color} fontSize="sm">
          <Show when={readyToStart}>Waiting for Speaker to start the turn</Show>
          <Show when={clientReady && !readyToStart}>Waiting for other players to ready</Show>
          <Show when={!clientReady}>When you{`'`}re ready to begin, click ready</Show>
        </Text>
        <Button 
          mt={3} 
          colorScheme={clientReady? 'red':'green'} 
          size="sm"
          onClick={onClick}
        >

          {clientReady? "Not Ready!": "Ready!"}
        </Button>
    </Flex>
  </Hide>

}

const ReadyStatuses = props =>{
  const {
    mode, 
    speakerReady, 
    audienceReady, 
    punisherReady, 
    audience, 
    speaker,
    punisher
  } = props;
  const mr=2;
  const mb=1;
  const fontSize="sm";
  const fontWeight="bold"
  return <>
    <Flex mb={mb}>
      <Text fontSize={fontSize} fontWeight={fontWeight} mr={mr}>  
        Speaker ({speaker?.username})
      </Text>
      <ReadyIcon ready={speakerReady} />
    </Flex>
    <Hide when={mode == "TEAMS"}>
      <Flex>
        <Text fontSize={fontSize} fontWeight={fontWeight} mr={mr}>  
          Audience ({audience?.username})
        </Text>
        <ReadyIcon ready={audienceReady} />
      </Flex>
    </Hide>
    <Hide when={mode == "COOP"}>
      <Flex>
        <Text fontSize={fontSize} fontWeight={fontWeight} mr={mr}>  
          Punisher ({punisher?.username})
        </Text>
        <ReadyIcon ready={punisherReady} />
      </Flex>
    </Hide>
  </>
}

export default TurnTransition;

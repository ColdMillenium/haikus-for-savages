import React, {useEffect, useState} from 'react';
import {Show, Hide} from '../Conditional'
import TurnOrder from '../TurnOrder'
import {Text ,Button, Box, Flex, Input, Select, Spacer, Center} from '@chakra-ui/react'
import useStore from '../../store'

function TurnTransition() {
  const {
    punisherReady,
    audienceReady,
    speakerReady,
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
    if(mode == "COOP"){
      setReadyToStart(speakerReady && audienceReady);
    }else if(mode == "ROTATE"){
      setReadyToStart(speakerReady && audienceReady && punisherReady);
    }else{//TEAMS
      setReadyToStart(speakerReady && punisherReady);
    }
  }, [speakerReady, audienceReady, punisherReady, mode])

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
      <Flex align="center" justify="center" direction="column" boxShadow="md" p={5} rounded={5}>
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
        />
        <Hide when={readyToStart && clientsRole=="Speaker"}>
          <ReadyStatuses 
            mode={mode} 
            speakerReady={speakerReady} 
            audienceReady={audienceReady} 
            punisherReady={punisherReady}
          />
        </Hide>
        <Show when={readyToStart && clientsRole=="Speaker"}>
          <Button  colorScheme="red" size='md' onClick={startTurn}>
            Start Turn!
          </Button>
        </Show>
      </Flex>
    </Center>
    <Show when={mode == "TEAMS"}>
      <TurnOrder/>
    </Show>
  </Box>
}

const RoleDisplay = props =>{
  const {onClick, role, mode, backgroundColor} = props;
  const color = mode == 'TEAMS'? "white" : "black"
  return <Hide when={ (role=="Audience" && mode == 'TEAMS') || role == ""}>
    <Flex 
      boxShadow="inner" 
      direction="column" 
      align="center" p={5} 
      backgroundColor={backgroundColor} 
      rounded={5} 
      m={3}
      > 
        <Text color={color} fontSize="lg">You are the <strong>{role}</strong></Text>
        <Text color={color} fontSize="sm">When you{`'`}re ready to begin, click ready</Text>
        <Button 
          variant="outline"
          mt={3} 
          colorScheme="green" 
          backgroundColor="white"
          size="sm"
          onClick={onClick}
        >
          Ready!
        </Button>
    </Flex>
  </Hide>

}

const ReadyStatuses = props =>{
  const {mode, speakerReady, audienceReady, punisherReady} = props;
  return <>
    <Text fontSize="sm" fontWeight="bold">
      {speakerReady? "Speaker Ready" : "Speaker Not Ready"}
    </Text>
    <Hide when={mode == "TEAMS"}>
      <Text fontSize="sm" fontWeight="bold">
        {audienceReady? "Audience Ready" : "Audience Not Ready"}
      </Text>
    </Hide>
    <Hide when={mode == "COOP"}>
      <Text fontSize="sm" fontWeight="bold">
        {punisherReady? "Punisher Ready" : "Punisher Not Ready"}
      </Text>
    </Hide>
  </>
}

export default TurnTransition;

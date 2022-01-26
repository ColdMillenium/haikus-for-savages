import React, {useEffect, useState} from 'react';
import {Show, Hide} from '../Conditional'
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
      setReadyToStart(speakerReady && audienceReady);
    }
  }, [speakerReady, audienceReady, punisherReady])

  return <>
    <Center h="100vh" w="100vw">
      <Flex align="center" justify="center" direction="column">
        <Show when={mode == "TEAMS"}>
          <Text fontSize="4xl" mb={3} fontWeight="bold">
            {isYourTeamTurn? "Your Team's Turn": "Enemy Team's Turn"}
          </Text>
        </Show>
        <Show when={mode != "TEAMS"}>
          <Text fontSize="4xl" mb={3} fontWeight="bold">
            Next Turn
          </Text>
        </Show>
        <RoleDisplay role={clientsRole} onClick={roleReady}/>
        <ReadyStatuses 
          mode={mode} 
          speakerReady={speakerReady} 
          audienceReady={audienceReady} 
          punisherReady={punisherReady}
        />
        <ReadyButton readyToStart={readyToStart} clientsRole={clientsRole} onClick={startTurn}/>
      </Flex>
    </Center>;
  </>
}

const ReadyButton = ({clientsRole, readyToStart, onClick}) =>{
  return <Show when={readyToStart && clientsRole=="Speaker"}>
    <Button mt={5} size='lg' onClick={onClick}>
      Start Turn!
    </Button>
  </Show>
}

const RoleDisplay = props =>{
  const {onClick, role} = props;
  return <Show when={role!=""}>
    <Flex direction="column" align="center" p={5} backgroundColor="lightgrey" rounded={5} m={3}> 
      <Text fontSize="xl">You are the <strong>{role}</strong></Text>
      <Text fontSize="sm">When you're ready to begin, click ready</Text>
      <Button m={3}size="sm"onClick={onClick}>Ready!</Button>
    </Flex>
  </Show>

}

const ReadyStatuses = props =>{
  const {mode, speakerReady, audienceReady, punisherReady} = props;
  return <>
    <Text>
      {speakerReady? "Speaker Ready" : "Speaker Not Ready"}
    </Text>
    <Hide when={mode == "TEAMS"}>
      <Text>
        {audienceReady? "Audience Ready" : "Audience Not Ready"}
      </Text>
    </Hide>
    <Hide when={mode == "COOP"}>
      <Text>
        {punisherReady? "Punisher Ready" : "Punisher Not Ready"}
      </Text>
    </Hide>
  </>
}

export default TurnTransition;

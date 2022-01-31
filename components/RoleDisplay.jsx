import React from 'react';
import {Show, Hide} from './Conditional'
import {Text ,Button, Box, Flex, Input, Select, Spacer, Center, Icon} from '@chakra-ui/react'
import useStore from '../store'
import {AudienceIcon, SpeakerIcon, SpectatorIcon, PunisherIcon} from './MyIcons'

const RoleDisplay = props =>{
  const { mode,} = useStore(store => store.room)
  const {username, clientsRole, readyToStart, clientReady} = useStore(store => store);
  const roleReady = useStore(store => () =>store.playerAction(store.ACTION.ROLE_READY))
  const {backgroundColor} = props;
  const color = mode == 'TEAMS'? "white" : "black"
  const isSpectator =  mode == "TEAMS" && (clientsRole=="" || clientsRole=="Audience");
 
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
      <Title data={{username, color, clientsRole}} />
      <RoleIcon data={{backgroundColor, clientsRole}}/>
      <WaitingDetails data={{readyToStart,clientReady, color, isSpectator}}/>
      <StartButton data={{roleReady, isSpectator, clientReady}}/>
    </Flex>
  </>
}

const Title = (props) =>{
  const {username, color, clientsRole} = props.data
  return <Text align="center" color={color} fontSize="lg">
    <strong>
      {username}
    </strong>
    , You are the {" "}
    <strong>
      {clientsRole == ""? "Spectator": clientsRole}
    </strong>
  </Text>
}

const RoleIcon = (props) =>{
  const {backgroundColor, clientsRole} = props.data
  const iconList = {
    "" : SpectatorIcon,
    "Audience": AudienceIcon, 
    "Speaker" : SpeakerIcon,
    "Punisher":PunisherIcon
  }
  return <Center 
    w={50} 
    h={50} 
    color="black" 
    backgroundColor="white" 
    rounded={100}
  >
    <Icon
      w={10} 
      h={20} 
      color={backgroundColor} 
      as={iconList[clientsRole]}
    />
  </Center>
}

const WaitingDetails = (props) =>{
  const {readyToStart,clientReady, color, isSpectator} = props.data;
  
  return <Text color={color} fontSize="sm">
    <Show when={readyToStart}>Waiting for Speaker to start the turn...</Show>
    <Show when={clientReady && !readyToStart}>Waiting for other players to ready...</Show>
    <Show when={!isSpectator && !clientReady && !readyToStart}>When you{`'`}re ready to begin, click ready</Show>
    <Show when={isSpectator && !readyToStart}>Waiting on other players to ready up...</Show>
  </Text>
}
const StartButton = (props) =>{
  const {roleReady, isSpectator, clientReady} = props.data;
  return  <Hide when={isSpectator}>
    <Button 
      mt={3} 
      colorScheme={clientReady? 'red':'green'} 
      size="sm"
      onClick={roleReady}
    >
      {clientReady? "Not Ready!": "Ready!"}
    </Button>
  </Hide> 
}
export default RoleDisplay;

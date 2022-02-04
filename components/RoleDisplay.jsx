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
      <RoleDescription data={{clientsRole, color}}/>
      <ReadyButton data={{roleReady, isSpectator, clientReady}}/>
      <WaitingDetails data={{readyToStart,clientReady, color, isSpectator}}/>
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
const RoleDescription = (props) =>{
  const {clientsRole, color} = props.data
  const description = {
    "" : "It's the other team's turn. Turn off your mic off/be quiet and hope your team's punisher get's em good",
    "Audience": "It's your team's turn. Listen carefully to your speaker and guess the word or phrase to earn points!", 
    "Speaker" : "It's your team's turn. Speak carefully and give your teams clues to each word and/or phrase!",
    "Punisher": "It's the other team's turn. Listen carefully to their Speaker and punish them if they break any of the rules!"
  }
  return <Text p={2} mb={3} color={color} fontSize="sm" align="center">{description[clientsRole]}</Text> 
}

const WaitingDetails = (props) =>{
  const {readyToStart,clientReady, color, isSpectator} = props.data;
  
  return <Text color={color} fontSize="sm" as="i">
    <Show when={readyToStart}>Waiting for Speaker to start the turn...</Show>
    <Show when={clientReady && !readyToStart}>Waiting for other players to ready...</Show>
    <Show when={!isSpectator && !clientReady && !readyToStart}>When you{`'`}re ready to begin, click ready</Show>
    <Show when={isSpectator && !readyToStart}>Waiting on other players to ready up...</Show>
  </Text>
}
const ReadyButton = (props) =>{
  const {roleReady, isSpectator, clientReady} = props.data;
  return  <Hide when={isSpectator}>
    <Button 
      m={3} 
      colorScheme={clientReady? 'red':'green'} 
      size="sm"
      onClick={roleReady}
    >
      {clientReady? "Not Ready!": "Ready!"}
    </Button>
  </Hide> 
}
export default RoleDisplay;

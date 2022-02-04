import React, {useEffect, useState} from 'react';
import {Show, Hide} from './Conditional'
import TurnOrder from './TurnOrder'
import {Text ,Button, Box, Flex, Input, Select, Spacer, Center, Icon} from '@chakra-ui/react'
import useStore from '../store'
import ReadyIcon from './ReadyIcon'
import {AudienceIcon, SpeakerIcon, SpectatorIcon, PunisherIcon} from './MyIcons'

const ReadyStatuses = () =>{
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
    permanentPunisher,
    players: allPlayers
  } = useStore(store => store.room)
  const {currTeam, theme} = useStore(store => store);
 
  const listPlayerStatuses = (players) =>{
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
    
      return <Flex key={p.id}>
        <RoleIcon role={
          isSpeaker? "Speaker":
          isAudience?"Audience":
          isPunisher?"Punisher":
          "Spectator"
        }/>
        <Text fontSize="sm" fontWeight="light" mr={2} ml={2}>  
          {p.username}
        </Text>
        <ReadyStatus data ={{
          punisherReady,
          audienceReady,
          speakerReady,
          audience,
          punisher,
          speaker,
          username:p.username
        }}/>
      </Flex>
    })
  }

  return <Box h='fit-content'>
    <Show when={mode=="TEAMS"}>
      <Flex width="280px" direction="row">
        <Flex  direction="column">
          <Text fontSize="lg" fontWeight="bold" color={theme.teamA.primary}>Team A</Text>
          {listPlayerStatuses(teamA.players)}
        </Flex>
        <Spacer/>
        <Show when={permanentPunisher}>
          <Flex  align="center" justify="center" direction="column" border="2px solid" p={2} w={100}  rounded={5} backgroundColor="black">
            <Icon h={6} w={8} color="white" as={PunisherIcon} />
            <Text  color="white" align="center" fontSize="sm">{punisher.username}</Text>
            <ReadyIcon ready={punisherReady} />
          </Flex>
          <Spacer/>
        </Show>
        <Flex  direction="column">
          <Text fontSize="lg" fontWeight="bold" color={theme.teamB.primary}>Team B</Text>
          {listPlayerStatuses(teamB.players)}
        </Flex>
      </Flex>
    </Show>
    <Show when={mode!="TEAMS"}>
      {listPlayerStatuses(allPlayers)}
    </Show>
  </Box>
}

const RoleIcon = ({role}) =>{
  const iconList = {
    "Spectator" : SpectatorIcon,
    "Audience": AudienceIcon, 
    "Speaker" : SpeakerIcon,
    "Punisher":PunisherIcon
  }
  return <>
    <Icon as={iconList[role]}/>
  </>
}

const ReadyStatus = ({data}) =>{
  const {
    punisherReady,
    audienceReady,
    speakerReady,
    audience,
    punisher,
    speaker,
    username
  } = data;
  return <>
    <Show when={audience?.username == username}>
      <ReadyIcon ready={audienceReady} />
    </Show>
    <Show when={punisher?.username == username}>
      <ReadyIcon ready={punisherReady} />
    </Show>
    <Show when={speaker?.username == username}>
      <ReadyIcon ready={speakerReady} />
    </Show>
  </>
}

export default ReadyStatuses;

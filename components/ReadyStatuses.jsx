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
    
      return <Flex>
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
      <Flex width="250px" direction="row">
        <Flex  direction="column">
          <Text fontSize="lg" fontWeight="bold" color={theme.teamA.primary}>Team A</Text>
          {listPlayerStatuses(teamA.players)}
        </Flex>
        <Spacer/>
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

import React, {useEffect, useState} from 'react';
import Conditional from './Conditional'
import {Text ,Button, Box, Flex, Input, Select, Spacer, Center} from '@chakra-ui/react'
import useStore from '../store'

function TurnTransition() {
  const {
    punisher,
    speaker,
    audience,
    punisherReady,
    audienceReady,
    speakerReady,
    mode,
    currTeam,
    teamA,
    teamB,
  } = useStore(store => store.room)
  const {username, clientId, roleReady} = useStore(store => store);
  const [readyPromptHidden, setReadyPromptHidden] = useState(true);
  const [role, setRole ] = useState("");
  const [yourTeam, setYourTeam] = useState();
  const [isYourTeamTurn, setIsYourTeamTurn] = useState(false);
  const [value, setValue] = useState(false);

  //What's your team?
  useEffect(() =>{
    console.log("team A players", teamA.players)
    console.log("team B players", teamB.players)
    console.log("clientId", clientId);
    if(mode == "TEAMS"){
      if(teamA.players.map(p => p.id).includes(clientId)){
        console.log("You're on Team A!")
        setYourTeam(teamA);
      }else if(teamB.players.map(p => p.id).includes(clientId)){
        console.log("You're on Team B!")
        setYourTeam(teamB);
      }else{
        console.log(teamB.map(p => p.id))
        console.log("hey")
        console.log("punisher?")
      }
    }
  },[clientId, teamA, teamB])

  //Is it your team's turn?
  useEffect(()=>{
    if(currTeam.players.map(p => p.id).includes(clientId)){
      setIsYourTeamTurn(true)
    }else{
      setIsYourTeamTurn(false);
    }
  }, [currTeam, clientId])
  
  //What's your role if any?
  useEffect(()=>{
    if(username == speaker.username){
      setRole("Speaker")
    }else if(punisher && punisher.username == username){
      setRole("Punisher")
    }else if((audience && audience.username == username) || 
      (mode =="TEAMS" && isYourTeamTurn)){
        setRole("Audience");
    }else{
      setRole("");
    }
  }, [username, isYourTeamTurn, audience, speaker, punisher])
  
  return <>
    <Center h="100vh" w="100vw">
      <Flex align="center" justify="center" direction="column">
        <Text fontSize="4xl" mb={3} fontWeight="bold">
          {isYourTeamTurn? "Your Team's Turn": "Enemy Team's Turn"}
        </Text>
        <RoleDisplay role={role} onClick={roleReady}/>
        <ReadyStatuses 
          mode={mode} 
          speakerReady={speakerReady} 
          audienceReady={audienceReady} 
          punisherReady={punisherReady}
        />
        
      </Flex>
    </Center>;
  </>
}

const RoleDisplay = props =>{
  const {onClick, role} = props;
  return <Conditional condition={role!=""}>
    <Flex direction="column" align="center" p={5} backgroundColor="lightgrey" rounded={5} m={3}> 
      <Text fontSize="xl">You are the <strong>{role}</strong></Text>
      <Text fontSize="sm">When you're ready to begin, click ready</Text>
      <Button onClick={onClick}>Ready!</Button>
    </Flex>
  </Conditional>

}

const ReadyStatuses = props =>{
  const {mode, speakerReady, audienceReady, punisherReady} = props;
  const readyStatus = {
    speaker: <Text>[{speakerReady? "Speaker Ready" : "Speaker Not Ready"}]</Text>,
    audience: <Text>[{audienceReady? "Audience Ready" : "Audience Not Ready"}]</Text>,
    punisher: <Text>[{punisherReady? "Punisher Ready" : "Punisher Not Ready"}]</Text>,
  }
  if(mode == "COOP"){
    return <>
      {readyStatus.speaker}
      {readyStatus.audience}
    </>
  }else if(mode == "ROTATE"){
    return <>
      {readyStatus.speaker}
      {readyStatus.audience}
      {readyStatus.punisher}
    </>
  }else{//TEAMS
    return <>
      {readyStatus.speaker}
      {readyStatus.punisher}
    </>
  }
}

export default TurnTransition;

import React from 'react';
import {Text ,Button, Box, Flex} from '@chakra-ui/react'

function ModeRules(props) {
  const {mode} = props;
  let title = ""
  let description;
  if(mode == "COOP"){
    title = "2 Player Mode: Co-op"
    description = <CoopDescription/>
  }else if(mode == "ROTATE"){
    title = "3 Player Mode: Rotation"
    description = <RotationDescription/>
  }else{
    title = "4+ Player Mode: Teams"
    description = <TeamDescription/>
  }
  return <Box>
    <Text fontSize="3xl" fontWeight="bold"><bold>{title}</bold></Text>
    <RulesContainer>
      {description}
    </RulesContainer>
  </Box>
  return <div></div>;
}
const RulesContainer = (props) =>{
  return <Box p={5} maxW ={700}>{props.children}</Box>
}

const CoopDescription = (props) =>{
  return <>
    <Text>Both players are on the same team and switch off being the Speaker. 
      After each player has been the Speaker three times, your score will be totaled</Text>
    <Box p={3}>
      <ul>
        <li><strong>10 points or less:</strong> This Team is Bad</li>
        <li><strong>11-30 points:</strong> Team is So-So At Make Words</li>
        <li><strong>31-49 points:</strong> Team Have Much Big Brain</li>
        <li><strong>50+ points or more:</strong> A Stunning Evolutionary Exemplar</li>
      </ul>
    </Box>
    
  </>
}

const RotationDescription = (props) =>{
  return <>
  <Text>Players rotate the three roles: Speaker, Punisher, and Audience. 
    The Speaker and the Audience earn points as normal. 
    At the end of the round, the Speaker and the Audiance add up points they've earned 
    (they each earn the same number of points in a round). Each turn the roles will rotate.
    After each player has been teh Speaker three times, the player with the most poihnts wins.
  </Text>
  </>
}
const TeamDescription = (props) =>{
  return <>
  <Text>This is the standard mode the game. Players will take turns being speaker alternating from one team to the other.
    The player who would be the speaker next turn will be the punisher for the current turn. Once you go through 3 rounds 
    or everyone has been a Speaker 3 times, the team with the most points wins. 
  </Text>
  <Text><strong>Note:</strong> If the teams are uneven, one player from
    the team with the extra player will be randomly chosen to a <strong>permanent</strong>  punisher, dealing swift unbiased judgements on all
     who utter words incorrectly.</Text>
  </>
}
export default ModeRules;

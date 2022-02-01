import React from 'react';
import {Text ,Button, Box, Flex} from '@chakra-ui/react'

function ModeRules(props) {
  const {mode} = props;
  const title = {
    COOP:"2 Player Mode: Co-op",
    ROTATE:"3 Player Mode: Rotation",
    TEAMS: "4+ Player Mode: Teams"
  }
  const description = {
    COOP:<CoopDescription/>,
    ROTATE: <RotationDescription/>, 
    TEAMS: <TeamDescription/>
  }

  return <Box ml={5} p={5} backgroundColor="gray.200" color="grey.800" width='fit-content' rounded={5}>
    <Text fontSize="3xl" fontWeight="bold" mb={3}><strong>{title[mode]}</strong></Text>
    <RulesContainer>
      {description[mode]}
    </RulesContainer>
  </Box>
}
const RulesContainer = (props) =>{
  return <Box maxW ={700}>{props.children}</Box>
}

const CoopDescription = (props) =>{
  return <>
    <Text>Both players are on the same team and switch off being the <strong>Speaker</strong>. 
      After each player has been the <i>Speaker</i> three times, your score will be totaled.</Text>
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
  <Text>Players rotate the three roles: <strong>Speaker</strong>, <strong>Punisher</strong>, and <strong>Audience</strong>. 
    The <i>Speaker</i> and the <i>Audience</i> earn points as normal. 
    At the end of the round, the <i>Speaker</i> and the <i>Audience</i> add up points they{`'`}ve earned 
    (they each earn the same number of points in a round). Each turn the roles will rotate.
    After each player has been the <i>Speaker</i> three times, the player with the most points wins.
  </Text>
  </>
}
const TeamDescription = (props) =>{
  return <>
  <Text>This is the standard mode the game. Players will take turns being <strong>Speaker</strong> alternating from one team to the other.
    The player who would be the <i>Speaker</i> next turn will be the <strong>Punisher</strong> for the current turn. Once you go through 3 rounds 
    or everyone has been a <i>Speaker</i> 3 times, the team with the most points wins. 
  </Text>
  <br/>
  <Text><strong>Uneven Teams Rule:</strong> If the teams are uneven, one player from
    the team with the extra player will be randomly chosen to be a <strong>permanent punisher</strong>, dealing swift unbiased judgements on all
     who utter words incorrectly.</Text>
  </>
}
export default ModeRules;

import React from 'react';
import useStore from '../store';
import { Flex, Text, Spacer} from '@chakra-ui/react'
import {Show} from './Conditional';

const Score = () =>{
  const { theme} = useStore(store => store);
  const { mode, score, players, teamA, teamB, phase} = useStore(store => store.room);
  const displayScore = {
    COOP: <CoopScore score={score} phase={phase}/>,
    ROTATE: <RotateScore players={players}/>,
    TEAMS: <TeamsScore teamA={teamA} teamB={teamB} theme={theme}/>
  }
  return displayScore[mode]
  
}
const CoopScore = ({score, phase}) =>{
  return <>
    <Text>Total Score: {score} points</Text>
    <Show when={phase=="GAME_OVER"}>
      <Show when={score<5}>So like...did you try?</Show>
      <Show when={score>5 && score<10}>Wow. Almost...not terrible..</Show>
      <Show when={score>=10 && score<21}>{`You think you're hot shit dontcha...You're not...`}</Show>
      <Show when={score>=21 && score<30}>MUDA MUDA MUDA MUDA MUDA MUDAAAAA!</Show>
      <Show when={score>=31 && score<49}>Oh? {`You're`} approaching me? Instead of running away, {`you're`} coming right to me</Show>
      <Show when={score>=50}>HO HOOOOO...then come as close as you like...</Show>
    </Show>
    
  </>
}
const RotateScore = ({players}) =>{
  console.log("before sort", players);
  players = players.sort((a,b) => b.score - a.score);
  console.log(players);
  return <>{
    players.map(p =>{
      return <Text fontSize="2xl" key={p.id}>{p.username}: {p.score} points</Text>
    })
  }</>
}

const TeamsScore = ({teamA, teamB, theme}) =>{
  return <Flex align="center" w={480}>
    <Text color={theme.teamA.primary} fontSize="xl" fontWeight="Bold">
      Team A: {teamA.score} points
    </Text>
    <Spacer/>
    <Text fontSize="2xl">VS</Text>
    <Spacer/>
    <Text color={theme.teamB.primary} fontSize="xl" fontWeight="Bold">
      Team B: {teamB.score} points
    </Text>
  </Flex>
}

export default Score;

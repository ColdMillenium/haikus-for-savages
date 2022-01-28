import React , {useEffect, useState}from 'react';
import useStore from '../../store';
import Card from '../Card'
import {Center, Stack, Flex, Button, Text, Box, Image} from '@chakra-ui/react'
import {Show} from '../Conditional';
import VideoBackground from '../VideoBackground';

const imgUrl = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/aa5f3401-4b21-4659-bf15-300e3205fac7/d378kyu-aa12e584-0d8e-4918-aac3-bec21f566dea.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2FhNWYzNDAxLTRiMjEtNDY1OS1iZjE1LTMwMGUzMjA1ZmFjN1wvZDM3OGt5dS1hYTEyZTU4NC0wZDhlLTQ5MTgtYWFjMy1iZWMyMWY1NjZkZWEuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.S5NGhpLLtX3GK52HpKUuGhya_3SHPAbjddg9SvtzZHo"
function GameOver() {
  const { mode, score, players, teamA, teamB, host, gameOverVideo} = useStore(store => store.room);
  const {clientsTeam, clientId} = useStore(store => store);
  const toLobby = useStore(store => () =>store.playerAction(store.ACTION.TO_LOBBY))
  const restart = useStore(store => () =>store.playerAction(store.ACTION.RESTART))

  const getWinners = ()=>{
    if(mode=='TEAMS'){
      if(teamA.score > teamB.score){
        return "Team A Wins!"
      }else if(teamB.score > teamA.score){
        return "Team B Wins!"
      }else{
        return "Nani??? It's a Tie!"
      }
    }else{//Rotate
      let highScore = 0;
      players.forEach(p =>{
        if(p.score > highScore){
          highScore = p.score;
        }
      })
      let winners = players.filter(p => p.score == highScore)
      if(winners.length == 1){
        return winners[0].username + " is the winner!"
      }else if(winners.length == 2){
        return `${winners[0]} and ${winners[1]} tied!`
      }else{
        return "Everybody tied!"
      }
      
    }
  }
  return <Center h="100vh" w="100vh">
    <Flex direction="column" align="center" justify="center">
    <Text fontSize="6xl" fontWeight="bold">Game Over!</Text>
      {/* <Image src={imgUrl} alt='Funny Game Over Image' /> */}
      <Box background="black" h={250} mb="100px">
        <Box h="60px"></Box>
        <Box pointerEvents="none" overflow="hidden"  height="250" backgroundColor="black">
          <Box transform="translateY(-20%)"overflow="hidden">
            <VideoBackground height={300} width={480} videoId={gameOverVideo}/>
          </Box>
        </Box>
        <Text align="center" fontWeight="bold" fontSize="4xl" zIndex="1000" color="white" position="relative" top={-10} backgroundColor="black">
          <Show when={mode == "COOP"}>How'd you do?</Show>
          <Show when={mode != "COOP"}>{getWinners()}</Show>
        </Text>
      </Box>
      
      
      
      <Score
        mode={mode}
        score={score}
        players={players}
        teamA={teamA}
        teamB={teamB}
        clientsTeam={clientsTeam}
      />
      <Show when={true}>
        <Button disabled={clientId!=host} onClick={restart} m={3}>Restart</Button>
      </Show>
      <Show when={true}>
        <Button disabled={clientId!=host} onClick={toLobby} m={3}>Back to Lobby</Button>
      </Show>
    </Flex>
  </Center>;
}

const Score = ({mode, score, teamA, teamB, players, clientsTeam}) =>{
  const displayScore = {
    COOP: <CoopScore score={score}/>,
    ROTATE: <RotateScore players={players}/>,
    TEAMS: <TeamsScore teamA={teamA} teamB={teamB} clientsTeam={clientsTeam}/>
  }
  return displayScore[mode]
  
}
const CoopScore = ({score}) =>{
  return <>
    <Text>Total Score: {score} points</Text>
    <Show when={score<5}>So like...did you try?</Show>
    <Show when={score>5 && score<10}>Wow. Almost...not terrible..</Show>
    <Show when={score>=10 && score<21}>{`You think you're hot shit dontcha...You're not...`}</Show>
    <Show when={score>=21 && score<30}>MUDA MUDA MUDA MUDA MUDA MUDAAAAA!</Show>
    <Show when={score>=31 && score<49}>Oh? {`You're`} approaching me? Instead of running away, {`you're`} coming right to me</Show>
    <Show when={score>=50}>HO HOOOOO...then come as close as you like...</Show>
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

const TeamsScore = ({teamA, teamB, clientsTeam}) =>{
  return <>Team Score</>
}



export default GameOver;

import React from 'react';
import useStore from '../../store';
import {Center, Flex, Button, Text, Box, Spacer} from '@chakra-ui/react'
import {Show} from '../Conditional';
import VideoBackground from '../VideoBackground';
import Score from '../Score'

function GameOver() {
  const { mode,  players, teamA, teamB, host, gameOverVideo} = useStore(store => store.room);
  const { clientId} = useStore(store => store);
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
  return <Center h="100%" w="100%">
    <Flex direction="column" align="center" justify="center">
      <Text fontSize="6xl" fontWeight="bold">Game Over!</Text>
      <Box background="black" h={250} mb="100px">
        <Box h="60px"></Box>
        <Box pointerEvents="none" overflow="hidden"  height="250" backgroundColor="black">
          <Box transform="translateY(-20%)"overflow="hidden">
            <VideoBackground height={300} width={480} videoId={gameOverVideo}/>
          </Box>
        </Box>
        <Text align="center" fontWeight="bold" fontSize="4xl" zIndex="1000" color="white" position="relative" top={-10} backgroundColor="black">
          <Show when={mode == "COOP"}>How did you guys do?</Show>
          <Show when={mode != "COOP"}>{getWinners()}</Show>
        </Text>
      </Box>
      <Score/>
      <Show when={true}>
        <Button disabled={clientId!=host} onClick={restart} m={3}>Restart</Button>
      </Show>
      <Show when={true}>
        <Button disabled={clientId!=host} onClick={toLobby} m={3}>Back to Lobby</Button>
      </Show>
    </Flex>
  </Center>;
}

export default GameOver;

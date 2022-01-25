import React , {useEffect, useState}from 'react';
import useStore from '../store';
import Card from './Card'
import {Center, Stack, Flex, Button, Text, Box, Image} from '@chakra-ui/react'
import {Show} from './Conditional';

const imgUrl = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/aa5f3401-4b21-4659-bf15-300e3205fac7/d378kyu-aa12e584-0d8e-4918-aac3-bec21f566dea.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2FhNWYzNDAxLTRiMjEtNDY1OS1iZjE1LTMwMGUzMjA1ZmFjN1wvZDM3OGt5dS1hYTEyZTU4NC0wZDhlLTQ5MTgtYWFjMy1iZWMyMWY1NjZkZWEuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.S5NGhpLLtX3GK52HpKUuGhya_3SHPAbjddg9SvtzZHo"
function GameOver() {
  const {restart, mode, score} = useStore(store => store.room);
  return <Center h="100vh" w="100vh">
    <Flex direction="column" align="center" justify="center">
      
        <Image src={imgUrl} alt='Dan Abramov' />
   
    
        <Text fontSize="6xl" fontWeight="bold">Game Over!</Text>
      <Show when={mode == "COOP"}>
        <Text>Total Score: {score} points</Text>
        <Show when={score<5}>So like...did you try?</Show>
        <Show when={score>5 && score<10}>Wow. Almost...not terrible..</Show>
        <Show when={score>=10 && score<21}>You think you're hot shit dontcha...You're not...</Show>
        <Show when={score>=21 && score<30}>MUDA MUDA MUDA MUDA MUDA MUDAAAAA!</Show>
        <Show when={score>=31 && score<49}>Oh? You're approaching me? Instead of running away, you're coming right to me</Show>
        <Show when={score>=50}>HO HOOOOO...then come as close as you like...</Show>
      </Show>
      <Show when={true}>
        <Button m={3}>Restart</Button>
      </Show>
      <Show when={true}>
        <Button m={3}>Back to Lobby</Button>
      </Show>
    </Flex>
    
    
  </Center>;
}




export default GameOver;

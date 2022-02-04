import React , {useEffect, useState}from 'react';
import {Show, Hide} from '../Conditional'
import {Text ,Button, Box, Flex, Center} from '@chakra-ui/react'
import useStore from '../../store'
import RoleDisplay from '../RoleDisplay'
import ReadyStatuses from '../ReadyStatuses'
import {SOUNDS} from '../../utils/effects'
import Score from '../Score';

function TurnTransition() {
  const {clientsRole, clientsTeam, readyToStart, theme} = useStore(store => store);
  const startTurn = useStore(store => () =>store.playerAction(store.ACTION.START_TURN))
  

  const getTeamColor = () => {
    if(clientsTeam == "teamA"){
      return theme.teamA.primary
    }else if(clientsTeam == "teamB"){
      return theme.teamB.primary
    }
    return "lightgrey"
  }

  useEffect(() =>{
    const startSound = new Audio(SOUNDS.AMONG_US_ROUND);
    startSound.volume = 0.15;
    startSound.play();
  }, [])

  return <Center h="100%" w="100%">
    <Flex 
      align="center" 
      justify="center" 
      direction="column" 
      boxShadow="md" p={5} 
      rounded={5} 
      width={350} 
      h='fit-content'
      backgroundColor="white"
    >
      <Score/>
      <Text fontSize="2xl" fontWeight="bold">
        Next Turn
      </Text>
      <RoleDisplay backgroundColor={getTeamColor()}/>
      <ReadyStatuses />
      <StartButton data={{readyToStart, clientsRole, startTurn}}/>
    </Flex>
  </Center>
}

const StartButton = ({data}) =>{
  const {readyToStart, clientsRole, startTurn} = data
  return <Show when={readyToStart && clientsRole=="Speaker"}>
    <Center h={50}>
      <Button  colorScheme="green" size='md' onClick={startTurn}>
        Start Turn!
      </Button>
    </Center>
  </Show>
}

export default TurnTransition;

import React , {useEffect, useState}from 'react';
import useStore from '../store';
import Card from './Card'
import {Center, Stack, Flex, Button, Text} from '@chakra-ui/react'
import Conditional from './Conditional';

function Turn() {
  const {punisher, speaker, audience, currCard, score} = useStore(store => store.room)
  const {clientId, clientsRole ,room} = useStore(store => store);

  const showCard = () =>{
    if(clientsRole == "Speaker"){
      return <Center h="100vh" w="100%">
      <Card hidden={false} easy="Dance" hard ="Belly Dance"/>
      </Center>
      
    }else if(clientsRole == "Punisher"){
      return <Center h="100vh" w="100%" >
        <Stack></Stack>
      <Card hidden={false} easy="Dance" hard ="Belly dance"/>
      </Center>
    }else{
      return <Center h="100vh" w="100%">
      <Card hidden={true} easy="Dance" hard ="Belly dance"/>
      </Center>
    }
  }
  console.log(room);
  return <Center h="100vh" w="100%">
    <Stack h="500px">
      {showCard()}
      <Conditional condition={clientsRole == "Speaker"}>
        <Flex>
          <Button m={2} colorScheme="red">Oops -1</Button>
          <Button m={2} colorScheme="yellow">Easy +1</Button>
          <Button m={2}colorScheme="green">Great +1</Button>
        </Flex>
      </Conditional>
      <Conditional condition={clientsRole == "Audience"}>
        <Text> Listen carefully to the Speaker!</Text>
      </Conditional>
      
    </Stack>
    

  </Center>
      
  ;
}

export default Turn;

import React , {useEffect, useState}from 'react';
import useStore from '../store';
import Card from './Card'
import {Center, Stack, Flex, Button} from '@chakra-ui/react'

function Turn() {
  const {punisher, speaker, currCard, score} = useStore(store => store.room)
  const clientId = useStore(store => store.clientId);


  const [role, setRole] = useState("")
  useEffect(() =>{
    if(punisher.id == clientId){
      setRole("PUNISHER")
    }else if(speaker.id == clientId){
      setRole("SPEAKER")
    }else{
      setRole("AUDIENCE");
    }
  }, [punisher, speaker])
  useEffect(() =>{
    if(currCard){

    }
  }, [currCard])
  
  const showCard = () =>{
    if(role == "SPEAKER"){
      return <Center h="100vh" w="100%">
      <Card hidden={false} easy="Dance" hard ="Belly Dance"/>
      </Center>
      
    }else if(role == "PUNISHER"){
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
  
  return <Center h="100vh" w="100%">
    <Stack h="500px">
      {showCard()}
      <Flex>
        <Button m={2} colorScheme="red">Oops -1</Button>
        <Button m={2} colorScheme="yellow">Easy +1</Button>

        <Button m={2}colorScheme="green">Great +1</Button>

      </Flex>
    </Stack>
    

  </Center>
      
  ;
}

export default Turn;

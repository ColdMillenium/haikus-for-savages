import React , {useEffect, useState}from 'react';
import useStore from '../store';
import Card from './Card'
import {Center, Stack, Flex, Button, Text} from '@chakra-ui/react'
import Conditional from './Conditional';

function Turn() {
  const {punisher, speaker, audience, currCard, score, timerOn} = useStore(store => store.room)
  const {clientId, clientsRole ,room, playCard} = useStore(store => store);

  const hideCard = () =>{
    return clientsRole != "Punisher" && clientsRole!="Speaker"
  }
  console.log(room);
  return <Center h="100vh" w="100%">
    
    <Flex direction="column" align="center" h="500px">
      <Text fontSize="4xl" fontWeight="bold">{clientsRole}</Text>
      <Timer timerOn={true} timeLeft={5*1000 + 1000} timeStart={Date.now()}/>
      <Center h="100vh" w="100%">
        <Card hidden={hideCard()} card={currCard}/>
      </Center>
      <Conditional condition={clientsRole == "Speaker"}>
        <Flex>
          <Button onClick={() => playCard("OOPS")}m={2} colorScheme="red">Oops -1</Button>
          <Button onClick={() => playCard("GOOD")} m={2} colorScheme="yellow">Easy +1</Button>
          <Button onClick={() => playCard("GREAT")} m={2}colorScheme="green">Great +1</Button>
        </Flex>
      </Conditional>
      <Conditional condition={clientsRole == "Audience"}>
        <Text> Listen carefully to the Speaker!</Text>
      </Conditional>
    </Flex>
  </Center>

}

const Timer = (props) => {
  const {timeLeft, timeStart} = props
  const [time, setTime] = useState(timeLeft/1000);
  const [timerOn, setTimerOn] = useState(props.timerOn);
  useEffect(() => {
    const interval;
    console.log("yo")
    console.log("timerOn", timerOn)
    if(timerOn){
      console.log("hey")
      interval = setInterval(function(){
        if(time <= 0){
          setTimerOn(false);
          setTime(0);
        }else{
          setTime(Math.floor((timeLeft - (Date.now() - timeStart))/1000));
        }
      },200)
      
    }
    return () =>{
      clearInterval(interval);
    }
    
  },[timerOn])

  const display = () => {
    if(time >0){
      return Math.floor(time/60) + ":" + (time%60 < 10? "0":"") + time%60;
    }else{
      return "0:00";
    }
  }

  return <Text fontSize="3xl">{display()}</Text>
}
export default Turn;

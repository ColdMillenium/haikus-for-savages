import React , {useEffect, useState}from 'react';
import useStore from '../store';
import Card from './Card'
import {Center, Stack, Flex, Button, Text} from '@chakra-ui/react'
import Conditional from './Conditional';

function Turn() {
  const {currCard, score, timerOn, playedCards, timeLeft, timeStart} = useStore(store => store.room)
  const {clientId, clientsRole ,room, playCard} = useStore(store => store);
  const [turnOver, setTurnOver] = useState(false);
  const hideCard = () =>{
    return clientsRole != "Punisher" && clientsRole!="Speaker"
  }
  console.log(room);
  return <Center h="100vh" w="100%">
    
    <Flex direction="column" align="center" h="600px">
      <Text fontSize="4xl" fontWeight="bold">{clientsRole}</Text>
      <Timer 
        timerOn={true} 
        timeLeft={timeLeft} 
        timeStart={timeStart}
        setTurnOver={setTurnOver}
      />
      <Center h="100vh" w="100%">
        <Card hidden={hideCard()} card={currCard}/>
      </Center>
      <Conditional condition={clientsRole == "Speaker"}>
        <Flex>
          <PileButton 
            disabled={turnOver}
            type="OOPS" 
            score={playedCards.oops.length} 
            onClick={playCard}
          />
          <PileButton 
            disabled={turnOver}
            type="GOOD" 
            score={playedCards.good.length} 
            onClick={playCard}
            />
          <PileButton 
            disabled={turnOver}
            type="GREAT" 
            score={playedCards.great.length} 
            onClick={playCard}
          />
        </Flex>
      </Conditional>
      <Conditional condition={clientsRole == "Audience"}>
        <Text> Listen carefully to the Speaker!</Text>
      </Conditional>
      <Conditional condition={turnOver}>
        <Button h="150" mt={3} size="lg">End Turn</Button>
      </Conditional>
      
    </Flex>
  </Center>

}

const PileButton = ({type, score, onClick, ...rest}) =>{
  const colorScheme = {OOPS:'red', GOOD:'yellow' ,GREAT:'green'};
  const text = {OOPS:'Oops -1', GOOD:'Good +1' ,GREAT:'Great +3'}
  return <Flex direction="column" align="center">
    <Button 
      {...rest}
      onClick={() => onClick(type)}
      m={2} 
      colorScheme= {colorScheme[type]}
    >
      {text[type]}
    </Button>
    <Text color={colorScheme[type]}fontSize="2xl">{score}</Text>
  </Flex>
}

const Timer = (props) => {
  const {timeLeft, timeStart, setTurnOver} = props
  const [time, setTime] = useState(timeLeft/1000);
  const [timerOn, setTimerOn] = useState(props.timerOn);
  useEffect(() => {
    if(Date.now() - timeStart > timeLeft){
      setTurnOver(true);
    }
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

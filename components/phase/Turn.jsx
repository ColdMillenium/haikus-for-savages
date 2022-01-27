import React , {useEffect, useState}from 'react';
import useStore from '../../store';
import Card from '../Card'
import {Center, Stack, Flex, Button, Text} from '@chakra-ui/react'
import {Show, Hide} from '../Conditional';
import PunishmentModal from '../PunishmentModal';

function Turn() {
  const {
    currCard, 
    score, 
    timerOn, 
    playedCards, 
    timeLeft, 
    timeStart, 
    roundNum, 
    turnNum,
    punishmentInProgress
  } = useStore(store => store.room)
  const {clientId, clientsRole ,room } = useStore(store => store);
  const playCard = useStore(store => (type) =>store.playerAction(store.ACTION.PLAY_CARD, type))
  const endTurn = useStore(store => () =>store.playerAction(store.ACTION.END_TURN))
  const executePunishment = useStore(store => () =>store.playerAction(store.ACTION.EXECUTE_PUNISHMENT))
  const [turnOver, setTurnOver] = useState(false);
  const hideCard = () =>{
    return clientsRole != "Punisher" && clientsRole!="Speaker"
  }
  console.log(room);
  return <Center h="100%" w="100%" overflow="hidden">
    
    <Flex direction="column" align="center">
      <Text fontSize="4xl" fontWeight="bold">{clientsRole}</Text>
      <Hide when={punishmentInProgress}>
        <Timer 
          timerOn={punishmentInProgress == false} 
          timeLeft={timeLeft} 
          timeStart={timeStart}
          setTurnOver={setTurnOver}
        />
      </Hide>
      
      <Center>
        <Card hidden={hideCard()} card={currCard}/>
      </Center>
      <Show when={clientsRole == "Speaker"}>
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
      </Show>
      <Show when={clientsRole == "Audience"}>
        <Text> 
          Listen carefully to the Speaker!
        </Text>
      </Show>
      <Show when={clientsRole == "Punisher"}>
        <Button 
          disabled={turnOver}
          onClick={executePunishment} 
          fontSize="3xl"
          size="lg"
          colorScheme="red">
            Punish
          </Button>
      </Show>
      <Show when={turnOver && clientsRole == "Speaker"}>
        <Button 
          onClick={endTurn} 
          mt={3} 
          size="lg">
            End Turn
          </Button>
      </Show>
      <div>Round#:{roundNum}</div>
      <div>Turn#:{turnNum}</div>
    </Flex>
    <PunishmentModal open={punishmentInProgress}/>
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
    // if(Date.now() - timeStart > timeLeft){
    //   console.log(Date.now() - timeStart);
    // }
    let interval;
    if(timerOn){
      console.log("hey")
      interval = setInterval(function(){
        console.log(Date.now() - timeStart);
        if(Date.now() - timeStart > timeLeft){
          console.log("time is up!")
          setTurnOver(true)
          return;
        }
        if(time <= 0){
          
          setTimerOn(false);
          setTurnOver(true)
          setTime(0);
        }else if(timerOn){
          setTime(Math.floor((timeLeft - (Date.now() - timeStart))/1000));
        }
      },200)
      
    }
    return () =>{
      clearInterval(interval);
    }
    
  },[timerOn, timeStart, timeLeft, setTurnOver, time])

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

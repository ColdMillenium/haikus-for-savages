import React , {useEffect, useState}from 'react';
import useStore from '../../store';
import Card from '../Card'
import {Center, Stack, Flex, Button, Text, Box} from '@chakra-ui/react'
import {Show, Hide} from '../Conditional';
import PunishmentModal from '../PunishmentModal';
import {SOUNDS} from '../../utils/effects'
import styled, {keyframes} from 'styled-components';
import { fadeOutLeft, fadeInRight, fadeIn, fadeOut} from 'react-animations';
import Tada from 'react-reveal/Tada'
const fadeOutLeftAnimation = keyframes`${fadeOutLeft}`;
const fadeInRightAnimation = keyframes`${fadeInRight}`;


const LastCardDiv = styled.div`
  opacity: 0;
  animation: 1s ${fadeOutLeftAnimation}
`;

const CurrCardDiv = styled.div`
  animation: 1s ${fadeInRightAnimation}
`;

const fadeInAndOut = `
  0%,100% { opacity: 0; }
  50% { opacity: 1; }
`;
const PointsEarnedDiv = styled.div`
  animation: 1s ${keyframes`${fadeInAndOut}`} 
`;

const TimeUpDiv = styled.div`
  color: red;
  animation: 1s ${keyframes`${fadeInAndOut}`} infinite
`;


const soundVolume = 0.05;

function Turn() {
  const {
    currCard, 
    playedCards, 
    timeLeft, 
    timeStart, 
    roundNum, 
    turnNum,
    punishmentInProgress,
    lastPointsEarned
  } = useStore(store => store.room)
  const {clientId, clientsRole ,room , lastCard,} = useStore(store => store);
  const playCardCount = useStore(store =>{
    return room.playedCards.oops + room.playedCards.great + room.playedCards.good
  })
  const playCard = useStore(store => (type) =>store.playerAction(store.ACTION.PLAY_CARD, type))
  const endTurn = useStore(store => () =>store.playerAction(store.ACTION.END_TURN))
  const executePunishment = useStore(store => () =>store.playerAction(store.ACTION.EXECUTE_PUNISHMENT))
  const [turnOver, setTurnOver] = useState(false);
  const [startOfCard, setStartOfCard] = useState(true);
  const [soundPlaying, setSoundPlaying] = useState(false);
  const [playedCardCount, setPlayedCardCount] = useState(0);
  const totalPoints = playedCards.oops.length * -1 + 
                      playedCards.good.length + 
                      playedCards.great.length * 3;
  const placeInPile = (type) =>{
    setStartOfCard(false);
    playCard(type);
  }
  const hideCard = () =>{
    return clientsRole != "Punisher" && clientsRole!="Speaker"
  }
  useEffect(() =>{
    if(turnOver){
      const sound = new Audio(SOUNDS.WWE_RING_BELL);
      sound.volume = soundVolume
      sound.play();
    }
  },[turnOver])
  useEffect(() =>{
    const count = room.playedCards.oops + room.playedCards.great + room.playedCards.good;
    if(count != playedCardCount){
      setPlayedCardCount(count);
      if(lastPointsEarned == -1){
        const sound = new Audio(SOUNDS.BRUH);
        sound.volume = soundVolume
        sound.play();
      }else if (lastPointsEarned == 1){
        const sound = new Audio(SOUNDS.SUCCESS_CHIME);
        sound.volume = soundVolume
        sound.play();
      }else if (lastPointsEarned == 3){
        const sound = new Audio(SOUNDS.ANIME_WOW);
        sound.volume = soundVolume
        sound.play();
      }
    }
  },[room, lastPointsEarned, lastCard])
  
  
  useEffect(()=>{
    if(startOfCard == false){
      setStartOfCard(true);
    }
   
    setTimeout(()=>{
      setStartOfCard(false);
    },1000)
  }, [lastCard, setStartOfCard, lastPointsEarned, soundPlaying, setSoundPlaying])

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
      
      <Center width='fit-content'>
        <Show when={!startOfCard}>
          <Card hidden={hideCard()} card={currCard}/>
        </Show>
        <Show when={startOfCard}>
          
          {/* Current CARD */}
          <CurrCardDiv>
            <Box position="relative" top={0} left={lastCard? 90: 0} >
              <Card hidden={hideCard()} card={currCard}/>
            </Box>
          </CurrCardDiv>
          {/* Last card should be ontop of curr card and always shown */}
          
          <LastCardDiv>
            <Show when={lastCard}>
              <Box position="relative" top={0} right={100}>
                <Card card={lastCard}/>
              </Box>
            </Show>
          </LastCardDiv>
      
          <PointsEarnedDiv>
            <Show when={lastPointsEarned!=0}>
              <Tada>
                <Text 
                  position="relative" 
                  top={-50} 
                  right={100} 
                  fontSize="3xl" 
                  color={
                    lastPointsEarned == 1? "yellow.500":
                    lastPointsEarned == 3? "green.500":
                    "red.500"
                   
                  }
                  fontWeight="bold"
                >
                  {
                    lastPointsEarned == 1? "+1":
                    lastPointsEarned == 3? "+3":
                    "-1"
                  }
                </Text>
              </Tada>
            </Show>
          </PointsEarnedDiv>
        </Show>
      </Center>
      <Text fontSize="3xl" fontWeight="bold" color="gray.500">
        {totalPoints} Pts
      </Text>
      <Flex>
        <PileButton 
          disabled={turnOver || clientsRole != "Speaker"}
          type="OOPS" 
          score={playedCards.oops.length} 
          onClick={playCard}
        />
        <PileButton 
          disabled={turnOver || clientsRole != "Speaker"}
          type="GOOD" 
          score={playedCards.good.length} 
          onClick={playCard}
          />
        <PileButton 
          disabled={turnOver || clientsRole != "Speaker"}
          type="GREAT" 
          score={playedCards.great.length} 
          onClick={playCard}
        />
      </Flex>
      <Show when={!turnOver && clientsRole == "Audience"}>
        <Text> 
          Listen carefully to the Speaker!
        </Text>
      </Show>
      <Show when={turnOver && clientsRole != "Speaker"}>
        <Box m={3}> Waiting for Speaker to end turn...</Box>
       
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
    <Text color="grey" fontWeight="bold" fontSize="3xl">{score}</Text>
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
      interval = setInterval(function(){
        if(Date.now() - timeStart > timeLeft){
          console.log("time is up!")
          setTurnOver(true)
          clearInterval(interval);
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
      return <TimeUpDiv>0:00</TimeUpDiv>
    }
  }

  return <Text fontSize="4xl">{display()}</Text>
}
export default Turn;

import React, {useState} from 'react';
import {Box, Stack, Text, Flex, Center, Spacer} from '@chakra-ui/react'
const primaryColor = "#f77238";
const secondaryColor = "white"

function Card({hidden, card}) {
  if(!card || !card.GOOD || !card.GREAT){
    console.log("card:" ,card);
    card = {}
    card.GOOD = "null Card?";
    card.GREAT = "check Logs";
  }
  return <Center 
    p={2} 
    boxShadow="lg" 
    rounded={5} 
    height={200} 
    minWidth={150}
    maxWidth={150} 
    m={5}
    overflow="hidden"
    backgroundColor="white"
  >
    <Flex 
      direction="column" 
      align="center" 
      width="100%" 
      h="100%" 
      p={0}
      m={0}
    > 
      <PhraseContainer>
        <Points num={1} color={secondaryColor} backgroundColor={primaryColor}/>
        <Text align="center" fontWeight="bold" fontSize="xl" color={primaryColor} mt={1}>
          {hidden? "???": card.GOOD}
        </Text>
      </PhraseContainer>
      
      <PhraseContainer bottom={true}>
        <Text align="center" fontWeight="bold" fontSize="lg" color={secondaryColor}>
          {hidden? "??????": card.GREAT}
        </Text>
        <Spacer/>
        <Points num={3} color={primaryColor} backgroundColor={secondaryColor}/>
      </PhraseContainer>
    </Flex>
  </Center>;
}

const Points = ({num, color, backgroundColor}) =>{
  return <>
    <Center 
      backgroundColor={backgroundColor}
      color={color}
      w={4} 
      h={4} 
      rounded={100}
      fontSize="sm"
      fontWeight="bold"
    >
      {num}
    </Center>
  </>
}
const PhraseContainer = (props) =>{
  const {bottom=false, children} = props;
  return <Flex 
    h={bottom?"55%":"45%"} 
    align="center" 
    direction="column" 
    backgroundColor={bottom? primaryColor: secondaryColor}
    p={2} 
    m={0} 
    width="100%"
    borderBottomRadius	={bottom? 3 : 0}
  >
    {children}
  </Flex>

}

export default Card;

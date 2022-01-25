import React, {useState} from 'react';
import {Box, Stack, Text, Flex} from '@chakra-ui/react'

function Card({hidden, card}) {
  if(!card || !card.GOOD || !card.GREAT){
    console.log("card:" ,card);
    card = {}
    card.GOOD = "null Card?";
    card.GREAT = "check Logs";
  }
  return <Box p={10} boxShadow="lg" rounded={5} height="300" minWidth="200">
    <Flex direction="column" align="center" width="100%" h="100%">
      <Text fontSize="2xl" align="center" mb={10}>{hidden? "???": card.GOOD}</Text>
      <Text fontSize="2xl" >{hidden? "??????": card.GREAT}</Text>
    </Flex>
  </Box>;
}

export default Card;

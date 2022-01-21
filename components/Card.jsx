import React, {useState} from 'react';
import {Box, Stack, Text} from '@chakra-ui/react'

function Card({hidden, easy, hard}) {
  return <Box p={10} boxShadow="lg" rounded={5} height="300" >
    <Stack width="300">
      <Text align="center" mb={5}>{hidden? "???": easy}</Text>
      <Text>{hidden? "??????": hard}</Text>
    </Stack>
  </Box>;
}

export default Card;

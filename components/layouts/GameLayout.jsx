
import React from 'react';
import Header from '../Header'
import {Center, Box} from '@chakra-ui/react'


function GameLayout({children}) {
 
  return <Box h="100vh" w="100vw">
    <Header/>
    {children}
  </Box>;
}

export default GameLayout;

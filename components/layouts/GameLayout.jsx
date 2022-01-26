
import React , {useRef} from 'react';
import Header from '../Header'
import {Center, Box, Portal} from '@chakra-ui/react'


function GameLayout({children}) {
  const headerLocRef = useRef()
  return <Box h="100vh" w="100vw">
    <Box ref={headerLocRef}></Box>
    {children}
    <Portal containerRef={headerLocRef}>
      <Header/>
    </Portal>
   
  </Box>;
}

export default GameLayout;

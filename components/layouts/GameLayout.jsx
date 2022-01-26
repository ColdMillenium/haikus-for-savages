
import React , {useRef} from 'react';
import Header from '../Header'
import GameLog from '../GameLog';
import {Center, Box, Stack, Flex} from '@chakra-ui/react'
import useStore from '../../store';

function GameLayout({children}) {
  const gameLogContainerRef = useRef()
  const gameLogOpen = useStore(store => store.gameLogOpen);
  const width = gameLogOpen? `calc(100vw - ${320}px)`: '100vw';
  return <Flex h="100vh" w={width} direction="column">
    <Header/>

    
      {children}
      <GameLog containerRef={gameLogContainerRef}/>
    
   
   
    
   
  </Flex>;
}

export default GameLayout;


import React , {useRef} from 'react';
import Header from '../Header'
import GameLog from '../GameLog';
import {Center, Box, Stack, Flex} from '@chakra-ui/react'
import useStore from '../../store';

function GameLayout({children}) {
  const gameLogContainerRef = useRef()
  const gameLogOpen = useStore(store => store.gameLogOpen);
  const width = gameLogOpen? `calc(100vw - ${320}px)`: '100vw';
  const minWidth = "550px"
  return <Flex h="100vh" minWidth={minWidth} direction="column" backgroundColor="#f9f9f9">
    <Header/>
      <Box height="100%" maxidth={width} minWidth={minWidth}>
      {children}
      </Box>
      <GameLog containerRef={gameLogContainerRef}/>
  </Flex>;
}

export default GameLayout;

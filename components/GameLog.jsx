import React , {useEffect, useState} from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Button,
  Spacer,
  Box,
  Text,
} from '@chakra-ui/react'
import useStore from '../store';
import { m } from 'framer-motion';

function GameLog({containerRef}) {
  const toggleGameLog = useStore(store => store.toggleGameLog);
  const gameLog = useStore(store => store.gameLog);
  const isOpen = useStore(store => store.gameLogOpen);
  const {players} = useStore(store => store.room);
  return (
    <>
      <Drawer position="relative"  placement="right" onClose={toggleGameLog} isOpen={isOpen}>
      <DrawerOverlay />
        <DrawerContent mt="auto" mb={0} w="300px" >
        
          <DrawerHeader  borderBottomWidth='1px'>
            <Flex align="center" h="43px">
              GameLog
              <Spacer/>
              <Button onClick={toggleGameLog}>close</Button>
            </Flex>
            
          </DrawerHeader>
          
          <DrawerBody>
            {gameLog.map((log, i) =>{
              let msg = log.msg;
              const isUsername = (word) => players.map(p=> p.username).includes(word);
              msg = msg.split(" ").map(w => isUsername(w)?<strong key={i} style={{color:"green"}}> {w} </strong>: w + " ")
              const hr = new Date(log.time).getHours();
              const min = new Date(log.time).getMinutes()
              return <Box key={i}> 
                <Text 
                  color="grey" 
                  fontWeight="light" 
                  fontSize="sm"
             
                >
                  {hr==0?12:hr%12}:{min<10? "0"+ min: min} {hr>=12?"pm":"am"}
                </Text> 
                <Text mb={2} fontSize="md"> 
                  {msg}
                </Text>
              </Box>
            })}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default GameLog;

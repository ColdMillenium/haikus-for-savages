import React , {useEffect, useState} from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerContent,
  Flex,
  Button,
  Spacer,
} from '@chakra-ui/react'
import useStore from '../store';

function GameLog({containerRef}) {
  const toggleGameLog = useStore(store => store.toggleGameLog);
  const isOpen = useStore(store => store.gameLogOpen);
  return (
    <>
        <Drawer position="relative"  placement="right" onClose={toggleGameLog} isOpen={isOpen}>
          <DrawerContent mt="auto" mb={0} w="300px" >
            <DrawerHeader  borderBottomWidth='1px'>
              <Flex align="center" h="43px">
                GameLog
                <Spacer/>
                <Button onClick={toggleGameLog}>close</Button>
              </Flex>
             
            </DrawerHeader>
            <DrawerBody>
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
            </DrawerBody>
          </DrawerContent>
        </Drawer>

    </>
  )
}

export default GameLog;

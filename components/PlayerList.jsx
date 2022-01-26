import {useEffect, useRef, useState} from 'react';
import { useRouter } from 'next/router';
import {Text ,Button, Box, Flex, Input, Select, Spacer} from '@chakra-ui/react'
import useStore from '../store.js'


const PlayerList = ({players, title, ...rest}) => {
  const {theme} = useStore(store => store)
  const list = [];
  players.forEach(p =>{
    list.push(<Flex key={p.id} >
      <Flex>
        <Text 
          fontSize="xl" 
          fontWeight="bold"
          key={p.id} 
          width = {200} 
          m={3} 
          ml={5} 
          p={3} 
          pl={5} 
          pr={5} 
          backgroundColor="#d5f1f2" 
          boxShadow="md"
          rounded={5}
          align="center"
          {...rest}
        >
          {p.username}
        </Text>
      </Flex>
      <Text 
        ml={1} 
        fontSize="sm" 
        fontWeight="bold"
        color={p.ready ? theme.status.ready : theme.status.notReady}
      >
        {p.ready ? "[READY]" : "[NOT READY]"}
      </Text>
    </Flex>)
  })
  return <>
    <Text fontSize="3xl" fontWeight="bold" color={rest.backgroundColor}>
      {title} ({players.length})
      </Text>
    <Box pl = {5}>
      {list}
    </Box>
  </>
}

export default PlayerList
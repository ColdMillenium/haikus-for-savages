import {useEffect, useRef, useState} from 'react';
import { useRouter } from 'next/router';
import {Show} from './Conditional';
import {Text ,Button, Box, Flex, Input, Select, Spacer} from '@chakra-ui/react'
import useStore from '../store.js'
import ReadyIcon from './ReadyIcon'


const PlayerList = ({players, title, ...rest}) => {
  const {theme} = useStore(store => store)
  const list = [];
  players.forEach(p =>{
    list.push(<Flex key={p.id} align="center" mt={3}>
      <Flex>
        <Text 
          fontSize="md" 
          fontWeight="bold"
          key={p.id} 
          width = {200} 
          p={3} 
          pl={5} 
          pr={5} 
          backgroundColor="gray.50" 
          boxShadow="md"
          rounded={5}
          align="center"
          {...rest}
        >
          {p.username}
        </Text>
      </Flex>
      <Box position="relative" top="-7" left="-2.5">
        <ReadyIcon ready={p.ready}/>
      </Box>
    </Flex>)
  })
  return <Flex 
    direction="column" 
    width={300} 
    m={5}
  >
    <ListTitle title={title} color={rest.backgroundColor} size ={players.length} />
    <Box>{list}</Box>
  </Flex>
}

const ListTitle = ({title,color, size}) =>{
  return <Text 
    fontSize="3xl" 
    fontWeight="bold"  
    color={color}
  >
    {title} ({size})
  </Text>
}

export default PlayerList
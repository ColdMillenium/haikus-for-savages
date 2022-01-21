import {useEffect, useRef} from 'react';
import { useRouter } from 'next/router';
import {Text ,Button, Box, Flex} from '@chakra-ui/react'
import useStore from '../store.js'

function Lobby() {
  
  const router = useRouter();
  const hostName = useStore(store => store.hostName);
  const clientId = useStore(store => store.clientId)
  const teamA = useStore(store => store.teamA);
  const teamB = useStore(store => store.teamB);
  const { roomId } = router.query;

  const teamList = (players) => {
    const list = [];
    players.forEach(p =>{
      list.push(<Flex f>
        <Text fontSize="xl" key={p.id} ml={5}>
          {p.username}
        </Text>
        <Text ml={1} fontSize="sm">{p.ready ? "[READY]" : "[NOT READY]"}</Text>
      </Flex>)
    })
    return list;
  }
  return <Box  p={5}>
    <Text fontSize="4xl">{hostName}'s Room</Text>
    Room ID: {roomId}
    <Text fontSize="4xl">Team A</Text>
    <Box pl = {5}>
      {teamList(teamA)}
    </Box>
    <Text fontSize="4xl">Team B</Text>
    <Box pl = {5}>
      {teamList(teamB)}
    </Box>

    <Button colorScheme="green"  m={5} mt={10}>Ready</Button>
    <Button colorScheme="gray" m={5} mt={10}>Switch Teams</Button>
  </Box>;

}

export default Lobby;
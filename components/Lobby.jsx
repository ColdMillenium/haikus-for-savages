import {useEffect, useRef} from 'react';
import { useRouter } from 'next/router';
import {Text ,Button} from '@chakra-ui/react'
import useStore from '../store.js'

function Lobby() {
  
  const router = useRouter();
  const hostName = useStore(store => store.hostName);
  const clientId = useStore(store => store.clientId)
  const sayHi = useStore(store => store.sayHi)
  const { roomId } = router.query;

  return <div>
    <Text fontSize="4xl">{hostName}'s Room</Text>
    Room ID: {roomId}
    <Button onClick={sayHi}>Hi</Button>
    <Text>{clientId}</Text>
  </div>;

}

export default Lobby;
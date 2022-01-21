import {useEffect, useRef} from 'react';
import { useRouter } from 'next/router';
import {Text ,Button} from '@chakra-ui/react'
import useStore from '../../../store'

function index() {
  
  const router = useRouter();
  const username = useStore(store => store.username);
  const sayHi = useStore(store => store.sayHi)
  const { roomId } = router.query;

  return <div>
    <Text fontSize="4xl">{username}'s Room</Text>
    Room ID: {roomId}
    <Button onClick={sayHi}>Hi</Button>
  </div>;

}

export default index;

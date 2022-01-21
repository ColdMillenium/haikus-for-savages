import {useEffect, useRef} from 'react';
import { useRouter } from 'next/router';
import {Text} from '@chakra-ui/react'
import useStore from '../../../store'

function index() {
  
  const router = useRouter();
  const username = useStore(store => store.username);
  const { roomId } = router.query;

  return <div>
    <Text fontSize="4xl">{username}'s Room</Text>
    Room ID: {roomId}
  </div>;

}

export default index;

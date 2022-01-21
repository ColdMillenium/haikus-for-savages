import {useEffect, useRef} from 'react';
import { useRouter } from 'next/router';
import useStore from '../../../store'
import Lobby from '../../../components/Lobby'

function index() {
  
  const router = useRouter();
  const username = useStore(store => store.username);
  const connected = useStore(store => store.connected);
  const players = useStore(store => store.players);
  const clientId = useStore(store => store.clientId)
  const gamePhase = useStore(store => store.gamePhase)
  const sayHi = useStore(store => store.sayHi)
  const { roomId } = router.query;

  useEffect(() =>{
    if(!connected || username == "" || players.include(username)){
      router.push(`JoinGame?roomId=${roomId}`)
    }
  }, [connected, username, players])
  switch(gamePhase){
    case "LOBBY":
      return <Lobby/>
    default:
      return <div>{gamePhase} not implemented</div>
  }
  return <Lobby/>;

}

export default index;

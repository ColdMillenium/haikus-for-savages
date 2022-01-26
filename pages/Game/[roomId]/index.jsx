import {useEffect, useRef} from 'react';
import { useRouter } from 'next/router';
import useStore from '../../../store'
import Lobby from '../../../components/phase/Lobby'
import Turn from '../../../components/phase/Turn'
import TurnTransition from '../../../components/phase/TurnTransition'
import GameOver from '../../../components/phase/GameOver';
import GameLayout from '../../../components/layouts/GameLayout'

function index() {
  
  const router = useRouter();
  const {players, phase} = useStore(store => store.room)
  const username = useStore(store => store.username);
  const connected = useStore(store => store.connected);
  const clientId = useStore(store => store.clientId)
  
  const sayHi = useStore(store => store.sayHi)
  const { roomId } = router.query;

  useEffect(() =>{
    if(!connected || username == "" || players.includes(username)){
      if(roomId){
        router.push(`/JoinGame?roomId=${roomId}`)
      }
    }
  }, [connected, username, players, roomId])

  const getPhase = {
    "LOBBY":<Lobby/>,
    "TURN" :<Turn/>,
    "TURN_TRANSITION":<TurnTransition/>,
    "GAME_OVER":<GameOver/>
  }
  return <GameLayout>{getPhase[phase]}</GameLayout>
}

export default index;

import {useState, useEffect} from 'react';
import {Input, Text, Center, Stack, Button, Box} from '@chakra-ui/react'
import useStore from '../store'
import {useRouter} from 'next/router'

function JoinGame() {
  const router = useRouter();
  const { query } = useRouter();
  const defaultRoomId = query.roomId;
  const {username, connected, roomId, joinRoomError} = useStore(state => state);
  const joinRoom = useStore(store => (data) =>store.playerAction(store.ACTION.JOIN_ROOM, data))
  const connect = useStore(state => state.connect)
  const [needToJoin, setNeedToJoin] = useState(false);
  const [roomIdInput, setRoomIdInput] = useState(defaultRoomId)
  const [name, setName] = useState('')

  useEffect(()=>{
    setRoomIdInput(defaultRoomId);
  }, [defaultRoomId])

  useEffect(()=>{
    if(connected && needToJoin){
      console.log("need to join", {roomIdInput, username});
      joinRoom({roomId: roomIdInput, username});
      setNeedToJoin(false);
    }
  }, [connected, needToJoin, roomIdInput, username, joinRoom])

  useEffect(()=>{
    if(joinRoomError == ""){
      return;
    }else if(joinRoomError == "DUPLICATE_USERNAME"){

    }else if (joinRoomError == "INVALID_ROOM_ID"){

    }else{
      //unhandled feedback?
    }
  }, [joinRoomError])

  useEffect(()=>{
   if(roomId != "" && roomId == roomIdInput){
     router.push(`Game/${roomId}`);
   }
  }, [roomId, roomIdInput, router])

  const updateName = (event) => {
    let value = event.target.value;
    if(value.length<=12 && !/\s/.test(value)){
      setName(value)
    }
  }
  const updateRoomId = (event) => {
    let value = event.target.value;
    if(value.length<=12 && !/\s/.test(value)){
      setRoomIdInput(value)
    }
  }
  const isValidName = () =>{
    if( name.length<=12 && !/\s/.test(name) && name.length >=3){
      return true
    }else{
      false;
    }
  }


  const handleJoinGame = () =>{
    if(isValidName() && roomIdInput!=null && roomIdInput != ""){
      connect(name)
      setNeedToJoin(true);
    }
  }

  const onEnter = (event) =>{
    if(event.code == "Enter"){
      handleJoinGame();
    }
  }


  return <Center height="100vh">
    
    <Stack spacing={5} p={20} rounded={5} boxShadow='md'>
      <Text mb={2} fontWeight="bold" fontSize="4xl">
        Join Game
      </Text>
      <Box>
        <Text color="grey">Enter your Username</Text>
        <Input 
          width={200}
          value={name}
          onChange={updateName}
          onKeyDown={onEnter}
          placeholder='cool username' 
        />
      </Box>
      <Box>
        <Text color="grey">Room ID:</Text>
        <Input 
          width={200}
          value={roomIdInput}
          onChange={updateRoomId}
          onKeyDown={onEnter}
          placeholder='Room ID' 
        />
      </Box>
      <Button onClick={handleJoinGame} color="grey" mt={5}>Join Game</Button>
      {
        joinRoomError != ""? <Text color="red">{joinRoomError}</Text> : null
      }
    </Stack>
    
    
  </Center>;
  
}

export default JoinGame;
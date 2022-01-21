import {useState, useEffect} from 'react';
import {Input, Text, Center, Stack, Button, Box} from '@chakra-ui/react'
import useStore from '../store'
import {useRouter} from 'next/router'

function JoinGame() {
  const router = useRouter();
  const { query } = useRouter();
  const defaultRoomId = query.roomId;
  const connect = useStore(state => state.connect)
  const username = useStore(state => state.username)
  const connected = useStore(state => state.connected);
  const joinRoom = useStore(state => state.joinRoom);
  const roomId = useStore(state => state.roomId)
  const joinRoomError = useStore(state => state.joinRoomError);
  const [needToJoin, setNeedToJoin] = useState(false);
  const [roomIdInput, setRoomIdInput] = useState("")
  const [name, setName] = useState('')

  useEffect(()=>{
    setRoomIdInput(defaultRoomId);
  }, [defaultRoomId])

  useEffect(()=>{
    if(connected && needToJoin){
      joinRoom(roomIdInput);
      setNeedToJoin(false);
    }
  }, [connected, needToJoin, roomIdInput])

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
  }, [roomId])

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

  const isValidRoomId = () =>{

  }
  const handleJoinGame = () =>{
    if(isValidName() && roomIdInput!=null && roomIdInput != ""){
      connect(name)
      setNeedToJoin(true);
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
          placeholder='cool username ;)' 
        />
      </Box>
      <Box>
        <Text color="grey">Room ID:</Text>
        <Input 
          width={200}
          value={roomIdInput}
          onChange={updateRoomId}
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
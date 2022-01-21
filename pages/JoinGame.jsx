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
  const [roomId, setRoomId] = useState("")
  const [name, setName] = useState('')

  useEffect(()=>{
    setRoomId(defaultRoomId);
  }, [defaultRoomId])

  useEffect(()=>{
    if(connected){
      joinRoom(roomId);
    }
  }, [connected, username])

  const updateName = (event) => {
    let value = event.target.value;
    if(value.length<=12 && !/\s/.test(value)){
      setName(value)
    }
  }
  const updateRoomId = (event) => {
    let value = event.target.value;
    if(value.length<=12 && !/\s/.test(value)){
      setRoomId(value)
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
    if(isValidName() && roomId!=null && roomId != ""){
      connect(name)
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
          value={roomId}
          onChange={updateRoomId}
          placeholder='Room ID' 
        />
      </Box>
      <Button onClick={handleJoinGame} color="grey" mt={5}>Join Game</Button>
    </Stack>
    
    
  </Center>;
  
}

export default JoinGame;
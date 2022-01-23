import {useState, useEffect} from 'react';
import {Input, Text, Center, Stack, Button, Box} from '@chakra-ui/react'
import useStore from '../store'
import {useRouter} from 'next/router'

function CreateGame() {
  const router = useRouter();
  const connect = useStore(state => state.connect)
  const connected = useStore(state => state.connected)
  const makeRoom = useStore(state => state.makeRoom);
  const getTestRoom = useStore(state => state.getTestRoom);
  const roomId = useStore(state => state.roomId);
  const [newRoom, setNewRoom] = useState(false);
  const [name, setName] = useState('')

  useEffect(() =>{
    if(connected && newRoom){
      makeRoom();
      setNewRoom(false);
    }
  },[connected, newRoom])
  useEffect(() =>{
    if(roomId != ""){
      router.push(`/Game/${roomId}`)
    }
  }, [roomId])

  const handleChange = (event) => {
    let value = event.target.value;
    if(value.length<=12 && !/\s/.test(value)){
      setName(value)
    }
  }
  const handleMakeGame = () =>{
    setNewRoom(true);
    connect(name);
    //TODO: Need to talk to server make a room and then get room id
    // router.push(`/Game/${randomRoomId()}`)
  }

  return <Center height="100vh">
    
    <Stack spacing={5} p={20} rounded={5} boxShadow='md'>
      <Text mb={2} fontWeight="bold" fontSize="4xl">New Game</Text>
      <Box>
        <Text color="grey">Enter your Username</Text>
        <Input 
          
          width={200}
          value={name}
          onChange={handleChange}
          placeholder='Your username' 
        />
      </Box>
      <Button onClick={handleMakeGame} color="grey" mt={5}>Make Game</Button>
      <Button onClick={getTestRoom} color="grey" mt={5}>Get Test Room</Button>
    </Stack>
    
    
  </Center>;
  
}

export default CreateGame;

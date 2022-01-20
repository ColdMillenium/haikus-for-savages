import {useState} from 'react';
import {Input, Text, Center, Stack, Button, Box} from '@chakra-ui/react'
import useStore from '../store'

function CreateGame() {
  const username = useStore(state => state.username)
  const setUsername = useStore(state => state.setUsername)
  const [name, setName] = useState('')
  const handleChange = (event) => {
    let value = event.target.value;
    if(value.length<=12 && !/\s/.test(value)){
      setName(value)
    }
  }
  const handleMakeGame = () =>{
    setUsername(name);
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
    </Stack>
    
    
  </Center>;

}

export default CreateGame;

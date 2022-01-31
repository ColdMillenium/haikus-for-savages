import React from 'react';
import useStore from '../store';
import { Flex , Spacer, Text, Button} from '@chakra-ui/react';

function Header() {
  const username = useStore(store => store.username)
  const toggleGameLog = useStore(store => store.toggleGameLog);
  return <>
    <Flex 
      maxW="100%" 
      align="center" 
      justify="center" 
      p={5} 
      boxShadow="lg"
      backgroundColor="White"
    >
      <Text fontSize="2xl" fontWeight="bolder">Haikus For Savages</Text>
      <Spacer/>
      <Text fontSize="lg" fontWeight="bold" mr={5}>Welcome {username}</Text>
      <Button onClick={toggleGameLog}>Game Log</Button>
    </Flex>
  </>
}

export default Header;

import React from 'react';
import useStore from '../store';
import { Flex , Spacer, Text} from '@chakra-ui/react';

function Header() {
  const username = useStore(store => store.username)
  return <>
    <Flex 
      maxW="100%" 
      align="center" 
      justify="center" 
      p={5} 
      boxShadow="lg"
    >
      <Text fontSize="2xl" fontWeight="bolder">Haikus For Savages</Text>
      <Spacer/>
      <Text fontSize="lg">Welcome {username}</Text>
    </Flex>
  </>
}

export default Header;

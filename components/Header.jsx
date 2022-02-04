import React, {useState} from 'react';
import useStore from '../store';
import { Flex , Spacer, Text, Button} from '@chakra-ui/react';
import SpeakerRulesModal from './SpeakerRulesModal'
import Link from 'next/link'

function Header() {
  const username = useStore(store => store.username)
  const toggleGameLog = useStore(store => store.toggleGameLog);
  const [modalOpen, setModalOpen] = useState(false);
  return <>
    <Flex 
      maxW="100%" 
      align="center" 
      justify="center" 
      p={5} 
      boxShadow="lg"
      backgroundColor="White"
    >
      <Link href="/">
        <Text cursor="pointer" fontSize="2xl" fontWeight="bolder">Haikus For Savages</Text>
      </Link>
      <Spacer/>
      <Text fontSize="lg" fontWeight="bold" mr={4}>Welcome {username}</Text>
      <Button mr={4} onClick={()=>setModalOpen(true)}>Rules</Button>
      <Button onClick={toggleGameLog}>Game Log</Button>
    </Flex>
    <SpeakerRulesModal open={modalOpen} onClose={() => setModalOpen(false)}/>
  </>
}

export default Header;

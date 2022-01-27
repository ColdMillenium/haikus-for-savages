import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Image,
  Center,
  Text,
  Flex,
  Spacer,
  Box
} from '@chakra-ui/react'
import { useEffect , useMemo} from 'react';
import useStore from '../store';


const imageUrls = [
  'https://i.giphy.com/media/26gswNS2Dm4q6600g/giphy.webp', 
  'https://i.giphy.com/media/11jPPp3IdY1wEU/giphy.webp',
  'https://i.imgur.com/QxmkxWX.gif',
  'https://i.giphy.com/media/TI9HiyUqRm75jPyKQ5/giphy.webp',
]

const zaWaRuDo = "https://www.myinstants.com/media/sounds/hd-stardust-crusaders-za-warudo.mp3";

const randomImg = () => {
  let list = [...imageUrls].sort(() => Math.random() - 0.5);
  return list[0];
}

const PunishmentModal = ({open}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const acceptPunishment = useStore(store => () =>store.playerAction(store.ACTION.ACCEPT_PUNISHMENT))
  const rejectPunishment = useStore(store => () => store.playerAction(store.ACTION.REJECT_PUNISHMENT))
  const {clientsRole} = useStore(store => store)
  console.log("clientsRole", clientsRole);
  const sound = new Audio(zaWaRuDo);
  
  useEffect(()=>{
    if(open){
      sound.play();
      
    }
  },[open])
  return (
    <>
      <Modal isOpen={open} onClose={onClose} rounded={5}>
        <ModalOverlay />
        <ModalContent  >
          <ModalHeader>
            <Center>Punishment!</Center>
            
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody m={0} p={0}>
            <Image with="100%" src={randomImg()} backgroundColor="red" alt='Funny Punishment Gif' />
            <Center>
              <Text textAlign="center" p={20} pt={5} pb={5}>Uh oh. Looks like the <strong>Punisher</strong> thinks the <strong>Speaker</strong> goofed up</Text>
            </Center>       
            
            
          </ModalBody>
          <ModalFooter w="100%" backgroundColor="red">
            <Flex direction="row" w="100%">
              <Box>
                <Button disabled={clientsRole!="Speaker"} onClick={acceptPunishment}>
                  Accept
                </Button>
              </Box>
              
              <Spacer/>
        
              <Box>
                <Button disabled={clientsRole!="Speaker"} onClick={rejectPunishment}>
                  Contest!
                </Button>
              </Box>
             
              
            </Flex>
            
          </ModalFooter>
          
        </ModalContent>
      </Modal>
    </>
  )
}

export default PunishmentModal;
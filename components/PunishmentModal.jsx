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
import { useEffect , useState} from 'react';
import useStore from '../store';
import {punishments} from '../utils/effects'

const PunishmentModal = ({open}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const punishmentEffectNum = useStore(store => store.room.punishmentEffectNum)
  const acceptPunishment = useStore(store => () =>store.playerAction(store.ACTION.ACCEPT_PUNISHMENT))
  const rejectPunishment = useStore(store => () => store.playerAction(store.ACTION.REJECT_PUNISHMENT))
  const [punishmentImage, setPunishmentImage] = useState()
  const {clientsRole} = useStore(store => store)
  
  
  useEffect(()=>{
    if(open){
      const num = Math.floor(punishmentEffectNum * (punishments.length - 1));
      const sound = new Audio(punishments[num].sound);
      setPunishmentImage(punishments[num].gif)
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
            <Image with="100%" src={punishmentImage} backgroundColor="red" alt='Funny Punishment Gif' />
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
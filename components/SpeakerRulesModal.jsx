import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Center,
} from '@chakra-ui/react'

import SpeakerRules from './SpeakerRules'

const SpeakerRulesModal = ({open, onClose}) => {
  return (
    <>
      <Modal isOpen={open} rounded={5} onClose={onClose}>
        <ModalOverlay />
        <ModalContent  >
          <ModalHeader>
            <Center>Speaker Rules:</Center>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
           <SpeakerRules/>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default SpeakerRulesModal;
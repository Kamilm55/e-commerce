import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text,
    Spinner,
    Button
  } from '@chakra-ui/react'
  import { useWishedContext  } from '../../../contexts/WishedContextProvider';


function LoadingModal() {
    const { isOpenLoading,  onCloseLoading } = useWishedContext()

  return (
    <div>
      <Modal isCentered={true} className="col-3 "  blockScrollOnMount={true}  isOpen={isOpenLoading} onClose={onCloseLoading}>
    <ModalOverlay bg='blackAlpha.200'/>
    <ModalContent className='py-4 my-auto loadingModal '>
      <ModalHeader className='text-center fs-3 '>Process in progress</ModalHeader>
      <ModalCloseButton />
          <Text className='text-center'>Please wait</Text>
      <ModalBody className='d-flex justify-content-center align-items-center'>
             <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
            />
      </ModalBody>

      
    </ModalContent>
  </Modal>
    </div>
  )
}

export default LoadingModal
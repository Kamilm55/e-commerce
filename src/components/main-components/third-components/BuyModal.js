import React, { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Input,
    Button
  } from '@chakra-ui/react'
  import { useWishedContext  } from '../../../contexts/WishedContextProvider';
  import {useToast} from "@chakra-ui/toast"


function BuyModal() {
    const {  isOpen ,onClose} = useWishedContext();
    const [first , setFirst] = useState("") ;
    const [last , setLast] = useState("") ;
    const [card , setCard] = useState("") ;
    const [date , setDate] = useState("") ;
    const toast = useToast();

    
    function handleSubmit(){
      if(first === "" || last === "" || card === "" || date === "" ){
        toast({
          title: 'Unsuccessful operation.',
          description:"You must fill every field" ,
          position: 'top',
          status: 'error',
          duration: 1800,
          isClosable: true,
        })
     
      }
      else{
        toast({
          title: 'Succesful operation.',
          position: 'top',
          variant:'top-accent' ,
          status: 'success',
          duration: 1800,
          isClosable: true,
        }) 
        onClose();
        setFirst("")
        setLast("")
        setCard("")
        setDate("")
      }
  }

    return (
    <Modal blockScrollOnMount={true} isCentered={true}  isOpen={isOpen} onClose={onClose}>
    <ModalOverlay bg='blackAlpha.200'/>
    <ModalContent>
      <ModalHeader>Confirm Payment</ModalHeader>
      <ModalCloseButton />
      <ModalBody className='d-flex flex-column gap-3 modalBody'>
        <Input onChange={(e)=>setFirst(e.target.value)} placeholder='First Name' value={first} size='md' />
        <Input onChange={(e)=>setLast(e.target.value)} placeholder='Last Name' value={last} size='md' />
        <Input onChange={(e)=>setCard(e.target.value)} placeholder='Card Number' value={card} size='md' />
        <Input onChange={(e)=>setDate(e.target.value)} placeholder='Expiry Date' value={date} size='md' />
      </ModalBody>

      <ModalFooter>
        <Button colorScheme='blue' mr={3} onClick={()=>{handleSubmit()}}>
          Pay
        </Button>
        <Button  mr={3} onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>

  )
}
export default BuyModal
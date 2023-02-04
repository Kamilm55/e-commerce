import React, { useEffect, useState } from 'react';
import { Card,Button,Image, Stack,Heading,Text,Divider,CardHeader , ButtonGroup, CardBody, CardFooter, HStack } from '@chakra-ui/react'
import {GrAdd} from 'react-icons/gr'
import {MdOutlineRemove} from 'react-icons/md'
import {RiDeleteBin6Line} from 'react-icons/ri'
import { useWishedContext } from '../../contexts/WishedContextProvider';
import LoadingModal from './third-components/LoadingModal';
import {useToast} from "@chakra-ui/toast"
import { useTheme } from '../../contexts/ThemeContextProvider';

function BasketCard({basketCount , uuid ,item}) {
  const {uploadtoBasket} = useWishedContext()
  const {themeIcon} = useTheme()
  const toast = useToast();
  const { isOpenLoading, onOpenLoading,  onCloseLoading } = useWishedContext()
  let actionType  ;

  function handleClick(){
    onOpenLoading();
    setTimeout(() => {
      onCloseLoading();
    }, "1000")
    setTimeout(() => {
      uploadtoBasket(item , actionType); 
    }, "1000")
    setTimeout(() => {
      toast({
        title: 'Succesful operation.',
        position: 'top-right',
        status: 'success',
        duration: 1800,
        isClosable: true,
      })    }, "1000")
  }
  const increase = () =>  actionType = "increase"
       
  const decrease = () =>   actionType = "decrease"
  
  const toRubbish = () =>  actionType = "toRubbish"


  return (
    <div>
        <Card 
    className={`my-3 basketcard d-flex justify-content-between ${themeIcon}`}
    backgroundColor="white"
    height='150px'
  direction={{ base: 'column', sm: 'row' }}
  overflow='hidden'
  variant='outline'
>

  <HStack>
  <Image
  className='my-auto mx-4'
    objectFit='cover'
    maxW={{ base: '100%', sm: '100px' }}
    maxH={{ base: '100%', sm: '100px' }}
    src={item.image}
    alt='Photo of the goods'
  />
    <CardBody>
      <Heading size='md'>{item.title}</Heading>
      {/* <Text py='2' className='fs-6 text-muted '>
       {item.description}
      </Text> */}
    </CardBody>

    <CardFooter>
    <div className="btn-group" role="group" aria-label="Basic example">
  <button  
  onClick={()=>{decrease();handleClick();}} type="button" disabled={item.counter === 1} className="btn  decrease border-dark"> <MdOutlineRemove/></button>
  <button  className="btn border border-dark ">{item.counter}</button>
  <button 
  onClick={()=>{increase();handleClick();}} type="button" className="btn  border-dark "><GrAdd/></button>
    </div>
    </CardFooter>
    <CardFooter>
     ${(item.counter * item.price).toFixed(2)}
    </CardFooter>
    <CardFooter>
     <button 
     onClick={()=>{toRubbish();handleClick();}}><RiDeleteBin6Line/></button>
    </CardFooter>
  </HStack>
</Card>
<LoadingModal/>
    </div>
  )
}

export default BasketCard
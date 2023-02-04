import React, { useEffect, useState } from 'react';
import { Card,Button,Image, Stack,Heading,Text,Divider,CardHeader , ButtonGroup, CardBody, CardFooter } from '@chakra-ui/react'
import {AiOutlineHeart , AiFillHeart} from 'react-icons/ai';
import { useWishedContext } from '../../contexts/WishedContextProvider';
import BuyModal from './third-components/BuyModal';
import {useToast} from "@chakra-ui/toast"
import { useTheme } from '../../contexts/ThemeContextProvider';

function CardExample({ index , item , basketCount }) {
    const { onOpen,allWished , firstMount ,  uploadWished ,uploadtoBasket, setAllWished ,basket , setBasket} = useWishedContext();
    const { themeIcon} = useTheme();
    const [ isChange , SetIsChange] = useState(false);
    const toast = useToast();
  /////////////////WishList logic ///////////////
    useEffect(()=>{

      if(allWished.filter(wished => wished.title === item.title).length > 0) 
      SetIsChange(true)
      else
     SetIsChange(false);
    
    
    },[allWished])

    useEffect(()=>{
      firstMount();
    },[])

    function wishClick() {
    uploadWished(item);
    toast({
      title: 'Wishlist is updating.',
      position: 'top-right',
      status: 'loading',
      duration: 1000,
      isClosable: true,
    })
    
    }
    /////////////////Basket logic ///////////////
  function basketClick(){
    uploadtoBasket(item);
    toast({
      title: 'Added to Cart.',
      position: 'top-right',
      status: 'success',
      duration: 1000,
      isClosable: true,
    }) 
  }

  return (
    <Card maxW='sm' className={`cards mt-3 ${themeIcon}`} key={index}>
  <CardBody >
    <div className='heart-wrapper mb-3'>
    {basketCount && <Text>You have <strong>{basketCount}</strong> items of this product in your basket </Text>} 
     <button onClick={wishClick}>
     {/* <AiFillHeart   size={30} className='heart-button' /> */}
     {isChange ? <AiFillHeart   size={30} className='heart-button' />  : <AiOutlineHeart size={30} className='heart-button' />} 
     </button>
    </div>
    <Image
    height="300px"
    width="100%"
      src={item.image}
      alt='Green double couch with wooden legs'
      borderRadius='lg'
    />
    <Stack mt='6' spacing='3'>
      <Heading size='md'>{item.title}</Heading>
      {/* <Text>
        {item.description}
      </Text> */}
      <Text color='blue.600' fontSize='2xl'>
        ${item.price}
      </Text>
    </Stack>
  </CardBody>
  <Divider />
  <CardFooter>
    <ButtonGroup spacing='2'>
      <Button
      onClick={onOpen}
      variant='solid' colorScheme='blue'>
        Buy now
      </Button>
      <Button
     onClick={basketClick}
      variant='ghost' colorScheme='blue'>
        Add to Cart
      </Button>

    </ButtonGroup>
  </CardFooter>
  <BuyModal/>
    </Card>
  )
}

export default CardExample
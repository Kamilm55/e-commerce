import React, { useEffect, useState } from 'react'
import { useWishedContext  } from '../../../contexts/WishedContextProvider';
import BasketCard from '../BasketCard';
import CardExample from '../CardExample';
import uuid from 'react-uuid';
import {useToast} from "@chakra-ui/toast"

function Basket() {
  const [totalCost , setCost] = useState(0);
  const {basket,setBasket } = useWishedContext();
  const toast = useToast();
  const { uploadtoBasket,isOpenLoading, onOpenLoading,  onCloseLoading } = useWishedContext()
  let sum = 0;

  useEffect(()=>{
    basket.forEach(basketItem =>{
      sum = sum + ( basketItem.counter * basketItem.price);
      setCost(sum);
    })
  },[basket])

  function handleClick(){
    onOpenLoading();
    setTimeout(() => {
      onCloseLoading();
    }, "1000")
    setTimeout(() => {
      toast({
        title: 'Your payment was accepted.',
        description:`You paid $${totalCost.toFixed(2)}`,
        position: 'top',
        variant: 'top-accent',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })    }, "1000");
      setTimeout(()=>{
        uploadtoBasket( '' ,  'deleteAll');
      },1100)
  }
  return (
    <div>
      {
      basket.length === 0 ? (
        <div>
          <h2 className='mt-5'>
          Your basket is empty.
          </h2>
        </div>
      ) : (
        basket
        .sort((a,b)=>{
          if(a.title.toLowerCase() < b.title.toLowerCase()) return -1;
          if(a.title.toLowerCase() > b.title.toLowerCase()) return 1;
          return 0;
        })
        .map( (basketElement ) =>{
          return <BasketCard basketCount={basketElement.count} item={basketElement}  key={uuid()}/>
        })
        
        )
    }
    {basket.length !== 0 ? (
      <>
             <h2>Total Cost: ${totalCost.toFixed(2)}</h2>
        <button onClick={handleClick} className='btn btn-dark mt-3 '>Confirm the payment</button>
      </>
    ): null
}
    </div>
    
  )
}

export default Basket
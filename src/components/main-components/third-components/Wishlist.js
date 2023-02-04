import React , {useContext, useEffect} from 'react';
import { useWishedContext  } from '../../../contexts/WishedContextProvider';
import CardExample from '../CardExample';


function Wishlist() {
  const {  allWished} = useWishedContext();

  return(
    <div className='row gap-3 '>
        {
           allWished.length === 0  ? (
            <div className='row d-flex justify-content-center align-items-center'>
                <p className='col-6 my-4'>
                Your Wishlist is currently empty. Be sure to fill your Wishlist with something you like by clicking on the heart icon and view them here before you checkout.
                </p>
            </div> 
          ) : (
            allWished.map( (item , index) => {
             return <CardExample key={index} item={item} index={index}  />
            })
          )
        }
    </div>
     
  )

}

export default Wishlist
import React, {  useEffect, useState } from 'react';
import { createContext , useContext , useReducer  } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import {auth ,db} from '../components/firebase';
import  {doc, collection,onSnapshot , getDoc, getDocs, getFirestore, updateDoc } from 'firebase/firestore';
import { userContext } from '../components/Auth';
import {
  onAuthStateChanged ,
  }  from 'firebase/auth'
  

 const WishedContext = createContext();

export const useWishedContext = () => useContext(WishedContext);

/// This is Providers for all not only wisheds
function WishedContextProvider({children}) {
  const [allWished , setAllWished] = useState([]);
  const [basket , setBasket] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {isOpen:isOpenLoading, onOpen:onOpenLoading,onClose:onCloseLoading } = useDisclosure()
  const {register , signIn , user ,setUser ,uId ,setUid } = useContext(userContext);
  // const [userId , setUserid] = useState("")
  let docRef;

  onAuthStateChanged(auth, (user) => {
     docRef = doc (db , "users" ,user.uid );
    });

    /////////////////Basket ///////////////
    async function uploadtoBasket(copyForBasket , actionType){
      try{
        const queries = await getDocs(collection (db , "users" ))
        queries.forEach( doc =>{     
          if(user.uid === doc.id){
            async function updataData(){
              if(basket.filter(basketItem => basketItem.title === copyForBasket.title).length === 0){
                Object.assign(copyForBasket , {counter:1})
                if(doc.data().basket){
                    await updateDoc( docRef ,{  
                      basket:[...doc.data().basket,copyForBasket]
                  })
                  }
                  else{
                    await updateDoc( docRef ,{  
                      basket:[copyForBasket]
                  })
                  }
                } 
                else{ /// Eger basketde 1 dene varsa artiq bu elementden
                  ///Arrayin icinden hazirdaki elementi alib firebasede bu titleye uygun gelen objecti
                  // kopyaliyiriq . Sonra object assign ederken firebasedeki kopyalanmis 
                  //counterin ustune elave etmis oluruq
                  const CounterElForCopy = doc.data().basket.filter( notWished => notWished.title === copyForBasket.title)
                  if(actionType === "decrease"){
                    CounterElForCopy.forEach(copy =>{
                      Object.assign(copyForBasket , {counter:copy.counter - 1})
                    })
                  }
                  else{
                    CounterElForCopy.forEach(copy =>{
                      Object.assign(copyForBasket , {counter:copy.counter + 1})
                    })
                  }
                  const newBasket = doc.data().basket.filter( notWished => notWished.title !== copyForBasket.title)
                  if(actionType === "toRubbish"){
                    await updateDoc( docRef ,{  
                      basket:[...newBasket]
                  })
                  return;
                  }
                  await updateDoc( docRef ,{  
                    basket:[...newBasket,copyForBasket],
                })
                }
              }

              updataData();
        
            }})
          }
      catch(e){
        console.log(e);
      }
      
    }
  
    /////////////////WishList  ///////////////
    async function firstMount(){
      const queries = await getDocs(collection (db , "users" ))
      queries.forEach( doc =>{     
        if(auth.currentUser.uid === doc.id){
          if(doc.data().wishlist){
            setAllWished(doc.data().wishlist);
          }
          if(doc.data().basket)
          setBasket(doc.data().basket)
        }
          })
  }

    async function uploadWished(copyWished) {
      try{
          const queries = await getDocs(collection (db , "users" ))
          queries.forEach( doc =>{     
            if(user.uid === doc.id){
                // console.log(doc.data().wishlist);
              async function updataData(){
                if(allWished.filter(wished => wished.title === copyWished.title).length === 0){
                if(doc.data().wishlist){
                      await updateDoc( docRef ,{  
                        wishlist:[...doc.data().wishlist,copyWished]
                    })
                    }
                    else{
                      await updateDoc( docRef ,{  
                        wishlist:[copyWished]
                    })
                    }
                  } 
                  else{
                    const newWishlist = doc.data().wishlist.filter( notWished => notWished.title !== copyWished.title)
                    await updateDoc( docRef ,{  
                      wishlist:[...newWishlist],
                  })
                  }
                }
                updataData();
            }
            } )
  }
    catch (e){
      console.log(e);
    }
  }

 ////////////////////////////////////////////
  useEffect(()=>{
    if(!auth.currentUser )
      return;
      
  onSnapshot(doc(db, "users", auth.currentUser.uid), (doc) => {
    if(doc.data().wishlist)
    setAllWished( doc.data().wishlist);
    if(doc.data().basket)
    setBasket(doc.data().basket);
    });

    //Her deyisiklik olanda firebasede auth.currentUserde deyisir 
  },[auth.currentUser])


  return (
   <WishedContext.Provider
    value={{uploadWished , firstMount, basket,setBasket,uploadtoBasket,
    isOpen,onClose,onOpen , allWished , setAllWished,
    isOpenLoading, onOpenLoading, onCloseLoading}}
    >
    {children}
   </WishedContext.Provider>
  )
  
}

  
export default WishedContextProvider
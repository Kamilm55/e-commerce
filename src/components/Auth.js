import React, { useEffect, useState } from "react";
import {
    onAuthStateChanged ,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
    }  from 'firebase/auth'

import firebaseApp, {auth, db} from './firebase'
import { addDoc, collection, doc, getDocs, getFirestore, query, setDoc } from "firebase/firestore";
import { createContext } from "react";
import { async } from "@firebase/util";

export const userContext = createContext();
//////////////////////////////
function UserContextProvider(props) {
    const [user , setUser] = useState('');

    function register(email , password , firstName , lastName){
       return  createUserWithEmailAndPassword(auth , email , password)
        //  .then(cred => {
        //   const newUsersRef =  doc(db, "users",cred.user.uid  );
        //      setDoc(newUsersRef, {
        //     name: `${firstName} ${lastName}`,
        //     id:cred.user.uid,
        // })
        // })
    }
    
    function signIn(email , password){
    return  signInWithEmailAndPassword(auth , email , password) 
    }

    useEffect( () => {
        findCurrentUser();
        async function findCurrentUser(){
            onAuthStateChanged( auth , (currentUser) =>{
                setUser(currentUser)
                        })
        }
       
    },[])

    return (
        <userContext.Provider value={{register , signIn , user ,setUser }}>
            {props.children}
        </userContext.Provider>
    )
}

export default UserContextProvider;
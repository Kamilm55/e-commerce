import React, { useEffect, useState } from 'react'
import {Heart , CartPlus} from 'react-bootstrap-icons'
import { addDoc, collection, doc, getDocs, updateDoc, query, setDoc } from "firebase/firestore";
import { async } from '@firebase/util';
import {db} from '../firebase'
import CardExample from './CardExample';

function Goods(props) {
  
  return (
    <div > 
    <div className='row gap-3  '>

        {props.dataApi.map( (item , index) => {
          if((props.link === 'Clothes' && item.category.includes('cloth')) || props.link === 'All' || item.category.toUpperCase() === props.link.toUpperCase()){
             
              if(item.title.toUpperCase().includes(props.inputValue.toUpperCase() ) ){
          return(
            <CardExample item={item} index={index}  key={index}/>
          )}}
        }
        )}
        
      
     </div>
    </div>
  )
}

export default Goods
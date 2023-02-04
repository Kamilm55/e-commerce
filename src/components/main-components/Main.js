import React, { useEffect, useState } from 'react'
import '../../Main.css'
import { useNavigate } from 'react-router-dom';
import Goods from './Goods';
import {  Search } from 'react-bootstrap-icons'
import {Tabs, Tab ,TabList ,Button} from '@chakra-ui/react'

function Main(props) {
    const navigate = useNavigate();
   
    const [inputValue , setInputValue] = useState('');
    const [link , setLink] = useState('All')
    const [dataApi , setDataApi] = useState([]);

    
    ////////
    function handleclick(e) {
      if(e.target.innerHTML === 'Jewelery' || e.target.innerHTML === 'Electronics' || e.target.innerHTML === 'Clothes' || e.target.innerHTML === 'All' )
      setLink(e.target.innerHTML);
    }
    /////
    function enterFunc(e) {
      e.preventDefault();
        setInputValue(e.target.value);      
    }
////////////////////////////////////////////////////////////////////
    useEffect( () => {
       
            // declare the async data fetching function
  const fetchData = async () => {
    // get the data from the api
    const response =  require('../Datas.json');
 
    setDataApi(response);
  }

  // call the function
  fetchData()
    // make sure to catch any error
    .catch(console.error);
   
    },[])

    return (
    <div className='container  main'>
    

    <div className='row mt-4'>

        <h1>
            Popular Tech Staff .
        </h1>
        <p className='text-muted fs-6'>High Quality Products With Custom Offers And Fixed Price.</p>
        <p>{props.name}</p>

        <div className='input-group mt-4'>
        <div className="input-group-text">
        <Search color='black'/>
        </div>
        <input placeholder='Search...'
        onKeyUp={enterFunc}
        // value={inputValue}
        type="text" className='form-control ' />
        </div>
        </div>

      <div className='row my-5 '>
        <div onClick={handleclick} className='col-8 d-flex justify-content-evenly gap-3 mx-auto'>
        <Tabs isLazy>
  <TabList>
    <Tab><h6  className='goods-link '>All</h6></Tab>
    <Tab><h6 className='goods-link '>Electronics</h6></Tab>
    <Tab><h6 className='goods-link '>Clothes</h6></Tab>
    <Tab><h6 className='goods-link '>Jewelery</h6></Tab>
  </TabList>
        </Tabs>
        </div>
      </div>

      <div className='row'>
        <Goods userName={props.name} inputValue={inputValue} dataApi={dataApi}  link={link}/>       
      </div>
        
      <Button 
       onClick={()=> navigate("/")}
       className='btn btn-dark my-3'
      colorScheme='black'>Log out</Button>       
          
      <hr />
      <footer>
        <p>All Copyright Reserved © 2022 Made By <a href='https://github.com/Kamilm55' target="blank">Kamil</a></p>
      </footer>
    </div>
  )
}

export default Main
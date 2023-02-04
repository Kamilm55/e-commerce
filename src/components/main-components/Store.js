import React, { useEffect, useState } from 'react'
import Main from './Main'
import {useLocation , useNavigate}  from 'react-router-dom'
import { CartPlus, Heart, Moon, Search , BrightnessHigh} from 'react-bootstrap-icons'
import Wishlist from './third-components/Wishlist';
import Basket from './third-components/Basket';
import { useWishedContext } from '../../contexts/WishedContextProvider';
import { useTheme } from '../../contexts/ThemeContextProvider';

function Store() {
    const navigate = useNavigate();
    const location = useLocation();
    const [data ,setData] = useState('');
    const [clickedLink , setLink] = useState('main')
    const [basketCount , setBasketCount] = useState(0);
    const [person , setPerson] = useState(false);
    const {allWished , basket} = useWishedContext();
    const {themeIcon,setThemeIcon} = useTheme();


  let sum = 0;

    useEffect( () =>{
        setData(location.state.data)
    })

    useEffect( () =>{
      basket.forEach(basketItem =>{
        sum = sum + basketItem.counter;
        setBasketCount(sum);
      })
  },[basket])
 
  return (
    <div>
    <nav className='row py-3 navbar  '>
        <button onClick={() => setLink("main")} className='nav-links col-6 nav-brand   ' ><p >E-commerce</p></button>
        <button onClick={()=>themeIcon === "moon" ? setThemeIcon("sun") : setThemeIcon("moon") }  className='nav-links col-2 moon '>
          {themeIcon === "moon" ? <Moon size={27}/> : <BrightnessHigh className='text-light' size={27}/> }
          </button>
        <button onClick={() => setLink("wishlist")} className='nav-links col-2 Heart ' ><Heart size={27}/>
        {(allWished.length > 0) && <span className="badge bg-danger badge-pill rounded-pill badge-danger ">{allWished.length}</span>}</button>
        <button onClick={() => setLink("basket")} className='nav-links col-2 Basket'><CartPlus size={27}/>
        {(basket.length > 0) && <span className="badge bg-danger badge-pill rounded-pill badge-danger ">{basketCount}</span>}</button>
    </nav>

    {clickedLink === 'main'  ? <Main name={data.name} id={data.id} />: null}
    {clickedLink === 'wishlist' ? <Wishlist />: null}
    {clickedLink === 'basket' ? <Basket />: null}
  

    </div>
  )
}

export default Store
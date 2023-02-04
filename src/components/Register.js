import { async } from '@firebase/util';
import React, { useEffect } from 'react';
import {useRef , useState , useContext} from 'react';
import {userContext} from './Auth';
import { Link} from 'react-router-dom'
import {db} from './firebase';
import { addDoc, collection, doc, getDocs, getFirestore, query, setDoc } from "firebase/firestore";


function Register() {
  const [dataApi ,setDataApi] = useState('');
  const {register , signIn , user ,setUser ,uId ,setUid } = useContext(userContext);
   
  ///////////////////////////////////////////
  const firstInputRef = useRef(null);
    const secondInputRef = useRef(null);
    const thirdInputRef = useRef(null) ;
    const fourthInputRef = useRef(null) ;
    ////// USESTATE hooklar en basda olmalidir
    const [value , setValue] = useState({
      firstName: "",
      lastName: "" ,
      email:  "",
      password: "",
  })
  ////////////////////////////
    const [valid , setValid] = useState(false);
    const [errorMsg , setErrorMsg] = useState('');
    ///////////////////////
    const [submitted , setSubmitted] = useState(false);
   
   useEffect( () =>{
    if(value.firstName && value.lastName && value.email && value.email.includes("@") && value.password){ 
      setValid(true);
    }  else {
      setValid(false);
    }
   
  } , [value]);

  
  useEffect( () => {  
        // declare the async data fetching function
    const fetchData = async () => {
    // get the data from the api
    const response = await fetch('https://fakestoreapi.com/products');
    // convert the data to json
    const json = await response.json();
    // set state with the result
    setDataApi(json);
    }

    // call the function
    fetchData()
    // make sure to catch any error
    .catch(console.error);;

},[])

    async function btnSubmit (e) {
       e.preventDefault();
       
       if(valid === true){
       try {
         await register(value.email , value.password ,value.firstName , value.lastName)
         .then(cred => {
          const newUsersRef =  doc(db, "users",cred.user.uid  );
             setDoc(newUsersRef, {
            name: `${value.firstName} ${value.lastName}`,
            id:cred.user.uid,
        });
        setUid(cred.user.uid);
        })
         setErrorMsg('');         
     } catch (error) {
       setErrorMsg(error.message);
    }
    }
        setSubmitted(true);          
    }
    ///////////////////
  
    function submitHandler(e) {
      e.preventDefault();
      setValue({
        ...value,
        firstName: firstInputRef.current.value,
        lastName: secondInputRef.current.value,
        email: thirdInputRef.current.value,
        password: fourthInputRef.current.value,
      })  
    }

  return (
    <div className='Register-div'>
        <h1> Register</h1>
             <form>
      <div className='formDiv d-flex flex-column gap-4  p-4 px-5'>      
  {/* rendering alert depending on state of submitted or not */}  
    
    { submitted && valid && !errorMsg ? <div className='succes-message alert bg-success my-0 text-light '> Success ! You can sign in your account</div>  : null}
    {submitted /* && !valid */ && errorMsg ? <p className='alert alert-danger'>{errorMsg}</p> : null  }  
    
            <div className='inputGroup d-flex flex-column'> 
            <input
             value={value.firstName}
             onChange={submitHandler} 
             ref={firstInputRef} type="text" id='fname'  placeholder='First Name' className='px-3 py-2'/>
{submitted && !value.firstName ? <span className='text-light bg-danger p-2 my-1 '> Please write a First Name</span>  : null}                     
            </div>

            <div className='inputGroup d-flex flex-column'>
            <input 
            value={value.lastName}
             onChange={submitHandler} 
             ref={secondInputRef} type="text" id='lname' placeholder='Last Name' className='px-3 py-2'/>
{submitted && !value.lastName ? <span className='text-light bg-danger p-2 my-1 '> Please write a Last Name</span>  : null}                     
            </div>

            <div className='inputGroup d-flex flex-column'>
            <input 
            value={value.email}
             onChange={submitHandler} 
             ref={thirdInputRef} type="email" id='email' placeholder='Email' className='px-3 py-2'/>
{submitted && /* !value.email && */ !value.email.includes("@") ? <span className='text-light bg-danger p-2 my-1 '> Please write an Email which contains "@" sign</span>  : null}                     
            </div>

            <div className='inputGroup d-flex flex-column'>
            <input 
            name='password'
            autoComplete='on'
            value={value.password}
             onChange={submitHandler} 
             ref={fourthInputRef} type="password" id='password' placeholder='Password' className='px-3 py-2'/>
{submitted &&  !value.password ? <span className='text-light bg-danger p-2 my-1 '> Please write a password</span>  : null}                     
            </div>

            <button
            onClick={btnSubmit}
            type='submit' className='px-3 py-2 rounded'>
               Register
            </button>
  <Link to="/" className='nav-item' >Sign In</Link>

        </div>
          </form>
    </div>
  )
}
export default Register;
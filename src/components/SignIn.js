import React from 'react'
import { Link ,  useNavigate} from 'react-router-dom'
import {useRef  , useState , useContext} from 'react'
import {userContext} from './Auth';
import firebaseApp, {auth, db} from './firebase'
import { addDoc, collection, doc, getDocs, getFirestore, query, setDoc } from "firebase/firestore";


function SignIn() {
  const {register , signIn , user , setUser} = useContext(userContext);
  const navigate = useNavigate();
  const thirdInputRef = useRef(null) ;
  const fourthInputRef = useRef(null) ;
////// USESTATE hooklar en basda olmalidir
// Hesaba grir amma hardan bilim girmisem
// birde nece istifade edim datalari
const [submitted ,setSubmitted] = useState(false);
const [value , setValue] = useState({
  email:  "",
  password: "",
})
const [errorMsg , setErrorMsg] = useState('');

async function btnSubmit (e) {
  e.preventDefault();
  
    try {
      await signIn(value.email , value.password )
       .then(async (cred) =>{
        const q = query(collection(db , "users"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach( doc =>{
            if(doc.id === cred.user.uid){
              navigate("/store" ,{
                state: {
                 data:doc.data(),
               }} );
            }
    })
     } )
     
      setErrorMsg('');
  } catch (error) {
    setErrorMsg(error.message);
    }
    setSubmitted(true);  
  }
  function submitHandler(e) {
    e.preventDefault();
    setValue({
      ...value,
      email: thirdInputRef.current.value,
      password: fourthInputRef.current.value,
    })  
  }
  return (
    <div>
      <h1>Sign in</h1>
     { submitted && !errorMsg ? <div className='succes-message alert bg-success my-0 text-light '> Success ! You can sign in your account</div>  : null}
     {submitted /* && !valid */ && errorMsg ? <p className='alert alert-danger'>{errorMsg}</p> : null  }  
<form>
       <div className='inputGroup d-flex flex-column'>
            <input 
            value={value.email}
             onChange={submitHandler} 
             ref={thirdInputRef} type="email" id='email' placeholder='Email' className='px-3 py-2'/>
{/* {submitted &&  !value.email.includes("@") ? <span className='text-light bg-danger p-2 my-1 '> Please write an Email which contains "@" sign</span>  : null}                      */}
            </div>

            <div className='inputGroup d-flex flex-column'>
            <input 
            name='password'
            autoComplete='on'
            value={value.password}
             onChange={submitHandler} 
             ref={fourthInputRef} type="password" id='password' placeholder='Password' className='px-3 py-2'/>
{/* {submitted &&  !value.password ? <span className='text-light bg-danger p-2 my-1 '> Please write a password</span>  : null}                      */}
            </div>
           
            <button 
            onClick={btnSubmit}
            type="submit"
            className='btn btn-dark'>Sign in</button>
    {/* {succes ? useNavigate().push("/main") : null} */}
    <p>If you don't have an account</p>
    <Link to="/register" className='nav-item' >Sign Up</Link>
</form> 
    </div>
  )
}

export default SignIn ;

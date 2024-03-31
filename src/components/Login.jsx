import React, { useRef, useState } from 'react';
import Header from './Header';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [nameError, setNameError] = useState(null);
    const [authError,setAuthError]= useState(null);

    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null);
    const toggleSignInForm=()=>{
        setAuthError(null);
        setIsSignInForm(!isSignInForm);
    }
    const handleButtonClick=()=>{
        if(emailError||passwordError||nameError)return;
        if(!isSignInForm)
        {
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
              .then((userCredential) => {
                const user = userCredential.user;
                setAuthError(null);
                updateProfile(user, {
                    displayName: name.current.value
                  }).then(() => {
                    const {uid,email,displayName} = auth.currentUser;
                    dispatch(addUser({uid:uid,email:email,displayName:displayName}));
                    navigate("/browse");
                  }).catch((error) => {
                    setAuthError(error.message);
                  });
                
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setAuthError(errorMessage);
              });
        }else{
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                const user = userCredential.user;
                setAuthError(null);
                navigate("/browse");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setAuthError(errorMessage);
            });
        }
    }
    const handleBlur = (e)=>{
        switch (e.target.name) {
            case 'email':
                if(!e.target.value || e.target.value.length<5)
                {
                    setEmailError("Please enter a valid email address.")
                }else{
                    setEmailError(null);
                }
                break;
            case 'password': 
                if(!e.target.value || e.target.value.length<4 || e.target.value.length>20)
                {
                    setPasswordError("Your password must contain between 4 and 20 characters.")
                }else{
                    setPasswordError(null);
                }
                break;
            case 'fullname':
                if(!e.target.value)
                {
                    setNameError("Please enter a full name.")
                }else{
                    setNameError(null);
                }
                break;
            default:
                break;
        }
    }
    console.log(emailError);
    console.log(passwordError);
  return (
    <div>
        <Header/>
        <div className='absolute'>
            <img
            src='https://assets.nflxext.com/ffe/siteui/vlv3/7ca5b7c7-20aa-42a8-a278-f801b0d65fa1/fb548c0a-8582-43c5-9fba-cd98bf27452f/IN-en-20240326-popsignuptwoweeks-perspective_alpha_website_large.jpg'
            alt='background'/>
        </div>
        <form onSubmit={(e)=>e.preventDefault()} className='absolute p-12 bg-black w-3/12 my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
            <h1 className='font-bold text-3xl py-4'>{isSignInForm?"Sign In":"Sign Up"}</h1>
            {!isSignInForm &&  <input ref={name} name='fullname' type='text' 
            placeholder='Full Name' 
            className={`p-4 my-4 w-full bg-transparent border-solid border-2 rounded-lg ${!nameError?'border-white':'border-red-500'}`}
            onBlur={handleBlur}/>}
            {!isSignInForm && nameError && <p 
            className='text-red-500 font-bold text-sm py-2'>{nameError}</p>}
            <input ref={email} 
            name='email'
            type='text' placeholder='Email Address' 
            className={`p-4 my-4 w-full bg-transparent border-solid border-2 rounded-lg ${!emailError?'border-white':'border-red-500'}`}
            onBlur={handleBlur}/>
            {emailError && <p className='text-red-500 font-bold text-sm py-2'>{emailError}</p>}
            <input ref={password} name='password' type='password' 
            placeholder='Password' className={`p-4 my-4 w-full bg-transparent border-solid border-2 rounded-lg ${!passwordError?'border-white':'border-red-500'}`}
            onBlur={handleBlur}/>
            {passwordError && <p className='text-red-500 font-bold text-sm py-2'>{passwordError}</p>}
            <button className='p-4 my-6 bg-red-600 w-full rounded-lg' onClick={handleButtonClick}>{isSignInForm?"Sign In":"Sign Up"}</button>
            {authError && <p className='text-red-500 font-bold text-sm py-2'>{authError}</p>}
            {isSignInForm?
             <p className='py-4 cursor-pointer font-semibold hover:underline'onClick={toggleSignInForm}>New to Netflix? Sign Up Now</p>
            : <p className='py-4 cursor-pointer font-semibold hover:underline'onClick={toggleSignInForm}>Already registered? Sign In Now</p>
            }
        </form>
    </div>
  )
}

export default Login
import React, { useState } from 'react'
import Header from './Header'

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const toggleSignInForm=()=>{
        setIsSignInForm(!isSignInForm);
    }
  return (
    <div>
        <Header/>
        <div className='absolute'>
            <img
            src='https://assets.nflxext.com/ffe/siteui/vlv3/7ca5b7c7-20aa-42a8-a278-f801b0d65fa1/fb548c0a-8582-43c5-9fba-cd98bf27452f/IN-en-20240326-popsignuptwoweeks-perspective_alpha_website_large.jpg'
            alt='background'/>
        </div>
        <form className='absolute p-12 bg-black w-1/5 my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
            <h1 className='font-bold text-3xl py-4'>{isSignInForm?"Sign In":"Sign Up"}</h1>
            {!isSignInForm &&  <input type='text' placeholder='Full Name' className='p-4 my-4 w-full bg-transparent border-solid border-2 border-white rounded-lg'/>}
            <input type='text' placeholder='Email Address' className='p-4 my-4 w-full bg-transparent border-solid border-2 border-white rounded-lg'/>
            <input type='password' placeholder='Password' className='p-4 my-4 w-full bg-transparent border-solid border-2 border-white rounded-lg'/>
            <button className='p-4 my-6 bg-red-600 w-full rounded-lg'>{isSignInForm?"Sign In":"Sign Up"}</button>
            {isSignInForm?
             <p className='py-4 cursor-pointer font-semibold'onClick={toggleSignInForm}>New to Netflix? Sign Up Now</p>
            : <p className='py-4 cursor-pointer font-semibold'onClick={toggleSignInForm}>Already registered? Sign In Now</p>
            }
        </form>
    </div>
  )
}

export default Login
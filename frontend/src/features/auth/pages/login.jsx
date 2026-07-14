import React, { useRef } from 'react'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const login = () => {

    const { loading, handleLogin } = useAuth()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const containerRef = useRef(null)

    useGSAP(()=>{
        if(!loading){
            gsap.from(".animate",{
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out"
            })
        }
    }, { scope: containerRef, dependencies: [loading] } )

    if(loading){
        return (<main><h1>Loading.......</h1></main>)
    }

  return (
    <main ref={containerRef}>
        <div>
            <h1 className='animate'>Login</h1>
            <form onSubmit={async (e)=>{
                e.preventDefault()
                await handleLogin({username,password})
                navigate('/')
            }}>
                <div className='animate'>
                    <label htmlFor="username">Username</label>
                    <input 
                        type="text" 
                        name="username" 
                        placeholder='Enter Your Username'
                        onChange={(e)=>{
                            setUsername(e.target.value)
                        }}
                    />
                </div>
                <div className='animate'>
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        placeholder='Enter Your Password'
                        onChange={(e)=>{
                            setPassword(e.target.value)
                        }}
                    />
                </div>
                <button className='animate'>
                    Login
                </button>
            </form>
            <span className='animate'>
                Don't have Account 
                <Link to={"/register"} >
                    Register
                </Link>
            </span>
        </div>
    </main>
  )
}

export default login
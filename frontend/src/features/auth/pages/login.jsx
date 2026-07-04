import React from 'react'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const login = () => {

    const { loading, handleLogin } = useAuth()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    if(loading){
        return (<main><h1>Loading.......</h1></main>)
    }

  return (
    <main>
        <div>
            <h1>Login</h1>
            <form onSubmit={async (e)=>{
                e.preventDefault()
                await handleLogin({username,password})
                navigate('/')
            }}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input 
                        type="username" 
                        name="username" 
                        placeholder='Enter Your Username'
                        onChange={(e)=>{
                            setUsername(e.target.value)
                        }}
                    />
                </div>
                <div>
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
                <button>
                    Login
                </button>
            </form>
            <span>Don't have Account <Link to={"/register"} >Register</Link></span>
        </div>
    </main>
  )
}

export default login

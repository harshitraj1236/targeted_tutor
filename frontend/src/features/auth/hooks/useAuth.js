import { AuthContext } from "../auth.context";
import { useContext, useEffect } from "react";
import { login, register, logout, getMe } from "../services/auth.api";

export const useAuth = () => {

    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context

    const handleLogin = async ({ username, password }) => {
        setLoading(true)
        try{
            const data = await login({ username, password })
            setUser(data.user)
        }
        catch(error){

        }
        finally{
            setLoading(false)
        }
    }

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true)
        try{
            const data = await register({ username, email, password })
            return setUser(data.user)
        }
        catch(error){
            console.log(error)
        }
        finally{
            setLoading(false)
        }
    }

    const handleLogOut = async () => {
        setLoading(true)
        try{
            const data = await logout()
            setUser(null)
        }
        catch(error){
            console.log(error)
        }
        finally{
            setLoading(false)
        }
    }

    useEffect( ()=>{
        const handleGetMe = async () => {
            try{
                const data = await getMe()
                setUser(data.user)
            }
            catch(error){
                console.log(error);
            }
            finally{
                setLoading(false)
            }
        }
        handleGetMe()
    },[])

    return { user, loading, handleRegister, handleLogin, handleLogOut }
}
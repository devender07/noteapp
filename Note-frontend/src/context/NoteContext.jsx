import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const NoteContext = createContext(null);

export const NoteProvider = (props) =>{

    const [isLogin, setIsLogin] = useState(false);
    const [error,setError] = useState('');
    const [ reload, setReload] = useState(false);
    const [loaded,setLoaded] = useState(false);


    useEffect(()=>{

        const connect = async()=>{
            const response = await axios.get('https://noteapp-kmvp.onrender.com')
            setLoaded(true)
        }
        connect()

        const token = localStorage.getItem('token')
        if(token){
            setIsLogin(true)
        }else{
            setIsLogin(false)
        }
    },[isLogin])


    const login = async(email,password)=>{
        try {
            const response = await axios.post('https://noteapp-kmvp.onrender.com/api/auth/login',{
            email,
            password
        })
        setIsLogin(true)
        return response.data

        } catch (error) {
            setError(error.response.data.message)
        }
        
    }

    const register = async(name,email,phone,password)=>{
        try {
            const response = await axios.post('https://noteapp-kmvp.onrender.com/api/auth/register',{
            name,
            email,
            phone,
            password
        })
        setIsLogin(true)
        return response.data

        } catch (error) {
            setError(error.response.data.message)
        }
    }

    const logout = async()=>{
        setIsLogin(false)
        localStorage.removeItem('token')
    }

    const createNote = async(title, content)=>{
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('https://noteapp-kmvp.onrender.com/api/notes',
        {
            title,
            content
        },
        {
            headers:{
                Authorization :`Bearer ${token}`
            }
        })
        setReload(true)
        if(reload){
            setReload(false)
        }
        } catch (error) {
            setError(error)  
        }
        
    }

    const getNotes = async()=>{
        try {
            const token = localStorage.getItem('token')
            const response = await axios.get('https://noteapp-kmvp.onrender.com/api/notes',{
                headers:{
                    Authorization :`Bearer ${token}`
                }
            })
        return response.data

        } catch (error) {
            setError(error)   
        }
    }

    const getNote = async(id)=>{
        try {
            const token = localStorage.getItem('token')
            const response = await axios.get(`https://noteapp-kmvp.onrender.com/api/notes/${id}`,{
                headers:{
                    Authorization :`Bearer ${token}`
                }
            })
        return response.data

        } catch (error) {
            setError(error)   
        }
    }

    const updateNote = async(id,newData)=>{
        try {
            const token = localStorage.getItem('token')
            const response = await axios.put(`https://noteapp-kmvp.onrender.com/api/notes/${id}`,
            newData,
            {
                headers:{
                    Authorization :`Bearer ${token}`
                },

            })
        return response.data

        } catch (error) {
            setError(error)   
        }
    }

    const deleteNote = async(id)=>{
        try {
            const token = localStorage.getItem('token')
            const response = await axios.delete(`https://noteapp-kmvp.onrender.com/api/notes/${id}`,
            {
                headers:{
                    Authorization :`Bearer ${token}`
                },

            })
        setReload(true)
        if(reload){
            setReload(false)
        }
        return "Deleted"
        } catch (error) {
            setError(error)   
        }
    }

    return (
        <NoteContext.Provider value={{
            login,
            isLogin,
            error,
            reload,
            loaded,
            register,
            logout,
            getNotes,
            getNote,
            createNote,
            updateNote,
            deleteNote,
        }}>{props.children}
        </NoteContext.Provider>
    )
} 
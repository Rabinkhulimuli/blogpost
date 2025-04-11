"use client"
import { blogPosts } from '@/config/blog'
import React, { createContext, useContext, useEffect, useState } from 'react'
type User={
        name:string,
        email:string,
        password:string
}
type authContextType={
    user:User | null,
    isLoggedIn:boolean,
    setUser: React.Dispatch<React.SetStateAction<User|null>>,
    setIsLoggedIn:React.Dispatch<React.SetStateAction<boolean>>,
    blogs:typeof blogPosts ,
    setBlogs:React.Dispatch<React.SetStateAction<typeof blogPosts>>,
    login: (userData: User) => void
    logout: () => void
    deleteUser:()=> void
    signin:(user:User)=> void

}
export const AuthContextG= createContext<authContextType|undefined>(undefined)
export  function AuthProvider({children}:{children:React.ReactNode}) {
    const [user,setUser]= useState<User | null>(null)
    const[isLoggedIn,setIsLoggedIn]= useState(false)
    const [blogs, setBlogs] = useState<typeof blogPosts >([]);
    useEffect(()=> {
        const sortedBlog= [...blogPosts].sort((a,b)=> new Date(b.date).getTime()- new Date(a.date).getTime())
        setBlogs(sortedBlog)
        localStorage.setItem("blogPost",JSON.stringify(sortedBlog))
    },[])
    const login=(user:User)=>{
        localStorage.setItem("user",JSON.stringify(user))
        setIsLoggedIn(true)
        setUser(user)
    }
    const deleteUser=()=> {
        localStorage.setItem("user","")
        setIsLoggedIn(false)
        setUser(null)
    }
    const logout=()=> {
        setIsLoggedIn(false)
        setUser(null)
    }
    const signin=(user:User)=> {
        localStorage.setItem("user",JSON.stringify(user))
    }
  return (
    <AuthContextG.Provider value={{user,setUser,isLoggedIn,setIsLoggedIn,blogs,setBlogs,login,logout,deleteUser,signin}}>
        {children}
    </AuthContextG.Provider>
  )
}
export const useAuth = () => {
    const context = useContext(AuthContextG)
    if (context === undefined) {
      throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
  }
"use client";
import Link from "next/link";
import {usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";

export default function Navbar() {
  const pathname = usePathname();
  const {logout,isLoggedIn}= useAuth()
  const newPath = pathname.replace("/", "");
  const[client,setIsClient]= useState(false)
  useEffect(()=> {
    setIsClient(true)
  },[])
  if(!client) return <div>loading...</div>
  const handleLogOut = () => {
    logout()
  };
  const signedup= localStorage.getItem("user")
  return (
    <div className="flex gap-2 w-full justify-end px-18   border-b-1 mb-2">
      <div className="flex justify-between  text-lg font-semibold">
        <Link
          className={`transition-all ease-out duration-500 hover:bg-black hover:text-white py-4  w-32 text-center  ${
            newPath == "" ? "underline" : ""
          }`}
          href="/"
        >
          Home
        </Link>
        <Link
          className={`transition-all ease-out duration-500 hover:bg-black hover:text-white py-4  w-32 text-center  ${
            newPath == "blog" ? "underline" : ""
          }`}
          href="/blog"
        >
          Blog
        </Link>
        {!signedup? 
           
         (!isLoggedIn&& <Link
            className={`transition-all ease-out  duration-500 hover:bg-black hover:text-white py-4  w-32 text-center  ${
              newPath == "signup" ? "underline" : ""
            }`}
            href="/signup"
          >
            Signup
          </Link>):
          (!isLoggedIn&&<Link
            className={`transition-all ease-out  duration-500 hover:bg-black hover:text-white py-4  w-32 text-center  ${
              newPath == "signup" ? "underline" : ""
            }`}
            href="/login"
          >
            Login
          </Link>)
          }
       
        {isLoggedIn && (
          <button
            className={`transition-all ease-out duration-500 hover:bg-black hover:text-white py-4  w-32 text-center`}
            onClick={handleLogOut}
          >
            LogOut
          </button>
        )}
       
      </div>
    </div>
  );
}

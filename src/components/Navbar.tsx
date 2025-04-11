"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";

export default function Navbar() {
  const pathname = usePathname();
  const { logout, isLoggedIn, deleteUser, user } = useAuth();
  const [active, setActive] = useState(false);
  const newPath = pathname.replace("/", "");
  const [client, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  useEffect(()=> {
    if(active){
      const timeout=setTimeout(()=> {
        setActive(false)
      },5000)
      return ()=> clearTimeout(timeout)
    }
  },[active])
  if (!client) return <div>loading...</div>;
  const handleLogOut = () => {
    logout();
  };
  const signedup = localStorage.getItem("user");
  return (
    <div className="flex gap-2 w-full sm:justify-end sm:px-18   border-b-1 mb-2">
      <div className="flex justify-between  sm:text-lg font-semibold">
        <Link
          className={`transition-all ease-out duration-500 hover:bg-black hover:text-white py-4  w-32 text-center  ${
            newPath == "" ? "underline" : ""
          }`}
          href="/"
          onClick={()=> setActive(false)}
        >
          Home
        </Link>
        <Link
          className={`transition-all ease-out duration-500 hover:bg-black hover:text-white py-4  w-32 text-center  ${
            newPath == "blog" ? "underline" : ""
          }`}
          href="/blog"
          onClick={()=> setActive(false)}
        >
          Blog
        </Link>
        {!signedup
          ? !isLoggedIn && (
              <Link
                className={`transition-all ease-out  duration-500 hover:bg-black hover:text-white py-4  w-32 text-center  ${
                  newPath == "signup" ? "underline" : ""
                }`}
                href="/signup"
              >
                Signup
              </Link>
            )
          : !isLoggedIn && (
              <Link
                className={`transition-all ease-out  duration-500 hover:bg-black hover:text-white py-4  w-32 text-center  ${
                  newPath == "login" ? "underline" : ""
                }`}
                href="/login"
              >
                Login
              </Link>
            )}

        {isLoggedIn && (
          <div className="relative">
            <div
            onClick={()=> setActive(!active)}
              className={`transition-all cursor-pointer ease-out duration-500 hover:bg-black hover:text-white py-4  sm:w-32 text-center`}
            >
              Account{" "}
            </div>
            <div className={`${active?"flex":"hidden"} shadow-md rounded-md absolute z-10 text-black bg-white top-15 sm:top-18 flex-col`}>
              <div className="text-center text-black/50">{user?.name}</div>
              <button
                className={`transition-all border-b cursor-pointer ease-out duration-500 hover:bg-black hover:text-white py-1 px-2 sm:py-4  sm:w-32 text-center`}
                onClick={handleLogOut}
              >
                LogOut
              </button>
              <button
                className={`transition-all text-nowrap cursor-pointer ease-out duration-500 hover:bg-black hover:text-white py-1 px-2 sm:py-4  sm:w-32 text-center`}
                onClick={() => deleteUser()}
              >
                Delete User
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

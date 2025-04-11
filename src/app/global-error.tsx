"use client"

import { blogPosts } from "@/config/blog";

export default function GlobalError({error,reset}:{error:Error & {digest?:string},reset:()=> void}){
   const handleCloud = () => {
      localStorage.setItem("blogPost", JSON.stringify(blogPosts));
      window.location.reload();
    };
    return (
        <html>
        <body className="flex items-center justify-center w-full h-full">
          <div className="flex flex-col gap-2 ">
          <h2>Something went wrong!</h2>
            <span>{error.message} </span>
          <button className="text-red-500 px-4 py-2 bg-gray-50 cursor-pointer text-xl" onClick={() => reset()}>Try again</button>
          <button
          className="bg-blue-600 capitalize  text-white px-4 py-8 rounded hover:bg-blue-700 transition"
          onClick={handleCloud}
        >
          load data from cloud
        </button>
          </div>
        </body>
      </html>
    )
}
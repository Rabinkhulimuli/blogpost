"use client"
export default function GlobalError({error,reset}:{error:Error & {digest?:string},reset:()=> void}){
    return (
        <html>
        <body className="flex items-center justify-center w-full h-full">
          <div className="flex flex-col gap-2 ">
          <h2>Something went wrong!</h2>
            <span>{error.message} </span>
          <button className="text-red-500 px-4 py-2 bg-gray-50 cursor-pointer text-xl" onClick={() => reset()}>Try again</button>
          </div>
        </body>
      </html>
    )
}
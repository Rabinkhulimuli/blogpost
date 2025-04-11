"use client";
import { redirect, useRouter } from "next/navigation";
import Blog from "./blog/page";
import { useEffect, useState } from "react";
import { blogPosts } from "@/config/blog";
import { useAuth } from "@/components/AuthProvider";

export default function Home() {
  const{isLoggedIn}= useAuth()
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
    if (localStorage.getItem("post") == "false") return;
    localStorage.setItem("post", "true");
  }, []);
  const router = useRouter();
  if (!isClient) return <div>Loading ..</div>;
  if (localStorage.getItem("post") === "true") {
    localStorage.setItem("blogPost", JSON.stringify(blogPosts));
    localStorage.setItem("post", "false");
  }

  const handleCloud = () => {
    localStorage.setItem("blogPost", JSON.stringify(blogPosts));
    window.location.reload();
  };
if(!isLoggedIn){
  redirect("/signup")
}
  return (
    <div>
      <div className="flex flex-col my-12  gap-4 ">
        <button
          className="bg-blue-600 capitalize  text-white px-4 py-8 rounded hover:bg-blue-700 transition"
          onClick={handleCloud}
        >
          load data from cloud
        </button>
        <button
          className="bg-blue-600 capitalize text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={() => router.push("/blog/createNewBlog/new")}
        >
          Create blog
        </button>
      </div>
      <Blog />
    </div>
  );
}

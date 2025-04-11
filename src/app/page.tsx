"use client";
import { redirect } from "next/navigation";
import Blog from "./blog/page";
import { useEffect, useState } from "react";
import { blogPosts } from "@/config/blog";
import { useAuth } from "@/components/AuthProvider";

export default function Home() {
  const { isLoggedIn } = useAuth();
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
    if (localStorage.getItem("post") == "false") return;
    localStorage.setItem("post", "true");
  }, []);

  if (!isClient) return <div>Loading ..</div>;
  if (localStorage.getItem("post") === "true") {
    localStorage.setItem("blogPost", JSON.stringify(blogPosts));
    localStorage.setItem("post", "false");
  }

  if (!isLoggedIn) {
    redirect("/signup");
  }
  return (
    <div className="mt-12">
      <Blog />
    </div>
  );
}

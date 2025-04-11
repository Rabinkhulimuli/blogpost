"use client";
import { useAuth } from "@/components/AuthProvider";
import { redirect, useParams, useRouter} from "next/navigation";
import React, { useEffect, useState } from "react";

export default function CreateBlog() {
  const{blogs,setBlogs,isLoggedIn}= useAuth()
  const [isClient, setIsClient] = useState(false);
  const[isLoading,setIsLoading]= useState(false)
  const[error,setError]= useState("")
  const params = useParams();
  const { id } = params;
  const router= useRouter()
  const [form, setForm] = useState({
    id: "",
    title: "",
    author: "",
    content: "",
    summary: "",
    image: "",
    date: "",
  });
  useEffect(() => {
    setIsClient(true)
  }, []);
  useEffect(() => {
    if (id === "new") return;
    if(!blogs) {
      setError("there is no blog")
      return
    }
    if(!isLoggedIn){
      redirect("/signup")
    }
    const selectedBlog = blogs.find((blog) => blog.id === id);
    if (!selectedBlog){
      setError("selected blog doesnt exist")
      return
    }
    setForm(selectedBlog);
  }, [id, blogs,isLoggedIn]);
  if (!isClient) return <div>Loading ..</div>;
  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    if (id === "new") {
      const newBlog = {
        ...form,
        id: crypto.randomUUID(),
        date: new Date().toISOString().split("T")[0],
      };
      const updatedblog =!blogs?newBlog: [...blogs, newBlog];
      localStorage.setItem("blogPost", JSON.stringify(updatedblog));
      setBlogs((blog) => [...blog, newBlog]);
    } else {
      if(!blogs) return
      const updatedblogs = blogs.map((blog) => (blog.id === id ? form : blog));
      localStorage.setItem("blogPost", JSON.stringify(updatedblogs));
      setBlogs(updatedblogs);
    }
    setIsLoading(false)
   router.push('/')
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((eh) => ({ ...eh, [name]: value }));
  };
  
  return (
    <div>
      {error.length>0 && <div className="text-red-700">{error} </div> }
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-md shadow-md"
      >
        <h2 className="text-2xl font-semibold">Create a New Blog</h2>
        <label htmlFor=""> Title</label>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <label htmlFor="">Author</label>
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={form.author}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <label htmlFor="">Content</label>
        <textarea
          name="content"
          placeholder="Content"
          value={form.content}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows={4}
          required
        />
        <label htmlFor="">Summary </label>
        <textarea
          name="summary"
          placeholder="Summary"
          value={form.summary}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows={2}
          required
        />
        <label htmlFor="">Image <sub>only istock image is supported</sub> </label>
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition capitalize"
        >
         {isLoading?id=="new"?"creating blog":"updating blog":id=="new"?" Create Blog":"update blog"}
        </button>
      </form>
    </div>
  );
}

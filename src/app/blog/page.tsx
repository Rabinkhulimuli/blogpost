"use client";
import { useAuth } from "@/components/AuthProvider";
import { blogPosts } from "@/config/blog";
import Image from "next/image";
import { redirect, usePathname, useRouter } from "next/navigation";

export default function Blog() {
  const { blogs, setBlogs, isLoggedIn } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  if (!isLoggedIn) {
    redirect("/signup");
  }
  if (!blogs) return <div className=" ">create a blog first</div>;
  const handleDelete = (id: string) => {
    setBlogs((blog) => {
      if (!blog) {
        localStorage.setItem("blogPost", "");
        return [];
      }
      const newblog = blog.filter((eh) => eh.id !== id);
      localStorage.setItem("blogPost", JSON.stringify(newblog));
      return newblog;
    });
  };
  const handleCloud = () => {
    localStorage.setItem("blogPost", JSON.stringify(blogPosts));
    setBlogs(blogPosts)
  };
  if (blogs.length == 0)
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
        <div> There is no blogs.</div>{" "}
      </div>
    );

  return (
    <div className="space-y-12 ">
      {pathname !== "/" && (
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
      )}
      {blogs.map((blog) => (
        <div key={blog.id}>
          <div>
            <Image
              className="w-full h-40 sm:h-80 lg:h-120 rounded-md"
              src={blog.image}
              alt={blog.title}
              width={400}
              height={300}
            />
            <div className="flex flex-col gap-2 mt-4">
              <h2 className="text-lg text-black/50">{blog.author} </h2>
              <h2 className="text-2xl font-semibold">{blog.title} </h2>
              <p>{blog.content} </p>
              <p>{blog.summary} </p>
              <p>{blog.date}</p>
              {pathname !== "/" && (
                <div className="space-x-4">
                  <button
                    onClick={() =>
                      router.push(`/blog/createNewBlog/${blog.id}`)
                    }
                    className="bg-green-500 w-fit px-4 py-1 sm:px-12 sm:py-3 cursor-pointer hover:bg-green-700 rounded-md text-lg capitalize text-white font-semibold"
                  >
                    edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog.id)}
                    className="bg-red-500 w-fit px-4 py-1 sm:px-12 sm:py-3 cursor-pointer hover:bg-red-700 rounded-md text-lg capitalize text-white font-semibold"
                  >
                    delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
    <div>Changed</div>
  );
}

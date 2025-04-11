"use client";
import Link from "next/link";
import React, { useState } from "react";
import { login } from "../actions/auth";
import Image from "next/image";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ email: "", password: "" });
  const { login: Login } = useAuth();
  const router = useRouter();
  const handleLogin = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const userData = localStorage.getItem("user");
    const user = userData ? JSON.parse(userData) : null;
    if (!user) {
      router.push("/signup");
    }
    if (user.email !== email) {
      setError((prev) => ({ ...prev, email: "email not found" }));
      setLoading(false);
      return;
    } else if (user.email === email) {
      setError((prev) => ({ ...prev, email: "" }));
    }
    if (user.email === email) {
      const check = await login(password, user.password);
      if (check.isMatched) {
        setError((prev) => ({ ...prev, password: "" }));
        Login(user);
        router.push("/blog");
      } else {
        setError((prev) => ({ ...prev, password: "incorrect password" }));
        setLoading(false);
        return;
      }
    }
    setLoading(false);
    e.target.reset();
  };

  return (
    <div>
      <div className="relative">
        <Image
          className="w-full h-screen object-cover object-left"
          src="/background.jpg"
          alt=""
          width={1024}
          height={480}
        />
        <div className="absolute  inset-0  m-auto flex w-full h-full items-center justify-center">
          <div className="min-w-60 w-full max-w-100   backdrop-blur-xl  rounded-xl   px-4 py-6 ">
            <form
              onSubmit={handleLogin}
              className="flex  rounded-md flex-col gap-4 w-full"
            >
              <h2 className="text-center text-2xl font-semibold capitalize">
                Log In
              </h2>

              <div className="flex flex-col gap-2 w-full ">
                <label className="text-lg" htmlFor="email">
                  Email
                </label>
                <input
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="border-2  transition-all ease-in-out duration-300 focus:ring-2 focus:ring-yellow-400 w-full border-white rounded-xl px-2 py-3 outline-none"
                  id="email"
                  name="email"
                  placeholder="Email"
                />
                {error.email.length > 0 && (
                  <span className="text-red-700 text-center">
                    {error.email}{" "}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2 w-full ">
                <label className="text-lg" htmlFor="Password">
                  Password
                </label>
                <input
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="border-2  transition-all ease-in-out duration-300 focus:ring-2 focus:ring-yellow-400 w-full border-white rounded-xl px-2 py-3 outline-none"
                  type="password"
                  id="Password"
                  name="Password"
                  placeholder="Password"
                />
                {error.password.length > 0 && (
                  <span className="text-red-700 text-center">
                    {error.password}{" "}
                  </span>
                )}
              </div>
              <button
                disabled={loading}
                type="submit"
                className="text-lg bg-black text-white font-semibold px-2 py-3 rounded-xl cursor-pointer transition-all mt-4 duration-500 ease-in-out hover:bg-white hover:text-black"
              >
                {loading ? "loging ... " : "Log In"}
              </button>
              <div className="text-center">
                Don&apos;t have an account?
                <Link href="/signup" className="underline capitalize">
                  signup
                </Link>{" "}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

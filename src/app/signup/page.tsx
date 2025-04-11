"use client";
import { useEffect } from "react";
import { useActionState } from "react";
import { signup } from "../actions/auth";
import { redirect, useRouter } from "next/navigation";
import { FormState } from "../lib/type";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";

export default function SignUP() {
  const initialState: FormState = {
    errors: {},
    message: "",
    user: undefined,
  };
  const [state, action, pending] = useActionState(signup, initialState);
  const { signin, setIsLoggedIn, isLoggedIn } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("loggedIn") == "true" && !isLoggedIn) {
      setIsLoggedIn(true);
    }
    if (state?.message === "success") {
      if (state.user) signin(state.user);
      router.push("/login");
    }
   
  }, [state?.user, state?.message, signin, isLoggedIn, setIsLoggedIn, router]);
  if(isLoggedIn){
    redirect('/blog')
  }
  return (
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
            action={action}
            className="flex  rounded-md flex-col gap-4 w-full"
          >
            <h2 className="text-center text-2xl font-semibold capitalize">
              Create account
            </h2>
            <div className="flex flex-col gap-2 w-full">
              <label className="text-lg" htmlFor="name">
                Name
              </label>
              <input
                className="border-2 transition-all ease-in-out duration-300 focus:ring-2 focus:ring-yellow-400 border-white rounded-xl px-2 py-3 outline-none"
                id="name"
                name="name"
                placeholder="Name"
              />
            </div>
            {state?.errors?.name && (
              <p className="text-red-700">{state.errors.name}</p>
            )}

            <div className="flex flex-col gap-2 w-full ">
              <label className="text-lg" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                className="border-2  transition-all ease-in-out duration-300 focus:ring-2 focus:ring-yellow-400 w-full border-white rounded-xl px-2 py-3 outline-none"
                id="email"
                name="email"
                placeholder="Email"
              />
            </div>
            {state?.errors?.email && (
              <p className="text-red-700">{state.errors.email}</p>
            )}

            <div className="flex flex-col gap-2 ">
              <label className="text-lg" htmlFor="password">
                Password
              </label>
              <input
                className="border-2  transition-all ease-in-out duration-300 focus:ring-2 focus:ring-yellow-400 border-white rounded-xl px-2 py-3 outline-none"
                id="password"
                name="password"
                type="password"
              />
            </div>
            {state?.errors?.password && (
              <div className="text-red-700">
                <p>Password must:</p>
                <ul>
                  {state.errors.password.map((error) => (
                    <li key={error}>- {error}</li>
                  ))}
                </ul>
              </div>
            )}
            <button
              disabled={pending}
              type="submit"
              className="text-lg bg-black text-white font-semibold px-2 py-3 rounded-xl cursor-pointer transition-all mt-4 duration-500 ease-in-out hover:bg-white hover:text-black"
            >
              {pending ? "signing up " : "Sign Up"}
            </button>
            <div className="text-center">
              Already have an account?
              <Link href="/login" className="underline capitalize">
                login
              </Link>{" "}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

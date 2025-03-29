"use client";
import "./css/nav.css";
import React from "react";
import { useRouter } from "next/navigation";
import { useUser, UserButton, SignInButton, SignOutButton } from "@clerk/nextjs";

const Nav = () => {
  const router = useRouter();
  const { isSignedIn, user } = useUser();

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-blue-900/20 to-slate-900 shadow-lg border-b border-white/10 fixed w-full z-20 top-0 start-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center">
          <span className="text-blue-400 mr-4 font-medium">AI powered</span>
          <span className="self-center text-2xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Career Guide
          </span>
        </div>

        <div className="flex md:order-2 space-x-4 items-center">
          {isSignedIn ? (
            <>
              <div className="list-none flex gap-4">
                <button 
                  onClick={() => {router.push('/')}} 
                  className="px-6 py-3 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-medium text-sm transition-all duration-300 shadow-lg hover:shadow-blue-500/25 border border-white/10"
                >
                  Home
                </button>
                <button 
                  onClick={() => {router.push('/chatbot')}} 
                  className="px-6 py-3 rounded-xl bg-gradient-to-br from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600 text-white font-medium text-sm transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 border border-white/10"
                >
                  Career Finder
                </button>
              </div>
              
              <SignOutButton>
                <button className="px-6 py-3 rounded-xl bg-gradient-to-br from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-medium text-sm transition-all duration-300 shadow-lg hover:shadow-red-500/25 border border-white/10">
                  Logout
                </button>
              </SignOutButton>

              <div className="flex items-center gap-3 bg-gradient-to-br from-slate-800/95 to-blue-900/95 px-4 py-2 rounded-xl border border-white/10">
                <span className="text-blue-100 text-sm font-medium">{user?.fullName || "User"}</span>
                <div className="border-2 border-blue-400/30 rounded-full">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </div>
            </>
          ) : (
            <SignInButton>
              <button className="px-6 py-3 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-medium text-sm transition-all duration-300 shadow-lg hover:shadow-blue-500/25 border border-white/10">
                Login
              </button>
            </SignInButton>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;

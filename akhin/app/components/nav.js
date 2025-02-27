"use client";
import "./css/nav.css";
import React from "react";
import { useRouter } from "next/navigation";
import { useUser, UserButton, SignInButton, SignOutButton } from "@clerk/nextjs";

const Nav = () => {
  const router = useRouter();
  const { isSignedIn, user } = useUser();

  return (
    <nav className="backdrop-blur-lg shadow-lg bg-blue-950/10 border border-white/20 fixed w-full z-20 top-0 start-0 cursor-pointer">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div>
          <span className="text-blue-500 mr-4">AI powered</span>
          <span className="self-center text-2xl font-semibold text-[rgb(0,0,255,0.4)]">
            Career Guide
          </span>
        </div>

        <div className="flex md:order-2 space-x-3 items-center">
          {isSignedIn ? (
            <>
              {/* Logout Button (Same Style as Login) */}
              <SignOutButton>
                <button className="beautiful-button backdrop-blur-md">
                  Logout
                </button>
              </SignOutButton>

              {/* Small Profile Section */}
              <div className="flex items-center gap-2">
                <span className="text-white text-sm font-medium">{user?.fullName || "User"}</span>
                <UserButton afterSignOutUrl="/" />
              </div>
            </>
          ) : (
            <SignInButton>
              <button className="beautiful-button backdrop-blur-md">
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

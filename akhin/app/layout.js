import { Geist, Geist_Mono } from "next/font/google";
import { Dancing_Script } from "next/font/google"; 
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  SignIn
} from '@clerk/nextjs'
import "./globals.css"; 

import Nav from "./components/nav";

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing-script",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className={dancingScript.variable}>
          <SignedOut>
          <SignIn routing="hash"/>
          </SignedOut>
        <SignedIn>
          {children}
          </SignedIn>
          <Nav />
        </body>
      </ClerkProvider>
    </html>
  );
}

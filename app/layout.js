import { Geist, Geist_Mono } from "next/font/google";
import {
  ClerkLoaded,
  ClerkLoading,
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import "./globals.css";
import Provider from "./Provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>

    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <ClerkLoading className="flex items-center justify-center">
            <div className="w-full h-screen flex items-center justify-center text-2xl">
              Loading...
            </div>
          </ClerkLoading>
          <ClerkLoaded>
            <Provider>
              {children}
            </Provider>
          </ClerkLoaded>
      </body>
    </html>
    </ClerkProvider>
  );
}

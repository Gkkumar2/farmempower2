"use client"
import React from "react";
// import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import ToasterContext from "@/context/ToasterContext";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient()
  return (
    <ClerkProvider>
    <html lang="en">
   
      <body className={`${inter.className} flex items-start justify-between `}>
        <ToasterContext/>
        <div className="w-[100px] md:w-[300px] border-r md:min-h-screen">
          <Sidebar />
        </div>
        <main className="grid w-[530px] md:w-full ml-20 h-full md:ml-20">
          <Header /> 
        <QueryClientProvider client={queryClient}>
          <div className="p-5">
            {children}
          </div></QueryClientProvider>
        </main>
        
      </body>
    </html>
    </ClerkProvider>
  );
}

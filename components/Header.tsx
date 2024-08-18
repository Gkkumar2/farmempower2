"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { BellIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CommandDemo from "./Command";
import { UserButton, useSession, SignInButton, SignUpButton } from "@clerk/nextjs";

function Header() {
  const { isSignedIn } = useSession();
  const [notifications, setNotifications] = useState([
    {
      text: "This is notification",
      date: "02-01-2015",
      read: true,
    },
    {
      text: "This is another notification",
      date: "02-01-2015",
      read: true,
    },
  ]);

  return (
    <div className="ml-5 md:ml-0 w-[400px] md:w-auto grid grid-cols-2 gap-4 border-b p-2 md:p-4">
      <CommandDemo />
      
      
      <div className="flex items-center justify-end">
        {isSignedIn ? (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="relative" variant="outline" size="icon">
                  <div
                    className={`absolute -top-1 right-1 h-3 w-3 rounded-full my-1 ${
                      notifications.find((x: any) => x.read === true)
                        ? "bg-green-500"
                        : "bg-neutral-200"
                    }`}
                  ></div>
                  <BellIcon className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {notifications.map((item, key) => (
                  <DropdownMenuItem
                    key={key}
                    className="p-1 cursor-pointer hover:bg-neutral-50 flex items-start gap-2"
                  >
                    <div
                      className={`h-3 w-3 rounded-full my-1 ${
                        item.read ? "bg-green-500" : "bg-neutral-200"
                      }`}
                    ></div>
                    <div>
                      <p>{item.text}</p>
                      <p className="text-xs text-neutral-500">{item.date}</p>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex items-center ml-4 gap-5">
              <UserButton afterSignOutUrl="/" />
            </div>
          </>
        ) : (
          <div className="flex items-center gap-3">
            <SignInButton>
              <Button variant="outline" className="bg-slate-200">Sign In</Button>
            </SignInButton>
            <SignUpButton>
              <Button variant="outline" className="bg-slate-200">Sign Up</Button>
            </SignUpButton>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;

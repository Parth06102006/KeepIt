"use client";

import React from "react";
import { useClerk, useUser } from "@clerk/nextjs";
import { LogOutIcon } from "lucide-react";
import Image from "next/image";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { signOut } = useClerk();
  const { user } = useUser();

  const handleSignOut = async () => {
    await signOut();
  };
  return (
    <div className="bg-accent-foreground h-screen">      
              {user && (
                <div className="top-2 right-2 fixed flex items-center gap-4 bg-white/80 p-3 rounded-lg">
                  <div className ="-translate-x-1">
                  <div className="flex-col gap-2 items-center">
                      <div className="flex gap-1 justify-center rounded-4xl w-fit hover:bg-transparent">
                      <div className="avatar">
                          <div className="relative w-8 h-8 rounded-full object-fit" onMouseEnter={()=>{
                            const email =  document.getElementById('email')
                            email?.classList.remove('hidden')
                            }}
                          onMouseLeave={()=>
                          {
                              const email =  document.getElementById('email')
                              email?.classList.add('hidden')
                          }
                          }  
                          >
                          <Image
                              fill
                              src={user.imageUrl}
                              alt={
                              user.username || user.emailAddresses[0].emailAddress
                              }
                              className="rounded-2xl"
                              />
                              <span
                              className="hidden absolute bg-white px-2 py-1 rounded-sm top-5 right-4 text-sm truncate max-w-xs text-zinc-600" id="email"
                              >{user.username || user.emailAddresses[0].emailAddress}</span>
                          </div>
                      </div>
                      <button
                          onClick={handleSignOut}
                          className="btn btn-ghost btn-circle"
                      >
                      <LogOutIcon className="h-6 w-6" />
                    </button>
                  </div>
              </div>
            </div>
                </div>
          )}
      {children}
    </div>
  );
}
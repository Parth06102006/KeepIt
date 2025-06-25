"use client";

import React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { MenubarPage } from "@/components/menubar";
import { useClerk, useUser } from "@clerk/nextjs";
import { LogOutIcon } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";

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
  const pathname = usePathname();
  const isAuthPage = pathname === '/sign-in' || pathname === '/sign-up'
  return (
    <div>
        {!isAuthPage && <AppSidebar/>}
        {!isAuthPage && <MenubarPage/>}
        {!isAuthPage && <SidebarTrigger/>}
        {children}
            
              {user && (
                <div className ="top-5 right-0 fixed -translate-x-1">
                  <div className="flex-col gap-2 items-center">
                      <div className="flex gap-4 mb-2 border p-3 justify-center rounded-4xl w-fit bg-white/10 hover:bg-transparent">
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
          )}
    </div>
  );
}
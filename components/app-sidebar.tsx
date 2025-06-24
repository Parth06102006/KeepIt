"use client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome ,faXmark,faComment,faPhotoFilm,faVideo,faLink } from '@fortawesome/free-solid-svg-icons'
import { faYoutube,faInstagram,faReddit } from '@fortawesome/free-brands-svg-icons';
import { useRouter } from "next/navigation"
import Image from 'next/image';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/home",
    icon: faHome,
  },
  {
    title: "Youtube",
    url: "/youtube",
    icon: faYoutube,
  },
  {
    title: "X (Twitter)",
    url: "/twitter",
    icon: faXmark,
  },
  {
    title: "Instagram",
    url: "/instagram",
    icon: faInstagram,
  },
  {
    title: "Reddit",
    url: "/reddit",
    icon: faReddit,
  },
  {
    title: "Texts",
    url: "/texts",
    icon: faComment,
  },
  {
    title: "Photos",
    url: "/photos",
    icon: faPhotoFilm,
  },
  {
    title: "Videos",
    url: "/videos",
    icon: faVideo,
  },
  {
    title: "Other Links",
    url: "/otherLinks",
    icon: faLink,
  },
]

export function AppSidebar() {
  const router = useRouter();
  return (
    <Sidebar>
      <SidebarContent className='relative overflow-x-hidden overflow-y-hidden'>
        <div className='blur animate-rotate inset-0 absolute h-full w-full rounded-lg bg-conic from-green-600 to-green-200'></div>
        <SidebarGroup className='ml-1.5 mt-2 relative w-[96%] h-[98%] bg-zinc-800 p-4 rounded-2xl'>
          <SidebarGroupLabel className='relative mb-5 flex py-7 bg-green-200/30 gap-4'>
            <Image src='/logo.png' width={40} height={40} alt='logo' className='rounded-3xl border-3 border-green-300'/>
            <div className='ml-10'>
              <span className='text-2xl text-green-600'>Keep</span>
              <span className='text-2xl bg-green-600 px-4 rounded text-white '>It</span>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton className='border-2 hover:text-green-500' onClick={()=>{router.push(item.url)}}>
                    <FontAwesomeIcon icon={item.icon} className='fa-fw'/>
                    <span className='ml-2'>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
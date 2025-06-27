import { SignUp } from '@clerk/nextjs'
import Image from 'next/image'

export default function Page() {
  return( 
  <div className='flex justify-center items-center h-[100vh] w-[100vw] '>
    <div className="flex sm:bg-green-900 p-4 rounded-2xl">
        {/* Left image panel */}
        <div className="relative h-[665px] w-[450px] hidden sm:block">
          <Image src="/res1.png" fill alt="Logo" className="rounded-2xl" />
          <div className="absolute inset-0 bg-white/30 rounded-2xl" />
        </div>
      <SignUp
      appearance={{
        elements:{
          socialButtonsBlockButton:{
            background:'white',
            color:'black',
            border:'none',
            boxShadow:'none',
            '&:hover':{
              background:"rgba(120, 150, 125)",
              color:'white'
            }
          },
        },
        variables:{
          colorPrimary:'rgba(35, 92, 55)',
          colorWarning:'rgba(99,43,24)',
          colorBackground:'rgba(81, 173, 97)',
          colorNeutral:'black',
          fontSize:'15px',
          colorText:'white',
        },
        layout: {
          socialButtonsPlacement: 'top',
          socialButtonsVariant: 'blockButton',
          termsPageUrl: 'https://clerk.com/terms',
          animations:true,
          shimmer:true,
          logoImageUrl:'/logo.png',
          logoPlacement:"inside",
        }
      }}
      />
    </div>
  </div>)
}
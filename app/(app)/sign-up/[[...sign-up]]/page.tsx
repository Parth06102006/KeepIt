import { SignUp } from '@clerk/nextjs'
import { ModeToggle } from '@/components/toggle'
import Image from 'next/image'

export default function Page() {
  return( 
  <div className='flex justify-center items-center h-[100vh] relative'>
    <ModeToggle nav={false}/>
    <div className='flex sm:bg-green-900 p-1 rounded-r-2xl'>
    <Image src='/res1.png' width={450} height={200} alt='Logo' className='hidden sm:block rounded'/>
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
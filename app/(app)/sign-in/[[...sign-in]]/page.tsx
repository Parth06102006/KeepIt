import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return( 
  <div className='flex justify-center items-center h-[100vh] w-[100vw]'>
      <SignIn
      appearance={{
        elements:{
          socialButtonsBlockButton:{
            background:'white',
            color:'green',
            border:'none',
            boxShadow:'none',
            '&:hover':{
              background:"green",
              color:'black'
            }
          },
        },
        variables:{
          colorPrimary:'green',
          colorInputText:'green',
          colorNeutral:'black',
          fontSize:'15px',
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
  </div>)
}
import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return( 
  <div className='flex justify-center items-center h-[100vh] w-[100vw] '>
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
  </div>)
}
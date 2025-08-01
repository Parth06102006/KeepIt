'use client'
import React from 'react'
import RotatingText from '@/components/ui/RotatingText'
import GlassIcons from '@/components/ui/GlassIcons'
import Youtube from '@/components/icons/Youtube'
import X from '@/components/icons/X'
import Instagram from '@/components/icons/Insta'
import Reddit from '@/components/icons/Reddit'
import Photo from '@/components/icons/Photo'
import Video from '@/components/icons/Video'
import Text from '@/components/icons/Text'
import Globe from '@/components/icons/Globe'
import StarBorder from '@/components/ui/StarBorder'
import { useRouter } from 'next/navigation'

const page = () => {
  const router = useRouter();
  const items = [
    { icon: <Youtube size='lg'/>, color: 'white', label: 'Youtube' },
    { icon: <X size='lg'/>, color: 'white', label: 'X' },
    { icon: <Instagram size='lg'/>, color: 'white', label: 'Instagram' },
    { icon: <Reddit size='sm'/>, color: 'white', label: 'Reddit' },
    { icon: <Photo size='sm'/>, color: 'white', label: 'Photos' },
    { icon: <Video size='sm'/>, color: 'white', label: 'Videos' },
    { icon: <Text size='sm'/>, color: 'white', label: 'Texts' },
    { icon: <Globe size='sm'/>, color: 'white', label: 'Other Links...' },
  ];
  return (
    <div className='w-full flex flex-col'>
      <div className='text-white self-center mt-3'>
        <StarBorder
          as="button"
          className="custom-class mt-5"
          color="green"
          speed="5s"
        > 
          <ul className='flex gap-3'>
            {/*to be added later*/}
            <li><a href="">#To be Added Later</a></li>
            <li>#To be Added Later</li>
            <li className='hover:text-green-500 hover:transform hover:ease-in-out hover:transition-colors' onClick={()=>{router.push('/sign-in')}}>Login</li>
            <li className='hover:text-green-500 hover:transform hover:ease-in-out hover:transition-colors' onClick={()=>{router.push('/sign-up')}}>Get Started</li>
          </ul>
        </StarBorder>
      </div>
      <div className='text-white bg-green-700 flex flex-col text-center h-50 w-full  p-5 mt-20 rounded-2xl max-w-fit'>
        <p className='text-4xl font-stretch-extra-expanded font-extrabold mb-[10%]'>Welcome To <span className='bg-white rounded-sm text-black p-2'>Keep</span><span>It</span></p>
        <div className='flex items-center gap-1'>
          <span className='text-2xl font-medium'>Get Ready to Enjoy </span>
          <RotatingText
            texts={['Store', 'Save', 'Share', 'Everything']}
            mainClassName="text-2xl bg-linear-to-bl from-green-400 to-lime-500 p-5 text-black font-bold rounded-3xl"
            staggerFrom={"last"}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden sm:pb-1 md:pb-1"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2000}
            loop={true}
          />
        </div>
      </div>
        <div className='bg-white/40 blur mt-10 w-full border-1'></div>
        <div
            className={'text-[#b5b5b5a4] bg-clip-text inline-block animate-shine text-3xl self-center mt-10 font-semibold'}
            style={{
                backgroundImage: 'linear-gradient(270deg, rgba(255, 255, 255, 0.8) 40%, rgba(255, 255, 255, 0.8) 60%, rgba(255, 255, 255, 0.4) 30%)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                animationDuration: '40s',
            }}
        >
          Store Different Sources 
        </div>
          <div className='self-center p-3 text-white'>
            <GlassIcons items={items} className="custom-class"/>
        </div>
    </div>
  )
}

export default page

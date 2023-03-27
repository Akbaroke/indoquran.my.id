import { IconBookmark, IconHeart } from '@tabler/icons-react';
import Image from 'next/image';
import LOGO from '../assets/logo-alquran.png'

export default function Navbar() {
  return (
    <nav className='flex h-[70px] bg-white justify-between items-center px-10'>
      <Image src={LOGO} width={60} height={60} alt='logo alquran online' className='cursor-pointer' />
      <div className='flex gap-[50px]'>
        <div className='relative flex justify-center items-center'>
          <span className='absolute bg-red-700 font-bold text-[10px] text-white w-5 h-5 rounded-full '>1</span>
          <IconHeart className='text-teal-700 fill-teal-700' />
        </div>
        <div className='relative'>
          <span>1</span>
          <IconBookmark className='text-teal-700 fill-teal-700' />
        </div>
        <button>
          logout
        </button>
      </div>
    </nav>
  )
}

import { IconBookmark, IconHeart } from '@tabler/icons-react';
import Image from 'next/image';
import LOGO from '../assets/logo-alquran.png'

export default function Navbar() {
  return (
    <nav className='flex h-[70px] bg-white justify-between items-center px-10'>
      <Image src={LOGO} width={60} height={60} alt='logo alquran online' className='cursor-pointer' />
      <div className='flex gap-[50px]'>
        <div className='relative flex justify-center items-center cursor-pointer'>
          <span className='absolute bg-[#E7002D] font-bold text-[10px] text-white w-[14px] h-[14px] rounded-full flex justify-center items-center top-[-4px] right-[-5px]'>1</span>
          <IconHeart className='text-teal-700 fill-teal-700 w-[25px] h-[25px]' />
        </div>
        <div className='relative flex justify-center items-center cursor-pointer'>
          <span className='absolute bg-[#E5A620] font-bold text-[10px] text-white w-[14px] h-[14px] rounded-full flex justify-center items-center top-[-5px] right-[-2px]'>1</span>
          <IconBookmark className='text-teal-700 fill-teal-700 w-[25px] h-[25px]' />
        </div>
        <button className='w-[100px] h-[35px] border border-[#00957B] rounded-full font-Quicksand font-semibold text-[#00957B] capitalize'>
          logout
        </button>
      </div>
    </nav>
  )
}

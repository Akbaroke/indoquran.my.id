import { IconBookmark, IconHeart } from '@tabler/icons-react';
import Image from 'next/image';
import LOGO from '../assets/logo-alquran.png'
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className='flex h-[70px] bg-white justify-between items-center px-10 sticky top-0 z-10'>
      <Link href='/'><Image src={LOGO} width={60} height={60} alt='logo alquran online' className='cursor-pointer' /></Link>
      <div className='flex gap-[50px]'>
        <div className='relative flex justify-center items-center cursor-pointer'>
          <span className='absolute bg-[#E7002D] font-bold text-[10px] text-white w-[14px] h-[14px] rounded-full flex justify-center items-center top-[1px] right-[-5px]'>1</span>
          <IconHeart className='text-[color:var(--primary)] fill-[color:var(--primary)] w-[25px] h-[25px]' />
        </div>
        <div className='relative flex justify-center items-center cursor-pointer'>
          <span className='absolute bg-[#E5A620] font-bold text-[10px] text-white w-[14px] h-[14px] rounded-full flex justify-center items-center top-0 right-[-2px]'>1</span>
          <IconBookmark className='text-[color:var(--primary)] fill-[color:var(--primary)] w-[25px] h-[25px]' />
        </div>
        <button className='w-[100px] h-[35px] border border-[color:var(--primary)] rounded-full font-semibold text-[color:var(--primary)] capitalize'>
          logout
        </button>
      </div>
    </nav>
  )
}

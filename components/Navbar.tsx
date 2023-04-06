'use client'
import * as React from 'react'
import { IconBookmark, IconHeart } from '@tabler/icons-react'
import Image from 'next/image'
import LOGO from '../assets/logo-alquran.png'
import Link from 'next/link'
import ProgresBar from './ProgresBar'

export default function Navbar() {
  const [auth, setAuth] = React.useState<boolean>(false)
  const [scrollY, setScrollY] = React.useState<number>(0)

  React.useEffect(() => {
    function handleScroll() {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <nav
      className={`h-[70px] bg-white/50 backdrop-blur-sm sticky top-0 z-10 ${
        scrollY > 100 && 'shadow-md'
      }`}>
      <ProgresBar />
      <div className="flex justify-between items-center px-3 sm:px-10 mt-1">
        <Link
          href="/"
          onClick={() => window.scrollTo(0, 0)}
          className="flex items-center">
          <Image
            src={LOGO}
            width={70}
            height={70}
            alt="logo alquran online"
            className="cursor-pointer"
          />
          <h1 className="text-[22px] sm:text-[24px] font-bold italic text-[var(--primary)] drop-shadow-md">
            IndoQur`an
          </h1>
        </Link>
        {auth ? (
          <div className="flex gap-[50px]">
            <div className="relative flex justify-center items-center cursor-pointer">
              <span className="absolute bg-[#E7002D] font-bold text-[10px] text-white w-[14px] h-[14px] rounded-full flex justify-center items-center top-[1px] right-[-5px]">
                1
              </span>
              <IconHeart className="text-[color:var(--primary)] fill-[color:var(--primary)] w-[25px] h-[25px]" />
            </div>
            <div className="relative flex justify-center items-center cursor-pointer">
              <span className="absolute bg-[#E5A620] font-bold text-[10px] text-white w-[14px] h-[14px] rounded-full flex justify-center items-center top-0 right-[-2px]">
                1
              </span>
              <IconBookmark className="text-[color:var(--primary)] fill-[color:var(--primary)] w-[25px] h-[25px]" />
            </div>
            <button
              className="w-[100px] h-[35px] border border-[color:var(--primary)] rounded-full font-semibold text-[color:var(--primary)] capitalize"
              onClick={() => setAuth(!auth)}>
              logout
            </button>
          </div>
        ) : (
          <button
            className="w-[100px] h-[35px] border border-[color:var(--primary)] rounded-full font-semibold text-[color:var(--primary)] capitalize invisible"
            onClick={() => setAuth(!auth)}>
            Login
          </button>
        )}
      </div>
    </nav>
  )
}

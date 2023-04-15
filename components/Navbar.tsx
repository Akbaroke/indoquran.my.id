'use client'
import * as React from 'react'
import Image from 'next/image'
import LOGO from '../assets/logo-alquran.png'
import Link from 'next/link'
import ProgresBar from './ProgresBar'
import TogleDarkMode from './TogleDarkMode'
import { restore } from '@/redux/actions/store'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/interfaces'
import SaveStore from '@/services/SaveStore'
import ButtonNavbar from './ButtonNavbar'

export default function Navbar() {
  const stores = useSelector((state: RootState) => state.store)
  const [scrollY, setScrollY] = React.useState<number>(0)
  const dispatch = useDispatch()

  React.useEffect(() => {
    function handleScroll() {
      setScrollY(window.scrollY)
    }
    dispatch(restore())

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [dispatch])

  React.useEffect(() => {
    SaveStore(stores)
  }, [stores])

  return (
    <nav
      className={`h-[70px] bg-white/50 dark:bg-slate-800/70 backdrop-blur-lg sticky top-0 z-10 ${
        scrollY > 100 && 'shadow-md shadow-grey-700 dark:shadow-slate-700'
      }`}>
      <ProgresBar />
      <div className="flex justify-between items-center px-4 sm:px-10 my-3">
        <Link
          href="/"
          onClick={() => window.scrollTo(0, 0)}
          className="flex items-center gap-2 sm:gap-4">
          <Image
            src={LOGO}
            width={30}
            height={30}
            alt="logo alquran online"
            className="cursor-pointer"
          />
          <h1 className="text-[22px] sm:text-[25px] font-bold italic text-[var(--primary)] drop-shadow-md ">
            IndoQur`an
          </h1>
        </Link>
        <div className="flex items-center gap-3 sm:gap-5">
          <TogleDarkMode />
          <ButtonNavbar />
        </div>
      </div>
    </nav>
  )
}

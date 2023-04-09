'use client'
import * as React from 'react'
import { IconArrowBigUpFilled } from '@tabler/icons-react'

export default function ScrollToTop() {
  const [scrollValue, setScrollValue] = React.useState<number>(0)

  React.useEffect(() => {
    function handleScroll() {
      setScrollValue(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return scrollValue > 100 ? (
    <div
      className="w-12 h-12 rounded-full bg-white shadow-lg fixed bottom-5 right-4 text-[var(--primary)] flex justify-center items-center cursor-pointer dark:bg-slate-600/50 backdrop-blur-sm"
      onClick={scrollToTop}>
      <IconArrowBigUpFilled />
    </div>
  ) : null
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

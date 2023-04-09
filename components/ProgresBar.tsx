'use client'
import * as React from 'react'

export default function ProgresBar() {
  const [percent, setPercent] = React.useState<number>(0)

  React.useEffect(() => {
    function handleScroll() {
      const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight
      const progress = (window.scrollY / totalHeight) * 100
      setPercent(progress)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="h-[3px] w-full bg-transparent sticky">
      <div
        className="h-full bg-[var(--primary)]"
        style={{ width: `${percent}%` }}></div>
    </div>
  )
}

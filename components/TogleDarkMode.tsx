'use client'
import { useTheme } from 'next-themes'
import * as React from 'react'

function TogleDarkMode() {
  const { theme, setTheme } = useTheme()
  const [isChecked, setIsChecked] = React.useState<boolean>(false)

  React.useEffect(() => {
    if (theme === 'dark') {
      setIsChecked(true)
    } else {
      setIsChecked(false)
    }
  }, [theme])

  const switchToggleClass = `w-6 h-6 sm:w-8 sm:h-8 relative rounded-full transition duration-500 transform p-1 text-white ${
    isChecked ? 'bg-yellow-500 translate-x-full' : 'bg-gray-700 -translate-x-2'
  }`

  const switchIcon = !isChecked ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  )

  return (
    <button
      className="w-[35px] h-5 sm:w-[50px] sm:h-7 rounded-full bg-slate-400 flex items-center transition duration-300 focus:outline-none shadow mr-4 sm:mr-2"
      onClick={() =>
        theme === 'light' ? setTheme('dark') : setTheme('light')
      }>
      <div className={switchToggleClass}>{switchIcon}</div>
    </button>
  )
}
export default TogleDarkMode

'use client'
import { Switch } from '@headlessui/react'
import { useTheme } from 'next-themes'
import * as React from 'react'

function TogleDarkMode() {
  const { setTheme } = useTheme()
  const [isChecked, setIsChecked] = React.useState<boolean>(false)

  React.useEffect(() => {
    if (isChecked) {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }, [isChecked, setTheme])

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
    <div>
      <Switch
        checked={isChecked}
        onChange={setIsChecked}
        className="
          relative flex w-[45px] h-[25px] sm:w-[55px] sm:h-[30px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out bg-slate-400 items-center">
        <div
          aria-hidden="true"
          className={`${
            isChecked
              ? 'translate-x-[18px] sm:translate-x-[25px] bg-yellow-500'
              : 'translate-x-0 bg-gray-700'
          }
            pointer-events-none flex w-[23px] h-[23px] sm:w-[28px] sm:h-[28px] transform rounded-full shadow-lg ring-0 transition duration-200 ease-in-out text-white justify-center items-center p-1`}>
          {switchIcon}
        </div>
      </Switch>
    </div>
  )
}
export default TogleDarkMode

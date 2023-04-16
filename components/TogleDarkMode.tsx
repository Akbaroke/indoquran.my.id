'use client'
import { RootState } from '@/interfaces'
import { setTheme } from '@/redux/actions/theme'
import { Switch } from '@headlessui/react'
import { IconMoonFilled, IconSunFilled } from '@tabler/icons-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function ToggleDarkMode() {
  const dispatch = useDispatch()
  const { mode } = useSelector((state: RootState) => state.theme)

  const [isChecked, setIsChecked] = useState<boolean>(mode === 'dark')

  useEffect(() => {
    document.documentElement.classList.remove('dark', 'light')
    document.documentElement.classList.add(mode)
    document.documentElement.setAttribute('style', `color-scheme: ${mode};`)
    if (mode === 'light') {
      setIsChecked(false)
    } else {
      setIsChecked(true)
    }
  }, [mode])

  const toggleClick = () => {
    setIsChecked(!isChecked)
    dispatch(setTheme(isChecked ? 'light' : 'dark'))
  }

  return (
    <div>
      <Switch
        checked={isChecked}
        onChange={toggleClick}
        className="relative flex w-[45px] h-[25px] sm:w-[55px] sm:h-[30px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out bg-slate-400 items-center">
        <div
          className={`${
            isChecked
              ? 'translate-x-[18px] sm:translate-x-[25px] bg-yellow-500'
              : 'translate-x-0 bg-gray-700'
          }
            pointer-events-none flex w-[23px] h-[23px] sm:w-[28px] sm:h-[28px] transform rounded-full shadow-lg ring-0 transition duration-200 ease-in-out text-white justify-center items-center p-1`}>
          {isChecked ? <IconSunFilled /> : <IconMoonFilled />}
        </div>
      </Switch>
    </div>
  )
}

export default ToggleDarkMode

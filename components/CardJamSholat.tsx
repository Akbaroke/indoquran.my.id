/* eslint-disable @typescript-eslint/no-unused-vars */
import useCurrentDate from '@/hooks/useCurrentDate'
import countdown from '@/utils/countdown'
import getTimeDiff from '@/utils/getTimeDiff'
import subuh from '../assets/subuh.jpg'
import dzuhur from '../assets/dzuhur.jpg'
import ashar from '../assets/ashar.jpg'
import maghrib from '../assets/maghrib.jpg'
import isya from '../assets/isya.jpg'
import Image from 'next/image'
import { IconAlarm } from '@tabler/icons-react'

const bgImageActive = {
  subuh,
  dzuhur,
  ashar,
  maghrib,
  isya,
}

export default function CardJamSholat(props: {
  nama: string
  jam?: string
  active?: boolean
}) {
  const currentDate = useCurrentDate()

  let bg
  switch (props.nama) {
    case 'subuh':
      bg = bgImageActive.subuh
      break
    case 'dzuhur':
      bg = bgImageActive.dzuhur
      break
    case 'ashar':
      bg = bgImageActive.ashar
      break
    case 'maghrib':
      bg = bgImageActive.subuh
      break
    case 'isya':
      bg = bgImageActive.isya
      break
    default:
      bg = bgImageActive.subuh
      break
  }

  return props.active ? (
    <div className="w-full h-[100px] sm:w-[145px] sm:h-[100px] rounded-[10px] relative overflow-hidden text-[#f3f3f3] shadow-lg">
      <Image src={bg} alt="indoquran" className="absolute z-0 w-full h-full" />
      <div className="w-full h-full relative z-1 flex flex-col justify-center items-center bg-black/30">
        <div className="flex justify-center items-center gap-1">
          <IconAlarm className="w-5 h-5" />
          <p className="font-semibold text-[14px] capitalize"> {props.nama}</p>
        </div>
        <h2 className="font-bold text-[24px]">
          {countdown(getTimeDiff(props.jam as string), currentDate)}
        </h2>
        <p className="font-semibold text-[15px]">{props.jam}</p>
      </div>
    </div>
  ) : (
    <div
      className="w-full h-[100px] sm:w-[145px] sm:h-[100px] rounded-[10px] bg-[#00957B] bg-opacity-50 flex flex-col justify-center items-center"
      style={{ boxShadow: 'inset 0px 4px 4px rgba(0, 0, 0, 0.25)' }}>
      <h1 className="font-semibold text-[20px] capitalize">{props.nama}</h1>
      <p className="font-semibold text-[15px] text-[#f3f3f3]">{props.jam}</p>
    </div>
  )
}

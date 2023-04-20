'use client'
import * as React from 'react'
import {
  IconChevronsDown,
  // IconExternalLink,
  IconMapPinFilled,
} from '@tabler/icons-react'
import getRealtimeDate from '@/utils/getRealtimeDate'
import getTimeHijriah from '@/utils/getTimeHijriah'
import 'swiper/css'
import SwiperComponent from './SwiperComponent'
import CardJamSholat from './CardJamSholat'
import axios from 'axios'
// import { useDispatch } from 'react-redux'
// import { modalSorry } from '@/redux/actions/modal'
import getNearestPrayerTime from '@/utils/getNearestPrayerTime'
import { IconChevronsUp } from '@tabler/icons-react'

interface Jadwal {
  ashar: string
  dhuha: string
  dzuhur: string
  imsak: string
  isya: string
  maghrib: string
  subuh: string
  terbit: string
}

interface ListArea {
  id: string
  lokasi: string
}

export default function CardJadwalSholat() {
  const timeDate = getRealtimeDate()
  const timeHijriah = getTimeHijriah() as string
  const date = getCurrentTime()
  const [locationId, setLocationId] = React.useState('1301')
  const [area, setArea] = React.useState('...')
  const [jadwal, setJadwal] = React.useState<Jadwal>()
  const [listArea, setListArea] = React.useState<ListArea[]>()
  const [sholatActive, setSholatActive] = React.useState('')
  const [isOpenJadwal, setIsOpenJadwal] = React.useState(false)
  // const dispatch = useDispatch()

  React.useEffect(() => {
    const getDataListArea = async () => {
      const { data } = await axios.get(
        `https://api.myquran.com/v1/sholat/kota/semua`
      )
      setListArea(data)
    }
    getDataListArea()
  }, [])

  React.useEffect(() => {
    const getDataSholat = async () => {
      const { data } = await axios.get(
        `https://api.myquran.com/v1/sholat/jadwal/${locationId}/${date.year}/${
          date.month < 10 ? (('0' + date.month) as string) : date.month
        }/${date.date}`
      )
      console.log(data.data.lokasi)
      setArea(data.data.lokasi)
      setJadwal(data.data.jadwal)
      setSholatActive(getNearestPrayerTime(data.data.jadwal))
    }
    getDataSholat()
  }, [date.date, date.month, date.year, locationId])

  const handleChangeArea = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value: string = event.target.value
    setLocationId(value)
  }

  return (
    <div className="bg-white rounded-[10px] p-6 mb-5 dark:bg-slate-700 relative">
      <div
        className={`${
          isOpenJadwal ? 'h-max' : 'h-[60px] sm:h-[55px] overflow-hidden'
        }`}>
        <div className="flex justify-center sm:justify-between items-center">
          <div className="flex flex-col -gap-1">
            <h1 className="font-bold text-[20px] sm:text-[25px] text-center sm:text-left">
              Jadwal Sholat
            </h1>
            <div className="flex items-center gap-1 text-[var(--primary)] justify-center sm:justify-start">
              <IconMapPinFilled className="w-[10px] h-[11px]" />
              <p className="font-medium text-[12px] capitalize">
                {area.toLowerCase()}
              </p>
            </div>
          </div>
          <div className="hidden sm:flex items-end align-middle flex-col -gap-1">
            <p className="font-normal text-[12px] sm:text-[16px]">{timeDate}</p>
            <p
              className="font-semibold text-[12px] sm:text-[16px]"
              translate="no"
              style={{ contentVisibility: 'auto' }}>
              {timeHijriah}
            </p>
          </div>
        </div>
        <div className="py-5">
          <SwiperComponent
            datas={[
              {
                nama: 'subuh',
                jam: jadwal?.subuh,
                active: sholatActive === 'subuh' ? true : false,
              },
              {
                nama: 'dzuhur',
                jam: jadwal?.dzuhur,
                active: sholatActive === 'dzuhur' ? true : false,
              },
              {
                nama: 'ashar',
                jam: jadwal?.ashar,
                active: sholatActive === 'ashar' ? true : false,
              },
              {
                nama: 'maghrib',
                jam: jadwal?.maghrib,
                active: sholatActive === 'maghrib' ? true : false,
              },
              {
                nama: 'isya',
                jam: jadwal?.isya,
                active: sholatActive === 'isya' ? true : false,
              },
            ]}
          />
          <div className="hidden sm:flex justify-center items-center gap-2">
            <CardJamSholat
              nama="subuh"
              jam={jadwal?.subuh}
              active={sholatActive === 'subuh' ? true : false}
            />
            <CardJamSholat
              nama="dzuhur"
              jam={jadwal?.dzuhur}
              active={sholatActive === 'dzuhur' ? true : false}
            />
            <CardJamSholat
              nama="ashar"
              jam={jadwal?.ashar}
              active={sholatActive === 'ashar' ? true : false}
            />
            <CardJamSholat
              nama="maghrib"
              jam={jadwal?.maghrib}
              active={sholatActive === 'maghrib' ? true : false}
            />
            <CardJamSholat
              nama="isya"
              jam={jadwal?.isya}
              active={sholatActive === 'isya' ? true : false}
            />
          </div>
        </div>
        <div className="sm:hidden flex items-center align-middle flex-col -gap-1 text-center">
          <p className="font-normal text-[12px] sm:text-[16px]">{timeDate}</p>
          <p
            className="font-semibold text-[12px] sm:text-[16px]"
            translate="no"
            style={{ contentVisibility: 'auto' }}>
            {timeHijriah}
          </p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-[20px] mt-[10px] pt-[15px] m-auto border-t border-t-[#f4f4f4] dark:border-t-[#f4f4f4]/50 w-2/3 ">
          <select
            className="py-[7px] px-[14px] bg-[#f4f6f8] text-[var(--primary)] rounded-[10px] w-[194px] h-[40px] outline-none cursor-pointer dark:bg-slate-800"
            value={locationId}
            onChange={handleChangeArea}>
            <option value="">Pilih Lokasi</option>
            {listArea?.map((data, index) => (
              <option key={index} value={data.id}>
                {data.lokasi}
              </option>
            ))}
          </select>
          {/* <div
            className="flex justify-between items-center py-[7px] px-[14px] bg-[#f4f6f8] text-[var(--primary)] rounded-[10px] w-[194px] cursor-pointer dark:bg-slate-800 h-[40px]"
            onClick={() => {
              window.scrollTo(0, 0)
              dispatch(modalSorry())
            }}>
            <p>List Jadwal</p>
            <IconExternalLink className="w-[20px] h-[20px] stroke-[1.5]" />
          </div> */}
        </div>
      </div>
      <div
        className={`m-auto mt-2 flex flex-col justify-start items-center gap-0 text-slate-500 hover:text-slate-600 dark:text-slate-400 cursor-pointer hover:dark:text-slate-300 ${
          !isOpenJadwal
            ? 'absolute left-1/2 transform -translate-x-1/2 bottom-2'
            : 'relative -bottom-3 w-max'
        }`}
        onClick={() => setIsOpenJadwal(!isOpenJadwal)}>
        {isOpenJadwal ? (
          <IconChevronsUp className="w-4 h-4" />
        ) : (
          <IconChevronsDown className="w-4 h-4" />
        )}
      </div>
    </div>
  )
}

function getCurrentTime(): getCurrentTime {
  const currentTimestamp = Date.now()
  const currentDate = new Date(currentTimestamp)
  const result = {
    year: currentDate.getFullYear(),
    month: currentDate.getMonth() + 1,
    date: currentDate.getDate(),
  }
  return result
}

interface getCurrentTime {
  year: number
  month: number
  date: number
}
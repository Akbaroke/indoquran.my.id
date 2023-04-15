'use client'
import * as React from 'react'
import Link from 'next/link'
import { IconChevronRight, IconExternalLink } from '@tabler/icons-react'
import { RootState } from '@/interfaces'
import { useDispatch, useSelector } from 'react-redux'
import { CountDownTime } from '@/utils/CountDownTime'
import useCurrentDate from '@/hooks/useCurrentDate'
import { modalLoading, unsetModal } from '@/redux/actions/modal'

export default function Page() {
  const { like } = useSelector((state: RootState) => state.store)
  const dispatch = useDispatch()
  const currentDate = useCurrentDate()

  React.useEffect(() => {
    dispatch(unsetModal())
  }, [dispatch])

  return (
    <div className="max-w-[1107px] h-max m-auto relative">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center py-4 px-2 text-[var(--primary)] font-semibold text-[14px]">
          <Link
            href="/"
            onClick={() => {
              window.scrollTo(0, 0)
              dispatch(modalLoading())
            }}>
            Daftar Surat
          </Link>
          <IconChevronRight className="h-4" />
          <p>Suka</p>
        </div>
        <p className="text-[var(--primary)] font-semibold text-[14px]">
          Jumlah {like.length}
        </p>
      </div>
      <div className="h-max flex flex-col gap-4">
        {like.map((data, index) => (
          <Link
            href={data.url as string}
            onClick={() => {
              window.scrollTo(0, 0)
              dispatch(modalLoading(`proses membuka surat ${data.namaSurat}`))
            }}
            key={index}
            className="bg-white/50 backdrop-blur-sm rounded-[10px] p-5 sm:p-6 flex justify-between items-center dark:bg-slate-700/50 hover:shadow-md hover:shadow-gray-200 dark:hover:shadow-slate-700 transition-all cursor-pointer">
            <div className="flex flex-col gap-4 items-start">
              <p className="font-bold text-[18px] text-[var(--primary)]">
                QS. {data.namaSurat} : {data.nomorSurat}
              </p>
              <div className="bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-1 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400">
                <p className="text-[14px]">Ayat {data.nomorAyat}</p>
              </div>
            </div>
            <div className="flex flex-col gap-4 items-end">
              <IconExternalLink className="text-gray-400 w-[30px] h-[30px]" />
              <p className="text-[15px] italic">
                {CountDownTime(data.timestamp, currentDate)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

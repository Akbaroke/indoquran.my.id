'use client'
import * as React from 'react'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { IconHeartFilled, IconBookmark } from '@tabler/icons-react'
import Link from 'next/link'
import { modalLoading } from '@/redux/actions/modal'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/interfaces'
import PathLocation from '@/utils/PathLocation'
import { useRouter } from 'next/navigation'
import { IconCategory2 } from '@tabler/icons-react'

export default function ButtonNavbar() {
  const dispatch = useDispatch()
  const { bookmark } = useSelector((state: RootState) => state.store)
  const route = useRouter()

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="text-[var(--primary)] rounded cursor-pointer bg-gray-200 dark:bg-gray-700 px-2 py-2 sm:px-3 sm:py-2">
          <IconCategory2 className="h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95">
        <Menu.Items className="absolute right-0 mt-2 w-44 origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-slate-600 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/suka"
                  className={`${
                    active ? 'bg-gray-200 dark:bg-gray-800' : ''
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  onClick={() => {
                    window.scrollTo(0, 0)
                    dispatch(modalLoading())
                  }}>
                  <IconHeartFilled className="mr-2 h-5 w-5 fill-red-600 text-red-600" />
                  Daftar Suka
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) =>
                parseInt(PathLocation()) === bookmark?.nomorSurat ? (
                  <div
                    className={`${
                      active ? 'bg-gray-200 dark:bg-gray-800' : ''
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm cursor-pointer`}
                    onClick={() => {
                      route.push('/')
                      bookmark &&
                        dispatch(
                          modalLoading(
                            `proses membuka surat ${bookmark.namaSurat} ayat ${bookmark.nomorAyat}`
                          )
                        )
                      window.location.href = `${window.location.origin}${bookmark.url}`
                    }}>
                    <IconBookmark className="mr-2 h-5 w-5 fill-[#E5A620] text-[#E5A620]" />
                    Buka Penanda
                  </div>
                ) : (
                  <Link
                    href={bookmark ? (bookmark.url as string) : ''}
                    className={`${
                      active ? 'bg-gray-200 dark:bg-gray-800' : ''
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm cursor-pointer`}
                    onClick={() => {
                      window.scrollTo(0, 0)
                      bookmark &&
                        dispatch(
                          modalLoading(
                            `proses membuka surat ${bookmark.namaSurat} ayat ${bookmark.nomorAyat}`
                          )
                        )
                    }}>
                    <IconBookmark className="mr-2 h-5 w-5 fill-[#E5A620] text-[#E5A620]" />
                    Buka Penanda
                  </Link>
                )
              }
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

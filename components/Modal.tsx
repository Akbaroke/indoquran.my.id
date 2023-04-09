'use client'
import * as React from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/interfaces'
import { unsetModal } from '@/redux/actions/modal'
import LoadingAnimation from './LoadingAnimation'
import StorySetDevelopment from '@/assets/development.svg'
import Image from 'next/image'

export default function Modal() {
  return (
    <>
      <DialogLoading />
      <DialogMessageSorry />
    </>
  )
}

const DialogLoading = () => {
  const { isOpen, type, message } = useSelector(
    (state: RootState) => state.modal
  )

  return (
    <Transition appear show={isOpen && type === 'loading'} as={React.Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => null}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black bg-opacity-25 dark:bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-slate-800 p-10 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="div" className="flex justify-center">
                  <LoadingAnimation />
                </Dialog.Title>
                <div className="mt-5 text-center">
                  <p className="text-sm text-gray-400">Mohon tunggu...</p>
                  <p className="text-sm text-gray-400">{message}</p>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
const DialogMessageSorry = () => {
  const { isOpen, type } = useSelector((state: RootState) => state.modal)
  const dispatch = useDispatch()

  return (
    <Transition appear show={isOpen && type === 'sorry'} as={React.Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => dispatch(unsetModal())}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black bg-opacity-25 dark:bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-slate-800 p-10 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="div" className="flex justify-center">
                  <Image
                    src={StorySetDevelopment}
                    alt="story set"
                    width={300}
                    height={200}
                  />
                </Dialog.Title>
                <div className="mt-5 text-center">
                  <p className="text-sm text-gray-400">Mohon maaf...</p>
                  <p className="text-sm text-gray-400">
                    Fitur masih dalam tahap pengembangan.
                  </p>
                </div>
                <div className="flex justify-center mt-10">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2"
                    onClick={() => dispatch(unsetModal())}>
                    Ok, thanks!
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

// ;<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-10 text-left align-middle shadow-xl transition-all">
//   <Dialog.Title as="div" className="flex justify-center">
//     <StorySetDevelopment />
//   </Dialog.Title>
//   <div className="mt-5 text-center">
//     <p className="text-sm text-gray-400">Mohon maaf...</p>
//     <p className="text-sm text-gray-400">
//       Fitur masih dalam tahap pengembangan.
//     </p>
//   </div>
  // <div className="mt-4">
  //   <button
  //     type="button"
  //     className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
  //     onClick={() => dispatch(unsetModal())}>
  //     Ok, thanks!
  //   </button>
  // </div>
// </Dialog.Panel>



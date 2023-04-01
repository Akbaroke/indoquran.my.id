'use client'
import * as React from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useSelector } from 'react-redux'
import { RootState } from '@/interfaces'
// import { unsetModal } from '@/redux/actions/modal'
import LoadingAnimation from './LoadingAnimation'

export default function Modal() {
  return (
    <>
      <DialogLoading />
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
          <div className="fixed inset-0 bg-black bg-opacity-25" />
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-10 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="div" className="flex justify-center">
                  <LoadingAnimation />
                </Dialog.Title>
                <div className="mt-5 text-center">
                  <p className="text-sm text-gray-400">Mohon tunggu...</p>
                  <p className="text-sm text-gray-400">
                    proses membuka surat {message}.
                  </p>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
// const DialogPesan = () => {
//   const { isOpen, type } = useSelector((state: RootState) => state.modal)
//   const dispatch = useDispatch()

//   return (
//     <Transition appear show={isOpen && type === 'loading'} as={React.Fragment}>
//       <Dialog
//         as="div"
//         className="relative z-10"
//         onClose={() => dispatch(unsetModal())}>
//         <Transition.Child
//           as={React.Fragment}
//           enter="ease-out duration-300"
//           enterFrom="opacity-0"
//           enterTo="opacity-100"
//           leave="ease-in duration-200"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0">
//           <div className="fixed inset-0 bg-black bg-opacity-25" />
//         </Transition.Child>

//         <div className="fixed inset-0 overflow-y-auto">
//           <div className="flex min-h-full items-center justify-center p-4 text-center">
//             <Transition.Child
//               as={React.Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0 scale-95"
//               enterTo="opacity-100 scale-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100 scale-100"
//               leaveTo="opacity-0 scale-95">
//               <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
//                 <Dialog.Title
//                   as="h3"
//                   className="text-lg font-semibold text-center leading-6">
//                   Loading...
//                 </Dialog.Title>
//                 <div className="mt-2">
//                   <p className="text-sm text-gray-500"></p>
//                 </div>

//                 <div className="mt-4">
//                   <button
//                     type="button"
//                     className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
//                     onClick={() => {
//                       dispatch(unsetModal())
//                       console.log('tes')
//                     }}>
//                     Got it, thanks!
//                   </button>
//                 </div>
//               </Dialog.Panel>
//             </Transition.Child>
//           </div>
//         </div>
//       </Dialog>
//     </Transition>
//   )
// }

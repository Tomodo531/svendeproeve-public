import { Dialog, Transition } from '@headlessui/react'
import { Dispatch, Fragment, ReactNode, SetStateAction } from 'react'
import { XCircleIcon } from '@heroicons/react/outline'

interface props {
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>
    children: ReactNode
}

export const Drawer = ({ isOpen, setIsOpen, children }: props) => {
    const handleClose = () => {
        setIsOpen(false)
    }

    return (
        <Transition show={isOpen} as={Fragment} unmount={true}>
            <Dialog onClose={handleClose} className="fixed inset-0 z-50">
                <div className="overflow-none flex justify-center">
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-in duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-30"
                        entered="opacity-30"
                        leave="transition-opacity ease-out duration-300"
                        leaveFrom="opacity-30"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="z-40 fixed inset-0 bg-black" />
                    </Transition.Child>

                    <Transition.Child
                        as={Fragment}
                        enter="transition duration-300 ease-out"
                        enterFrom="transform translate-y-full"
                        enterTo="transform translate-y-0 scale-100 opacity-100"
                        leave="transition duration-300 ease-out"
                        leaveFrom="transform translate-y-0"
                        leaveTo="transform translate-y-full"
                    >
                        <div className="absolute bottom-0 z-50 w-full bg-primary rounded max-h-[90%] overflow-y-auto p-2">
                            <XCircleIcon
                                className="text-white absolute right-2 top-2 h-[40px] w-[40px] stroke-1"
                                onClick={handleClose}
                            />

                            <div className="md:px-10 px-6 py-6">{children}</div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    )
}

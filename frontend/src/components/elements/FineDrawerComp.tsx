import Wrapper from '@components/common/Wrapper'
import clsx from 'clsx'
import React, { Dispatch, SetStateAction } from 'react'
import { XCircleIcon, DotsCircleHorizontalIcon, CheckCircleIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import Link from 'next/link'
import { Fine } from 'types/Fine'
import { status } from '@lib/fineStatus'
import Button from './Button'
import axios from '@lib/axios'
import { User } from 'types/User'

interface FineDrawerCompProps {
    fine: Fine
    index: number
    mutatePageItem: (item: any, index: number) => void
    user: User
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

function FineDrawerComp({ fine, index, mutatePageItem, user, setIsOpen }: FineDrawerCompProps) {
    const changeFineStatus = (inputStatus: status) => {
        let endpoint

        switch (inputStatus) {
            case status.PENDING:
                endpoint = 'api/fine/pay'
                break
            case status.PAID:
                endpoint = 'api/fine/confirm'
                break
            case status.REJECTED:
                endpoint = 'api/fine/reject'
                break
            default:
                throw 'Fine status not found'
        }

        axios
            .patch(`${endpoint}/${fine.id}`)
            .then(() => {
                fine.status = inputStatus
                mutatePageItem(fine, index)
            })
            .catch((err) => console.log(err))
    }

    const deleteFine = () => {
        if (confirm('Are you sure you want to delete this fine?')) {
            axios
                .delete(`api/fine/delete/${fine.id}`)
                .then(() => {
                    mutatePageItem(null, index)
                    setIsOpen(false)
                })
                .catch((err) => console.log(err))
        }
    }

    return (
        <Wrapper>
            <div className="text-center font-semibold leading-8">
                {fine.premade_fine_id ? (
                    <Link href={`/premadefine/form/${fine.premade_fine_id}`}>
                        <p className="text-turquoise text-xl">{fine.title}</p>
                    </Link>
                ) : (
                    <p className="text-white text-xl">{fine.title}</p>
                )}

                <p className="text-lightGrey">Status</p>
            </div>

            <div className="flex flex-row justify-center">
                <XCircleIcon
                    className={clsx(
                        fine.status !== status.WAITING &&
                            fine.status !== status.REJECTED &&
                            'opacity-20',
                        'h-[70px] w-[70px] text-red-600'
                    )}
                />
                <DotsCircleHorizontalIcon
                    className={clsx(
                        fine.status !== status.PENDING && 'opacity-20',
                        'h-[70px] w-[70px] text-yellow-400'
                    )}
                />
                <CheckCircleIcon
                    className={clsx(
                        fine.status !== status.PAID && 'opacity-20',
                        'h-[70px] w-[70px] text-green-600'
                    )}
                />
            </div>

            <Button onClick={() => changeFineStatus(status.PENDING)}>Pay fine</Button>

            {user.admin && (
                <>
                    <Button appearance="primary" onClick={() => changeFineStatus(status.PAID)}>
                        Confirm fine
                    </Button>
                    <Button appearance="alert" onClick={() => changeFineStatus(status.REJECTED)}>
                        Reject fine
                    </Button>

                    <div className="mt-5">
                        <Button appearance="alert" onClick={() => deleteFine()}>
                            Delete fine
                        </Button>
                    </div>
                </>
            )}
        </Wrapper>
    )
}

export default FineDrawerComp

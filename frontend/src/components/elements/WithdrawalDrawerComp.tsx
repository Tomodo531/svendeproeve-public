import Wrapper from '@components/common/Wrapper'
import Button from '@components/elements/Button'
import axios from '@lib/axios'
import { AxiosResponse } from 'axios'
import { useRouter } from 'next/router'
import React, { Dispatch, SetStateAction } from 'react'
import { Withdrawal } from 'types/Withdrawal'

interface WithdrawalDrawerComp {
    index: number
    mutatePageItem: (item: any, index: number) => void
    withdrawal: Withdrawal
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

const WithdrawalDrawerComp = ({ index, mutatePageItem, withdrawal, setIsOpen }: WithdrawalDrawerComp) => {
    const router = useRouter()
    
    const cancelWithdrawal = () => {
        if (confirm('Are you sure you want to cancel this withdrawal')) {
            axios
                .delete(`api/balance/withdraw/cancel/${withdrawal.id}`)
                .then((res: AxiosResponse) => {
                    mutatePageItem(null, index)
                    setIsOpen(false)
                })
                .catch((err) => console.log(err))
        }
    }
    return (
        <div className="mb-5 my-8">
            <Wrapper>
                <Button
                    onClick={() => cancelWithdrawal()}
                >
                    Cancel withdrawal
                </Button>
            </Wrapper>
        </div>
    )
}

export default WithdrawalDrawerComp

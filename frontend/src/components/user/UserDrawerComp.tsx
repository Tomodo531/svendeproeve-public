import Wrapper from '@components/common/Wrapper'
import Button from '@components/elements/Button'
import axios from '@lib/axios'
import { AxiosResponse } from 'axios'
import { useRouter } from 'next/router'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { User } from 'types/User'

interface UserDrawerComp {
    index: number
    mutatePageItem: (item: any, index: number) => void
    user: User
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

const UserDrawerComp = ({ index, mutatePageItem, user, setIsOpen }: UserDrawerComp) => {
    const router = useRouter()
    const [error, seterror] = useState('')
    
    const changeAdminStatus = () => {
        if (confirm(`Are you sure you want to ${user.admin ? 'demote admin' : 'promote user to admin'}?`)) {
            axios
                .patch(`admin/${user.id}`)
                .then((res: AxiosResponse) => {
                    user.admin = res.data
                    mutatePageItem(user, index)
                    setIsOpen(false)
                })
                .catch(error => {
                    if (error.response.status !== 403) throw error
    
                    seterror(error.response.data.message)
                })
        }
    }
    return (
        <div className="mb-5 my-8">
            <Wrapper>
                <p className="text-center text-red-600">{error}</p>
                <Button
                    onClick={() => router.push(`/user/${user.id}`)}
                >
                    Go to profile
                </Button>
                <Button
                    onClick={() => router.push(`/fine/${user.id}`)}
                >
                    Go to fines
                </Button>
                <Button
                    onClick={() => changeAdminStatus()}
                >
                    {
                        user.admin ? 'Demote admin' : 'Promote to admin'
                    }
                </Button>
            </Wrapper>
        </div>
    )
}

export default UserDrawerComp

import Wrapper from '@components/common/Wrapper'
import { useAuth } from '@lib/hooks/useAuth'
import { useGlobalContext } from 'context/GlobalContext'
import { useRouter } from 'next/router'
import React from 'react'
import Button from './Button'
import { Fine } from './Fine'

const LatestFines = () => {
    const { latestFines } = useGlobalContext()
    const router = useRouter()
    const { user } = useAuth()

    if (latestFines.length < 1)
        return (
            <div className="text-center text-xl text-white font-semibold my-5 leading-tight">
                <p className="text-xl">No fines yet</p>
                <p className="text-lg text-lightGrey">Lucky you</p>
            </div>
        )

    return (
        <Wrapper>
            {latestFines.map((fine) => (
                <Fine fine={fine} key={fine.id} />
            ))}

            <Button onClick={() => router.push(`/fine/${user.id}`)}>All my fines</Button>
        </Wrapper>
    )
}

export default LatestFines

import Wrapper from '@components/common/Wrapper'
import { useAuth } from '@lib/hooks/useAuth'
import { useGlobalContext } from 'context/GlobalContext'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Button from './Button'
import { Drawer } from './Drawer'
import { Fine } from './Fine'
import FineDrawerComp from './FineDrawerComp'
import { Fine as FineType } from 'types/Fine'
import { mutate } from 'swr'

const LatestFines = () => {
    const { latestFines } = useGlobalContext()
    const router = useRouter()
    const { user } = useAuth()

    const [isOpen, setIsOpen] = useState(false)
    const [selectedFine, setSelectedFine] = useState<FineType | null>(null)
    const [selectedFineIndex, setSelectedFineIndex] = useState(0)

    const handleFineOnClick = (fine: FineType, index: number) => {
        setSelectedFine(fine)
        setSelectedFineIndex(index)
        setIsOpen(true)
    }

    if (latestFines.length < 1)
        return (
            <div className="text-center text-xl text-white font-semibold my-5 leading-tight">
                <p className="text-xl">No fines yet</p>
                <p className="text-lg text-lightGrey">Lucky you</p>
            </div>
        )

    return (
        <>
            <Wrapper>
                {latestFines.map((fine, index) => (
                    <div key={fine.id} onClick={() => handleFineOnClick(fine, index)}>
                        <Fine fine={fine} />
                    </div>
                ))}

                <Button onClick={() => router.push(`/fine/${user.id}`)}>All my fines</Button>
            </Wrapper>
            <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
                {selectedFine && (
                    <FineDrawerComp
                        fine={selectedFine}
                        index={selectedFineIndex}
                        mutatePageItem={() => mutate('/api/fine/latestFines')}
                        user={user}
                        setIsOpen={setIsOpen}
                    />
                )}
            </Drawer>
        </>
    )
}

export default LatestFines

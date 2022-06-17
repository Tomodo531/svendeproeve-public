import { usePaginate } from '@lib/hooks/usePaginate'
import Button from '@components/elements/Button'
import { Fine } from '@components/elements/Fine'
import Input from '@components/elements/Input'
import PageHeader from '@components/elements/PageHeader'
import { useRouter } from 'next/router'
import axios from '@lib/axios'
import { useEffect, useState } from 'react'
import Wrapper from '@components/common/Wrapper'
import { Drawer } from '@components/elements/Drawer'
import FineDrawerComp from '@components/elements/FineDrawerComp'
import { Fine as FineType } from 'types/Fine'
import { useAuth } from '@lib/hooks/useAuth'

const FineList = () => {
    const router = useRouter()
    const { id } = router.query
    const endpoint = id && id === 'all' ? 'api/fine' : `api/fine/user/${id}`

    if (!id) return <div>loading...</div>

    return <List endpoint={endpoint} id={id} />
}

const List = ({ endpoint, id }: { endpoint: string; id: string | string[] | undefined }) => {
    const { user } = useAuth();

    const [isOpen, setIsOpen] = useState(false)
    const [selectedFine, setSelectedFine] = useState<FineType | null>(null)
    const [selectedFineIndex, setSelectedFineIndex] = useState(0)

    const [name, setName] = useState('')
    const { lastPage, pages, nextPage, setSearch, mutatePageItem } = usePaginate(endpoint)

    const handleFineOnClick = (fine: FineType, index: number) => {
        setSelectedFine(fine)
        setSelectedFineIndex(index)
        setIsOpen(true)
    }

    useEffect(() => {
        if (id === 'all') return

        axios
            .get(`api/user/profile/${id}`)
            .then((res) => {
                setName(res.data.user.name)
            })
            .catch((err) => console.log(err))
    }, [id])

    return (
        <>
            <PageHeader headline={`All ${name} fines`} subHeadline="List of all fines" />

            <Input
                name="search"
                type="text"
                placeholder="Search"
                onChange={(event) => setSearch(event.target.value)}
                required
            />

            <Wrapper>
                {pages.map((fine, index) => (
                    <div key={fine.id} onClick={() => handleFineOnClick(fine, index)}>
                        <Fine fine={fine} />
                    </div>
                ))}
            </Wrapper>

            {!lastPage && <Button onClick={nextPage}>Load more</Button>}

            <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
                {selectedFine && (
                    <FineDrawerComp
                        fine={selectedFine}
                        index={selectedFineIndex}
                        mutatePageItem={mutatePageItem}
                        user={user}
                        setIsOpen={setIsOpen}
                    />
                )}
            </Drawer>
        </>
    )
}

export default FineList

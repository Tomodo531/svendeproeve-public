import { usePaginate } from '@lib/hooks/usePaginate'
import Button from '@components/elements/Button'
import { Fine as PremadeFine } from '@components/elements/Fine'
import Link from 'next/link'
import Input from '@components/elements/Input'
import PageHeader from '@components/elements/PageHeader'
import Wrapper from '@components/common/Wrapper'

const Premadefine = () => {
    const { lastPage, pages, nextPage, setSearch } = usePaginate('api/premadefine')

    return (
        <>
            <PageHeader headline="All Premade fines" subHeadline="List of all Premade fines" />

            <Input
                name="search"
                type="text"
                placeholder="Search"
                onChange={(event) => setSearch(event.target.value)}
                required
            />

            <Wrapper>
                {pages.map((premadefine) => (
                    <Link href={`/premadefine/form/${premadefine.id}`} key={premadefine.id} passHref>
                        <PremadeFine fine={premadefine} />
                    </Link>
                ))}
            </Wrapper>

            {!lastPage && <Button onClick={nextPage}>Load more</Button>}
        </>
    )
}

export default Premadefine

import Wrapper from '@components/common/Wrapper'
import Button from '@components/elements/Button'
import Input from '@components/elements/Input'
import NextPrev from '@components/fineForm/NextPrev'
import PageHeader from '@components/elements/PageHeader'
import UserCard from '@components/user/UserCard'
import { usePaginate } from '@lib/hooks/usePaginate'
import { User } from 'types/User'

interface RecipientFormTypes {
    recipient: User | null
    setRecipient: React.Dispatch<React.SetStateAction<User | null>>
    nextStep: (specificStep?: number | undefined) => void
}

function RecipientForm({ setRecipient, nextStep }: RecipientFormTypes) {
    const { lastPage, pages, nextPage, setSearch } = usePaginate('api/user/all')

    const handleRecipient = (user: User) => {
        setRecipient(user)
        nextStep()
    }

    return (
        <>
            <PageHeader headline="Recipient" subHeadline="Choose the recipient of the fine(s)" />

            <Input
                name="search"
                type="text"
                placeholder="Search"
                onChange={(event) => setSearch(event.target.value)}
                required
            />

            <Wrapper>
                {pages.map((user) => (
                    <div onClick={() => handleRecipient(user)} key={user.id}>
                        <UserCard user={user} />
                    </div>
                ))}
            </Wrapper>

            {!lastPage && <Button onClick={nextPage}>Load more</Button>}
        </>
    )
}

export default RecipientForm

import { usePaginate } from '@lib/hooks/usePaginate'
import Button from '@components/elements/Button'
import Input from '@components/elements/Input'
import UserCard from '@components/user/UserCard'
import Wrapper from '@components/common/Wrapper'
import PageHeader from '@components/elements/PageHeader'
import { Drawer } from '@components/elements/Drawer'
import { User } from 'types/User'
import { useState } from 'react'
import UserDrawerComp from '@components/user/UserDrawerComp'
import { useAuth } from '@lib/hooks/useAuth'
import { useRouter } from 'next/router'

const Users = () => {
    const { user: currentUser } = useAuth()
    const router = useRouter()

    const [isOpen, setIsOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [selectedUserIndex, setSelectedUserIndex] = useState(0)

    const { lastPage, pages, nextPage, setSearch, mutatePageItem } = usePaginate('api/user/all')

    const handleUserOnClick = (user: User, index: number) => {
        if (!currentUser.admin) router.push(`/user/${user.id}`)

        setSelectedUser(user)
        setSelectedUserIndex(index)
        setIsOpen(true)
    }

    return (
        <>
            <PageHeader headline="All User" subHeadline="List of all users" />

            <Input
                name="search"
                type="text"
                placeholder="Search"
                onChange={(event) => setSearch(event.target.value)}
                required
            />

            <Wrapper>
                {pages.map((user, index) => (
                    <div key={user.id} onClick={() => handleUserOnClick(user, index)}>
                        <UserCard user={user} key={user.id} />
                    </div>
                ))}
            </Wrapper>

            {!lastPage && <Button onClick={nextPage}>Load more</Button>}

            {currentUser?.admin && currentUser.admin && (
                <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
                    {selectedUser && (
                        <UserDrawerComp
                            user={selectedUser}
                            index={selectedUserIndex}
                            mutatePageItem={mutatePageItem}
                            setIsOpen={setIsOpen}
                        />
                    )}
                </Drawer>
            )}
        </>
    )
}

export default Users

import { usePaginate } from '@lib/hooks/usePaginate'
import Button from '@components/elements/Button'
import Input from '@components/elements/Input'
import PageHeader from '@components/elements/PageHeader'
import WithdrawalCard from '@components/elements/WithdrawalCard'
import Wrapper from '@components/common/Wrapper'
import AdminWrapper from '@components/common/AdminWrapper'
import { Drawer } from '@components/elements/Drawer'
import WithdrawalDrawerComp from '@components/elements/WithdrawalDrawerComp'
import { Withdrawal } from 'types/Withdrawal'
import { useState } from 'react'
import { useGlobalContext } from 'context/GlobalContext'

const Withdrawals = () => {
    const { balance } = useGlobalContext()

    const [isOpen, setIsOpen] = useState(false)
    const [selectedWithdrawal, setSelectedWithdrawal] = useState<Withdrawal | null>(null)
    const [selectedWithdrawalIndex, setSelectedWithdrawalIndex] = useState(0)

    const { lastPage, pages, nextPage, setSearch, mutatePageItem } =
        usePaginate('api/balance/withdrawals')

    const handleWithDrawalOnClick = (withdrawal: Withdrawal, index: number) => {
        setSelectedWithdrawal(withdrawal)
        setSelectedWithdrawalIndex(index)
        setIsOpen(true)
    }

    return (
        <>
            <PageHeader headline="All withdrawals" subHeadline="List of all withdrawals" />

            <div className="text-white font-semibold text-center my-4">
                <p className="text-xl">Balance</p>
                <h1 className="text-4xl">{balance} kr</h1>
            </div>

            <Input
                name="search"
                type="text"
                placeholder="Search"
                onChange={(event) => setSearch(event.target.value)}
                required
            />

            <Wrapper>
                {pages.map((withdrawal, index) => (
                    <div
                        onClick={() => handleWithDrawalOnClick(withdrawal, index)}
                        key={withdrawal.id}
                    >
                        <WithdrawalCard withdrawal={withdrawal} />
                    </div>
                ))}
            </Wrapper>

            {!lastPage && <Button onClick={nextPage}>Load more</Button>}

            <AdminWrapper>
                <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
                    {selectedWithdrawal && (
                        <WithdrawalDrawerComp
                            withdrawal={selectedWithdrawal}
                            index={selectedWithdrawalIndex}
                            mutatePageItem={mutatePageItem}
                            setIsOpen={setIsOpen}
                        />
                    )}
                </Drawer>
            </AdminWrapper>
        </>
    )
}

export default Withdrawals

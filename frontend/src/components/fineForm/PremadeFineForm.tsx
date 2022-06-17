import Input from '@components/elements/Input'
import NextPrev from '@components/fineForm/NextPrev'
import PageHeader from '@components/elements/PageHeader'
import { FineAction } from '@lib/utils/reducers/fineReducer'
import React from 'react'
import Button from '@components/elements/Button'
import { usePaginate } from '@lib/hooks/usePaginate'
import { PremadeFine as PremadeFineType } from 'types/PremadeFine'
import PremadeFineCheckbox from '@components/fineForm/PremadeFineCheckbox'
import Wrapper from '@components/common/Wrapper'
import PremadeFineCard from '@components/elements/PremadeFineCard'

interface PremadeFineFormTypes {
    state: PremadeFineType[]
    dispatch: React.Dispatch<FineAction>
    customfine: PremadeFineType | null
    nextStep: (specificStep?: number | undefined) => void
    prevStep: (specificStep?: number | undefined) => void
}

function PremadeFineForm({
    state,
    dispatch,
    customfine,
    nextStep,
    prevStep,
}: PremadeFineFormTypes) {
    const { lastPage, pages, nextPage, setSearch } = usePaginate('api/premadefine')

    return (
        <>
            <PageHeader headline="All Premade fines" subHeadline="List of all Premade fines" />

            {customfine ? (
                <div onClick={() => nextStep(3)}>
                    <p className="font-semibold text-white mb-2">Custome fine:</p>
                    <PremadeFineCard premadeFine={customfine} />
                </div>
            ) : (
                <Button onClick={() => nextStep(3)}>Create custom fine</Button>
            )}

            <hr className="m-auto my-5 w-[90%] border-none h-[2px] bg-secondary" />

            <Input
                name="search"
                type="text"
                placeholder="Search"
                onChange={(event) => setSearch(event.target.value)}
                required
            />

            <Wrapper>
                {pages.map((premadefine) => (
                    <PremadeFineCheckbox
                        premadeFine={premadefine}
                        state={state}
                        dispatch={dispatch}
                        key={premadefine.id}
                    />
                ))}
            </Wrapper>

            {!lastPage && <Button onClick={nextPage}>Load more</Button>}

            <div className="fixed left-0 right-0 bottom-[80px] mx-5">
                <NextPrev nextStep={() => nextStep(4)} prevStep={() => prevStep(1)} />
            </div>
        </>
    )
}

export default PremadeFineForm

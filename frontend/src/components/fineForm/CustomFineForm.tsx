import MoneyForm from '@components/common/MoneyForm'
import ValidationErrors from '@components/common/ValidationErrors'
import NextPrev from '@components/fineForm/NextPrev'
import PageHeader from '@components/elements/PageHeader'
import React from 'react'
import { PremadeFine } from 'types/PremadeFine'

interface CustomFineFormTypes {
    customfine: PremadeFine | null
    setCustomfine: React.Dispatch<React.SetStateAction<PremadeFine | null>>
    nextStep: (specificStep?: number | undefined) => void
    prevStep: (specificStep?: number | undefined) => void
}

function CustomFineForm({ customfine, setCustomfine, nextStep, prevStep }: CustomFineFormTypes) {
    const submitForm = async (event: React.SyntheticEvent, fine: PremadeFine) => {
        event.preventDefault()
        setCustomfine(fine)
        nextStep(2)
    }

    return (
        <>
            <PageHeader headline="Premade Fine" subHeadline="Create premade fine" />

            <ValidationErrors className="mb-4" errors={[]} />

            <MoneyForm
                submitForm={submitForm}
                initialValue={customfine}
                submitButtonText="Create fine"
            />

            <div className="fixed left-0 right-0 bottom-[80px] mx-5">
                <NextPrev prevStep={() => prevStep(2)} />
            </div>
        </>
    )
}

export default CustomFineForm

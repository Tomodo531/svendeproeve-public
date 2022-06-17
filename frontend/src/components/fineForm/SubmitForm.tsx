import Wrapper from '@components/common/Wrapper'
import NextPrev from '@components/fineForm/NextPrev'
import PageHeader from '@components/elements/PageHeader'
import PremadeFineCard from '@components/elements/PremadeFineCard'
import UserCard from '@components/user/UserCard'
import React from 'react'
import CurrencyInput from 'react-currency-input-field'
import { PremadeFine } from 'types/PremadeFine'
import { User } from 'types/User'
import axios from '@lib/axios'
import { useRouter } from 'next/router'
import ValidationErrors from '@components/common/ValidationErrors'
import { useError } from '@lib/hooks/useError'
import Button from '@components/elements/Button'
import { mutate } from 'swr'
import { XIcon } from '@heroicons/react/outline'

interface SubmitFormTypes {
    recipient: User | null
    state: PremadeFine[]
    customfine: PremadeFine | null
    setCustomfine: React.Dispatch<React.SetStateAction<PremadeFine | null>>
    prevStep: (specificStep?: number | undefined) => void
}

function SubmitForm({ recipient, state, customfine, setCustomfine, prevStep }: SubmitFormTypes) {
    const router = useRouter()
    const { errors, setResponse, setErrors } = useError()

    const submitFine = () => {
        if (!recipient) return setErrors(['You need to pick a recipient'])
        if (state.length === 0 && customfine === null)
            return setErrors(['You need to pick or create a custom fine'])

        axios
            .post('api/fine/create', {
                user_id: recipient.id,
                fines: customfine ? [...state, {...customfine, id: null}] : state,
            })
            .then(() => {
                mutate('/api/balance')
                mutate('/api/fine/topContributors')
                router.push('/dashboard')
            })
            .catch((err) => setResponse(err))
    }

    return (
        <>
            <PageHeader headline="Recipient" subHeadline="Choose the recipient of the fine(s)" />
            <Wrapper>
                <div className="flex flex-col gap-1 mb-3">
                    <h1 className="mb-1 text-2xl text-lightGrey text-center">Total Amount</h1>

                    <CurrencyInput
                        prefix="DKK "
                        decimalSeparator="."
                        value={state.reduce(
                            (partialSum, premadeFine) =>
                                /*@ts-ignore */
                                partialSum + parseFloat(premadeFine.amount),
                                /*@ts-ignore */
                            (customfine?.amount ? parseFloat(customfine.amount) : 0)
                        )}
                        disabled={true}
                        className="outline-0 bg-transparent text-center text-white text-4xl font-semibold"
                    />
                </div>

                <ValidationErrors className="mb-3" errors={errors} />

                <h1 className="text-white font-semibold">Recipient:</h1>
                {/*@ts-ignore */}
                <UserCard user={recipient} />

                {customfine && (
                    <>
                        <h1 className="text-white font-semibold">Custom Fine:</h1>
                        <div className="flex flex-row gap-2">
                            <PremadeFineCard premadeFine={customfine} />
                            <button
                                className="flex items-center justify-center bg-turquoise h-[72px] p-4 rounded-xl"
                                onClick={() => setCustomfine(null)}
                            >
                                <XIcon className="text-primary h-[40px] w-[40px]"/>
                            </button>
                        </div>
                    </>
                )}

                <h1 className="text-white font-semibold">Premade Fines ({state.length}):</h1>
                {state.map((premadeFine) => (
                    <PremadeFineCard premadeFine={premadeFine} key={premadeFine.id} />
                ))}

                <Button appearance="primary" onClick={submitFine}>
                    Submit fines
                </Button>
            </Wrapper>

            <div className="fixed left-0 right-0 bottom-[80px] mx-5">
                <NextPrev prevStep={() => prevStep(2)} />
            </div>
        </>
    )
}

export default SubmitForm

import Wrapper from '@components/common/Wrapper'
import Button from '@components/elements/Button'
import Input from '@components/elements/Input'
import Textarea from '@components/elements/Textarea'
import { newFine } from 'types/Fine'
import { Goal } from 'types/Goal'
import { PremadeFine } from 'types/PremadeFine'
import React, { useState } from 'react'
import CurrencyInput from 'react-currency-input-field'
import { NewWithdrawal } from 'types/Withdrawal'
import { useAuth } from '@lib/hooks/useAuth'

interface MoneyFormProps {
    submitForm: (
        event: React.SyntheticEvent,
        formState: PremadeFine | newFine | Goal | NewWithdrawal
    ) => Promise<void>
    submitButtonText?: string
    initialValue?: PremadeFine | Goal | null
}

const MoneyForm = ({ submitForm, submitButtonText, initialValue }: MoneyFormProps) => {
    const defaultFormState: newFine = {
        title: '',
        description: '',
        amount: 0,
    }

    const [formState, setFormState] = useState<PremadeFine | newFine | Goal>(
        initialValue || defaultFormState
    )

    const handleOnValueChange = (value: string | undefined): void => {
        let amount = value === undefined ? 0 : value
        setFormState({ ...formState, amount })
    }

    const { user } = useAuth()

    const disabled = user?.admin ? false : true

    return (
        <form onSubmit={(event) => submitForm(event, formState)}>
            <Wrapper className="gap-3">
                <div className="flex flex-col gap-1">
                    <label className="text-2xl text-lightGrey text-center" htmlFor="amount">
                        Amount
                    </label>

                    <CurrencyInput
                        id="amount"
                        prefix="DKK "
                        decimalSeparator="."
                        value={formState.amount}
                        onValueChange={handleOnValueChange}
                        className="outline-0 bg-transparent text-center text-white text-4xl font-semibold"
                        disabled={disabled}
                    />
                </div>

                <Input
                    name="title"
                    placeholder="Title"
                    label="Title"
                    type="text"
                    value={formState.title}
                    onChange={(event) => setFormState({ ...formState, title: event.target.value })}
                    required
                    disabled={disabled}
                />

                <Textarea
                    name="description"
                    placeholder="Description"
                    label="Description"
                    rows={5}
                    value={formState.description}
                    onChange={(event) =>
                        setFormState({ ...formState, description: event.target.value })
                    }
                    required
                    disabled={disabled}
                />

                {!disabled && <Button type="submit">{submitButtonText || 'Submit Fine'}</Button>}
            </Wrapper>
        </form>
    )
}

export default MoneyForm

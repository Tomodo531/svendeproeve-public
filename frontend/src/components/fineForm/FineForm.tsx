import fineReducer from '@lib/utils/reducers/fineReducer'
import React, { useReducer, useState } from 'react'
import { PremadeFine } from 'types/PremadeFine'
import { User } from 'types/User'
import CustomFineForm from './CustomFineForm'
import PremadeFineForm from './PremadeFineForm'
import RecipientForm from './RecipientForm'
import SubmitForm from './SubmitForm'

const FineForm = () => {
    const nextStep = (specificStep?: number) => {
        setStep(specificStep || step + 1)
    }
    
    const prevStep = (specificStep?: number) => {
        setStep(specificStep || step - 1)
    }

    const [step, setStep] = useState(1)
    const [recipient, setRecipient] = useState<User | null>(null)
    const [state, dispatch] = useReducer(fineReducer, [])
    const [customfine, setCustomfine] = useState<PremadeFine | null>(null)

    switch (step) {
        case 1:
            return <RecipientForm
                nextStep={nextStep}
                recipient={recipient}
                setRecipient={setRecipient}
            />
        case 2:
            return <PremadeFineForm 
                prevStep={prevStep}
                nextStep={nextStep}
                state={state}
                dispatch={dispatch}
                customfine={customfine}
            />
        case 3:
            return <CustomFineForm 
                prevStep={prevStep}
                nextStep={nextStep}
                customfine={customfine}
                setCustomfine={setCustomfine}
            />
        case 4:
            return <SubmitForm 
                prevStep={prevStep}
                recipient={recipient}
                state={state}
                customfine={customfine}
                setCustomfine={setCustomfine}
            />
        default:
            setStep(1)
            return null
    }
}

export default FineForm

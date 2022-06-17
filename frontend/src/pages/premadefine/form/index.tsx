import ValidationErrors from '@components/common/ValidationErrors';
import PageHeader from '@components/elements/PageHeader';
import MoneyForm from '@components/common/MoneyForm';
import parseAmount from 'lib/utils/helpers/parseAmount';
import { useError } from '@lib/hooks/useError';
import axios from '@lib/axios';
import { PremadeFine } from 'types/PremadeFine';
import React from 'react'
import { useRouter } from 'next/router';
import { AuthGuard } from '@components/common/AuthGuard';

function CreatePremadeFine() {
    const router = useRouter()
    const {errors, setResponse} = useError();

    const submitForm = async (event: React.SyntheticEvent, premadeFine: PremadeFine) => {
        event.preventDefault();

        axios.post(`api/premadefine/create`, {
            title: premadeFine.title,
            description: premadeFine.description,
            amount: parseAmount(premadeFine.amount)
        })
        .then(() => {
            router.push('/premadefine')
        })
        .catch(err => setResponse(err));
    }

    return (
        <AuthGuard admin={true}>
            <PageHeader
                headline="Premade Fine"
                subHeadline="Create premade fine"
            />

            <ValidationErrors className="mb-4" errors={errors} />

            <MoneyForm submitForm={submitForm} submitButtonText="Create premade fine"/>
        </AuthGuard>
    )
}

export default CreatePremadeFine

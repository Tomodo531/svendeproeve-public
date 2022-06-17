import { AuthGuard } from '@components/common/AuthGuard';
import MoneyForm from '@components/common/MoneyForm';
import ValidationErrors from '@components/common/ValidationErrors';
import PageHeader from '@components/elements/PageHeader';
import axios from '@lib/axios';
import { useError } from '@lib/hooks/useError';
import parseAmount from '@lib/utils/helpers/parseAmount';
import { useRouter } from 'next/router';
import React from 'react'
import { NewWithdrawal } from 'types/Withdrawal';

function WithdrawalForm() {
    const router = useRouter()
    const {errors, setResponse} = useError();

    const submitForm = async (event: React.SyntheticEvent, Withdrawal: NewWithdrawal) => {
        event.preventDefault();

        axios.post(`api/balance/withdraw`, {
            title: Withdrawal.title,
            description: Withdrawal.description,
            amount: parseAmount(Withdrawal.amount)
        })
        .then(() => {
            router.push('/withdrawal')
        })
        .catch(err => setResponse(err));
    }

    return (
        <AuthGuard admin={true}>
            <PageHeader
                headline="Withdrawal"
                subHeadline="Create Withdrawal"
            />

            <ValidationErrors className="mb-4" errors={errors} />

            <MoneyForm submitForm={submitForm} submitButtonText="Create Withdrawal"/>
        </AuthGuard>
    )
}

export default WithdrawalForm
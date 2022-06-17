import ValidationErrors from '@components/common/ValidationErrors'
import PageHeader from '@components/elements/PageHeader'
import MoneyForm from '@components/common/MoneyForm'
import parseAmount from '@lib/utils/helpers/parseAmount'
import { useError } from '@lib/hooks/useError'
import axios from '@lib/axios'
import { PremadeFine } from 'types/PremadeFine'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Goal } from 'types/Goal'
import { AxiosResponse } from 'axios'
import { mutate } from 'swr'

const UpdatePremadeFine = () => {
    const router = useRouter()
    const [goal, setGoal] = useState<Goal>()
    const {errors, setResponse} = useError();

    useEffect(() => {
        axios.get(`/api/goal`)
            .then((res: AxiosResponse) => {
                setGoal(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])


    const submitForm = async (event: React.SyntheticEvent, fine: PremadeFine) => {
        event.preventDefault();

        axios.put(`api/goal/update`, {
            title: fine.title,
            description: fine.description,
            amount: parseAmount(fine.amount)
        })
        .then(() => {
            mutate('/api/goal')
            router.push('/dashboard')
        })
        .catch(err => setResponse(err));
    }

    if(!goal) return <div>Loading...</div>

    return (
        <>
            <PageHeader
                headline="Goal"
                subHeadline="Update Goal"
            />

            <ValidationErrors className="mb-4" errors={errors} />

            <MoneyForm submitForm={submitForm} submitButtonText="Update Goal" initialValue={goal}/>
        </>
    )
}

export default UpdatePremadeFine

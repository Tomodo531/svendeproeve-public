import ValidationErrors from '@components/common/ValidationErrors'
import PageHeader from '@components/elements/PageHeader'
import MoneyForm from '@components/common/MoneyForm'
import parseAmount from '@lib/utils/helpers/parseAmount'
import { useError } from '@lib/hooks/useError'
import axios from '@lib/axios'
import { PremadeFine } from 'types/PremadeFine'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { AxiosError, AxiosResponse } from 'axios'
import Button from '@components/elements/Button'
import AdminWrapper from '@components/common/AdminWrapper'
import { AuthGuard } from '@components/common/AuthGuard'

const UpdatePremadeFine = () => {
    const router = useRouter()
    const { id } = router.query

    const [premadeFine, setPremadeFine] = useState<PremadeFine>()
    const {errors, setResponse} = useError();

    useEffect(() => {
        if(!id) return;

        axios.get(`/api/premadefine/${id}`)
            .then((res: AxiosResponse) => {
                setPremadeFine(res.data)
            })
            .catch((err: AxiosError) => {
                if(err.response?.status === 404) return router.push('/404')
            })
    }, [id])


    const submitForm = async (event: React.SyntheticEvent, fine: PremadeFine) => {
        event.preventDefault();

        axios.put(`api/premadefine/update/${id}`, {
            title: fine.title,
            description: fine.description,
            amount: parseAmount(fine.amount)
        })
        .then(() => {
            router.push('/premadefine')
        })
        .catch(err => setResponse(err));
    }

    const deleteFine = () => {
        if (confirm('Are you sure you want to delete this premade fine?')) {
            axios
                .delete(`api/premadefine/delete/${id}`)
                .then(() => {
                    router.push('/premadefine')
                })
                .catch((err) => console.log(err))
        }
    }

    if(!premadeFine) return <div>Loading...</div>

    return (
        <AuthGuard admin={true}>
            <PageHeader
                headline="Premade Fine"
                subHeadline="Update premade fine"
            />

            <ValidationErrors className="mb-4" errors={errors} />

            <MoneyForm submitForm={submitForm} submitButtonText="Update premade fine" initialValue={premadeFine}/>

            <AdminWrapper>
                <Button
                    appearance="alert"
                    onClick={() => deleteFine()}
                >
                    Delete premde fine
                </Button>
            </AdminWrapper>
        </AuthGuard>
    )
}

export default UpdatePremadeFine

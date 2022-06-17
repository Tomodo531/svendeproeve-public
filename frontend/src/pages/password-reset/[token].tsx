import Button from '@components/elements/Button'
import Input from '@components/elements/Input'
import { useAuth } from '@lib/hooks/useAuth'
import React, {ReactElement, useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import Wrapper from "@components/common/Wrapper";
import SuccessStatus from "@components/common/SuccessStatus";
import ValidationErrors from "@components/common/ValidationErrors";
import VerifyEmail from "@pages/verify-email";

const PasswordReset = () => {
    const router = useRouter()

    const { resetPassword } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard'
    })

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    const submitForm = (event: React.SyntheticEvent) => {
        event.preventDefault()

        resetPassword({
            email,
            password,
            password_confirmation,
            setErrors,
            setStatus,
        })
    }

    useEffect(() => {
        // @ts-ignore
        setEmail(router.query.email || '')
    }, [router.query.email])

    return (
        <form onSubmit={submitForm} className="px-5 py-10">

            {/* Session Status */}
            <SuccessStatus className="mb-4" status={status} />

            {/* Validation Errors */}
            <ValidationErrors className="mb-4" errors={errors} />

            <Wrapper>
                <Input
                    name="email"
                    type="text"
                    placeholder="Email"
                    label="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

                <Input
                    name="password"
                    type="password"
                    placeholder="Password"
                    label="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />

                <Input
                    name="password_confirmation"
                    type="password"
                    placeholder="Password Confirmation"
                    label="Password Confirmation"
                    value={password_confirmation}
                    onChange={e => setPasswordConfirmation(e.target.value)}
                />
            </Wrapper>

            <div className="mt-auto">
                <Button>Reset Password</Button>
            </div>
        </form>
    )
}

PasswordReset.getLayout = function getLayout(page: ReactElement) {
    return page
}

export default PasswordReset

import Wrapper from '@components/common/Wrapper'
import Button from '@components/elements/Button'
import Input from '@components/elements/Input'
import { useAuth } from '@lib/hooks/useAuth'
import React, {ReactElement, useState} from 'react'
import Link from "next/link";
import SuccessStatus from "@components/common/SuccessStatus";
import ValidationErrors from "@components/common/ValidationErrors";

const ForgotPassword = () => {
    const { forgotPassword } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard'
    })

    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    const submitForm = (event: React.SyntheticEvent) => {
        event.preventDefault()

        forgotPassword({ email, setErrors, setStatus })
    }

    return (
        <form className="flex flex-col h-screen px-5 py-10" onSubmit={submitForm}>
            <div className="mb-7 text-xl text-white">
                <h1 className="mb-3 text-2xl text-semibold text-white">Forgot your password?</h1>
                <p className="text-xl text-lightGrey">No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.</p>
            </div>

            {/* Session Status */}
            <SuccessStatus className="mb-4" status={status} />

            {/* Validation Errors */}
            <ValidationErrors className="mb-4" errors={errors} />

            <Wrapper>
                <Input
                    name="email"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
            </Wrapper>

            <Button
                type="submit"
            >
                Email Password Reset Link
            </Button>

            <p className="text-center text-white my-3">
                Go back to
                <Link href="/register">
                    <a className="text-turquoise"> Sign up </a>
                </Link>
                 or
                <Link href="/login">
                    <a className="text-turquoise"> sign in</a>
                </Link>
            </p>
        </form>
    )
}

ForgotPassword.getLayout = function getLayout(page: ReactElement) {
    return page
}

export default ForgotPassword

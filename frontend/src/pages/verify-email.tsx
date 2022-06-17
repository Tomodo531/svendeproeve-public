import Button from '@components/elements/Button'
import Link from 'next/link'
import { useAuth } from '@lib/hooks/useAuth'
import React, {ReactElement, useState} from 'react'
import Wrapper from "@components/common/Wrapper";
import Register from "@pages/register";

const VerifyEmail = () => {
    const { logout, resendEmailVerification } = useAuth({
        middleware: 'auth',
        redirectIfAuthenticated: null
    })

    const [status, setStatus] = useState(null)

    return (
        <div className="flex flex-col h-screen px-5 py-10">
            <h1 className="mb-2 text-3xl text-white">Thanks for signing up!</h1>
            <p className="text-lightGrey mb-4">
                Before getting started, could you
                verify your email address by clicking on the link we just
                emailed to you? If you didnt receive the email, we will
                gladly send you another.
            </p>

            {status === 'verification-link-sent' && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    A new verification link has been sent to the email
                    address you provided during registration.
                </div>
            )}

            <Wrapper>
                <Button
                    onClick={() => resendEmailVerification({ setStatus })}>
                    Resend Verification Email
                </Button>

                <Button
                    onClick={logout}
                >
                    Logout
                </Button>
            </Wrapper>
        </div>
    )
}

VerifyEmail.getLayout = function getLayout(page: ReactElement) {
    return page
}

export default VerifyEmail

import { NextPage } from 'next'
import Input from '@components/elements/Input'
import Wrapper from '@components/common/Wrapper'
import Button from '@components/elements/Button'
import { useAuth } from '@lib/hooks/useAuth'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { ReactElement, useEffect, useState } from 'react'
import SuccessStatus from '@components/common/SuccessStatus'
import ValidationErrors from '@components/common/ValidationErrors'
import Github from '@public/github.svg'

const Login = () => {
    const router = useRouter()

    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [remember, setRemember] = useState(false)
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    useEffect(() => {
        // @ts-ignore
        if (router.query.reset?.length > 0 && errors.length === 0) {
            // @ts-ignore
            setStatus(atob(router.query.reset))
        } else {
            setStatus(null)
        }
    })

    const submitForm = async (event: React.SyntheticEvent) => {
        event.preventDefault()

        login({ email, password, remember, setErrors, setStatus })
    }

    return (
        <form className="flex flex-col h-screen px-5 py-10" method="post" onSubmit={submitForm}>
            <div className="mb-10">
                <h1 className="mb-1 text-2xl text-white font-semibold">Let’s get you signed in</h1>
                <p className="text-2xl text-white font-light leading-relaxed">
                    Welcome back. <br /> You’ve been missed!
                </p>
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
                    onChange={(event) => setEmail(event.target.value)}
                    required
                />

                <Input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={(event) => setPassword(event.target.value)}
                    required
                />

                <div className="block mt-4">
                    <label htmlFor="remember_me" className="inline-flex items-center">
                        <input
                            id="remember_me"
                            type="checkbox"
                            name="remember"
                            checked={remember}
                            onChange={() => setRemember(!remember)}
                        />

                        <span className="ml-2 text-turquoise">Remember me</span>
                    </label>
                </div>

                <Link href="/forgot-password">
                    <a className="text-turquoise">Forgot your password?</a>
                </Link>
            </Wrapper>

            <div className="flex flex-col gap-3 mt-auto">
                <p className="text-center text-white">
                    Don‘t have an account?
                    <Link href="/register">
                        <a className="text-turquoise"> Sign up</a>
                    </Link>
                </p>
                <Button type="submit">Sign In</Button>

                <Link href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/github/redirect`} passHref>
                    <Button
                        appearance="social"
                    >
                        Sign in with GitHub
                        <Image
                            src={Github}
                            width="25"
                            height="25"
                            alt=""
                        />
                    </Button>
                </Link>
            </div>
        </form>
    )
}

Login.getLayout = function getLayout(page: ReactElement) {
    return page
}

export default Login

import React, {ReactElement, useState} from 'react'
import Button from '@components/elements/Button'
import Input from '@components/elements/Input'
import Wrapper from '@components/common/Wrapper'
import Link from 'next/link'
import Image from 'next/image'
import {useAuth} from "@lib/hooks/useAuth";
import ValidationErrors from "@components/common/ValidationErrors";
import Github from '@public/github.svg'

const Register = () => {
    const { register } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState([])

    const submitForm = (event: React.SyntheticEvent) => {
        event.preventDefault()

        register({ name, email, password, password_confirmation, setErrors })
    }

    return (
        <form className="flex flex-col h-screen px-5 py-10" onSubmit={submitForm}>
            <div className="mb-10">
                <h1 className="mb-1 text-2xl text-white font-semibold">Let’s get you signed up</h1>
                <p className="text-2xl text-white font-light leading-relaxed">Welcome. <br/> Nice to meet you!</p>
            </div>

            {/* Validation Errors */}
            <ValidationErrors className="mb-4" errors={errors} />

            <Wrapper>
                <Input
                    name="name"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                />

                <Input
                    name="email"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />

                <Input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />

                <Input
                    name="password_confirmation"
                    type="password"
                    placeholder="Password Confirmation"
                    value={password_confirmation}
                    onChange={e => setPasswordConfirmation(e.target.value)}
                    required
                />
            </Wrapper>

            <div className="flex flex-col gap-3 mt-auto">
                <p className="text-center text-white">
                    Already registered?
                    <Link href="/login">
                        <a className="text-turquoise"> Sign in</a>
                    </Link>
                </p>
                <Button
                    type="submit"
                >
                    Sign Up
                </Button>

                <Link href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/github/redirect`} passHref>
                    <Button
                        appearance="social"
                    >
                        Sign up with GitHub
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

Register.getLayout = function getLayout(page: ReactElement) {
    return page
}

export default Register

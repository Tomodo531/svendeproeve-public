import Button from '@components/elements/Button'
import Link from 'next/link'
import Image from 'next/image'
import AuthDrawing from '@public/auth-drawing.svg'
import {useAuth} from "@lib/hooks/useAuth";
import { ReactElement } from 'react';

const Home = () => {
    useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })

    return (
        <div className="flex flex-col h-screen px-5 py-10">
            <div className="m-auto">
                <Image
                    src={AuthDrawing}
                    alt=""
                />

                <h1 className="mb-2 mt-5 self-center text-3xl text-white">Get started managing your temmates funds</h1>
            </div>

            <div className="mt-auto">
                <p className="text-center text-white mb-3">
                    Already registered?
                    <Link href="/login">
                        <a className="text-turquoise"> Sign in</a>
                    </Link>
                </p>

                <Link href="/register" passHref>
                    <Button>
                        Sign Up
                    </Button>
                </Link>
            </div>
        </div>
    )
}

Home.getLayout = function getLayout(page: ReactElement) {
    return page
}

export default Home

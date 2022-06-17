import RoundButton from '@components/elements/RoundButton'
import Link from 'next/link'
import { useAuth } from '@lib/hooks/useAuth'
import { CogIcon, PlusIcon, UserIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'

interface props {
    variant: 'dashboard' | 'profile' | 'settings'
}

export const Header = ({ variant }: props) => {
    const router = useRouter()
    const { user } = useAuth()
    const { id } = router.query

    return (
        <div>
            {variant === 'dashboard' && (
                <div className="w-full flex justify-between mt-2 -mb-6">
                    <Link href={`/user/${user?.id}`}>
                        <RoundButton className="h-12 w-12">
                            <UserIcon className="h-[24px] w-[24px] stroke-1" />
                        </RoundButton>
                    </Link>

                    {user?.admin && (
                        <Link href={`/fine/create`}>
                            <RoundButton className="h-12 w-12">
                                <PlusIcon className="h-[24px] w-[24px] stroke-1" />
                            </RoundButton>
                        </Link>
                    )}
                </div>
            )}

            {variant === 'profile' && user?.id == id && (
                <Link href="/user/settings" passHref>
                    <a className="absolute top-5 right-5">
                        <RoundButton>
                            <CogIcon className="h-[24px] w-[24px] stroke-1" />
                        </RoundButton>
                    </a>
                </Link>
            )}

            {variant === 'settings' && (
                <Link href={`/user/${user?.id}`}>
                    <a className="absolute top-5 left-5">
                        <RoundButton className="h-12 w-12">
                            <UserIcon className="h-[24px] w-[24px] stroke-1" />
                        </RoundButton>
                    </a>
                </Link>
            )}
        </div>
    )
}

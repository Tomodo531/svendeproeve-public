import { AuthGuard } from '@components/common/AuthGuard'
import Wrapper from '@components/common/Wrapper'
import { ProfileHeader } from '@components/profile/ProfileHeader'
import { Header } from '@components/common/Header'
import { TopFine } from '@components/profile/TopFine'
import axios from '@lib/axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAuth } from '@lib/hooks/useAuth'
import { PremadeFine } from 'types/PremadeFine'

const Profile = () => {
    const {user} = useAuth()
    const router = useRouter()
    const id = router.query.id
    const [profile, setProfile] = useState<any>(null)
    const topThreeFinesAppearances: Array<'gold' | 'silver' | 'bronze'> = [
        'gold',
        'silver',
        'bronze',
    ]

    useEffect(() => {
        axios
            .get(`/api/user/profile/${id}`)
            .then((res) => setProfile(res.data))
            .catch((err) => {
                if (err.response.status === 404 && id) router.push('/404')
            })
    }, [id])

    if (!profile) return <p>loading...</p>

    return (
        <div className="-m-5">
            <Header variant={'profile'}/>
            <ProfileHeader user={profile.user} />

            <div className="p-4">
                <Wrapper className="text-center my-4">
                    <h3 className="text-2xl text-lightGrey">Grand total</h3>
                    <h1 className="text-4xl text-white font-semibold">{profile.total} kr</h1>
                    <p className="text-lightGrey text-xl">Top fines</p>
                </Wrapper>

                <Wrapper className="gap-4">
                    {profile.topThreeFines.map((fine: PremadeFine, index: number) => (
                        <TopFine
                            appearance={topThreeFinesAppearances[index]}
                            title={fine.title}
                            amount={fine.amount}
                            key={topThreeFinesAppearances[index]}
                        />
                    ))}
                </Wrapper>
            </div>
        </div>
    )
}

export default Profile

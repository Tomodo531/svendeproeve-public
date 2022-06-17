import { CircularProgressbarWithChildren } from 'react-circular-progressbar'
import RoundButton from '@components/elements/RoundButton'
import { useAuth } from '@lib/hooks/useAuth'
import { useRouter } from 'next/router'
import { useGlobalContext } from 'context/GlobalContext'
import Link from 'next/link'

export const CircularProgress = () => {
    const { user } = useAuth()
    const router = useRouter()
    const { goal, balance, title, progress } = useGlobalContext()

    return (
        <div className={'relative text-offWhite'}>
            <CircularProgressbarWithChildren
                className="rounded-full"
                value={progress}
                circleRatio={1}
                styles={{
                    trail: {
                        strokeLinecap: 'butt',
                        transformOrigin: 'center',
                        stroke: '#4b4b4b',
                    },
                }}
            >
                <div className={'w-full h-full flex items-center justify-center pt-4 overflow-hidden'}>
                    <div className={'flex flex-col items-center overflow-hidden'}>
                        <Link href="/goal" passHref>
                            <h3 className={'mb-2 text-xl font-extralight'}>{title}</h3>
                        </Link>

                        <p className={'text-4xl font-bold'}>{`${balance} kr`}</p>
                        <div className={'flex items-center'}>
                            <div className={'w-12 h-[0.5px] mr-2 bg-offWhite'} />
                            <p className={'font-extralight text-lg'}>of</p>
                            <div className={'w-12 h-[0.5px] ml-2 bg-offWhite'} />
                        </div>
                        <p className={'text-xl font-bold'}>{`${goal} kr`}</p>

                        {user?.admin ? (
                            <RoundButton
                                onClick={() => router.push('/goal')}
                                className={'mt-4'}
                                appearance={'wide'}
                            >
                                Edit goal
                            </RoundButton>
                        ) : null}
                    </div>
                </div>
            </CircularProgressbarWithChildren>
        </div>
    )
}

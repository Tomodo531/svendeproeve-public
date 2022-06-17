import { User } from 'types/User'
import Image from 'next/image'
import { } from 'react'

export const ProfileHeader = ({ user } : { user: User }) => {
    return (
        <div className="bg-secondary bg-opacity-60 py-12 px-4">
            <div className="w-[130px] m-auto mb-2">
                <Image
                    width="130"
                    height="130"
                    objectFit="cover"
                    className="rounded-full m-auto"
                    src={
                        user?.avatar ||
                        `https://eu.ui-avatars.com/api/?name=${user.name}&background=27E0A6&color=fff&size=130`
                    }
                    alt={''}
                />
            </div>

            <div className=" text-white text-center">
                <p className="font-semibold text-2xl text-ellipsis overflow-hidden whitespace-nowrap">{user?.name}</p>
                {
                    user?.tag && <p className="text-lightGrey text-xl text-ellipsis overflow-hidden whitespace-nowrap">@{user.tag}</p>
                }
            </div>
        </div>
    )
}

import Image from 'next/image'
import { User } from 'types/User'
import { StarIcon } from '@heroicons/react/outline'

const UserCard = ({ user }: { user: User }) => {
    return (
        <div className="flex text-white items-center py-3 px-5 rounded-xl bg-secondary gap-3">
            <div className="flex-none w-[50px] h-[50px]">
                <Image
                    width="50"
                    height="50"
                    objectFit="cover"
                    src={
                        user?.avatar ||
                        `https://eu.ui-avatars.com/api/?name=${user.name}&background=27E0A6&color=fff&size=130`
                    }
                    className="rounded-full m-auto"
                    alt={''}
                />
            </div>

            <div className="flex flex-col overflow-hidden">
                <p className="font-semibold text-ellipsis overflow-hidden whitespace-nowrap">
                    {user.name}
                </p>
                {user.tag && (
                    <p className="text-ellipsis overflow-hidden whitespace-nowrap text-lightGrey">
                        @{user.tag}
                    </p>
                )}
            </div>

            {user.admin ? (
                <StarIcon className="flex flex-none ml-auto w-[40px] h-[40px] stroke-1 text-primary"/>
            ) : null}
        </div>
    )
}

export default UserCard
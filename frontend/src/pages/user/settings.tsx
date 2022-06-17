import { ChangePasswordForm } from '@components/user/ChangePasswordForm';
import { UpdateUserInformationFrom } from '@components/user/UpdateUserInformationFrom';
import { useAuth } from "@lib/hooks/useAuth";
import Image from 'next/image';
import React from "react";
import { Header } from '@components/common/Header'
import Button from '@components/elements/Button';

const UserSeetings = () => {
    const { user, logout } = useAuth()

    if(!user) return <p>Loading...</p>

    return(
        <>
            <Header variant={'settings'}/>
            <div className="text-white">
                <div className="w-[130px] m-auto mt-2 mb-6">
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

                <UpdateUserInformationFrom user={user}/>

                <hr className="my-8 text-secondary"/>

                <ChangePasswordForm/>
                
                <hr className="my-8 text-secondary"/>

                <Button
                    onClick={logout}
                    appearance="alert"
                >
                    Log Out
                </Button>
            </div>
        </>
    )
}

export default UserSeetings

import React, { useState } from "react";
import Input from "@components/elements/Input";
import axios from "@lib/axios";
import Wrapper from "@components/common/Wrapper";
import Button from "@components/elements/Button";
import ValidationErrors from "@components/common/ValidationErrors";
import { useError } from "@lib/hooks/useError";
import SuccessStatus from "@components/common/SuccessStatus";

export const ChangePasswordForm = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newConfirmPassword, setNewConfirmPassword] = useState('');
    const {errors, setResponse, status, setStatus} = useError();

    const handlePasswordChange = async (event: React.SyntheticEvent) => {
        event.preventDefault();

        axios.patch('/api/changePassword', {
            currentPassword,
            newPassword,
            newConfirmPassword
        })
        .then((res: any) => {
            setStatus(res?.data?.status)
        })
        .catch(err => setResponse(err));
    };

    return (
        <form onSubmit={handlePasswordChange}>
            <Wrapper className="gap-5">
                <h3 className="font-semibold text-xl">Change password</h3>

                <SuccessStatus className="mb-4" status={status}/>

                <ValidationErrors className="mb-4" errors={errors} />

                <Input
                    name="currentPassword"
                    type="password"
                    placeholder="Current Password"
                    onChange={event => setCurrentPassword(event.target.value)}
                    required />

                <Input
                    name="newPassword"
                    type="password"
                    placeholder="New Password"
                    onChange={event => setNewPassword(event.target.value)}
                    required />

                <Input
                    name="newConfirmPassword"
                    type="password"
                    placeholder="New Confirm Password"
                    onChange={event => setNewConfirmPassword(event.target.value)}
                    required />

                <Button
                    type="submit"
                >
                    Change Password
                </Button>
            </Wrapper>
        </form>
    );
};

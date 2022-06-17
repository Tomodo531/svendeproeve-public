import React, { useEffect, useState } from "react";
import Input from "@components/elements/Input";
import axios from "@lib/axios";
import Wrapper from "@components/common/Wrapper";
import Button from "@components/elements/Button";
import ValidationErrors from "@components/common/ValidationErrors";
// @ts-ignore
import { User } from 'types/User';
import { useError } from "@lib/hooks/useError";
import SuccessStatus from "@components/common/SuccessStatus";
import { AxiosResponse } from "axios";

export const UpdateUserInformationFrom = ({ user }: { user: User; }) => {
    const [name, setName] = useState('');
    const [tag, setTag] = useState('');
    const {errors, setResponse, status, setStatus} = useError();

    const handleInformationUpdate = async (event: React.SyntheticEvent) => {
        event.preventDefault();

        axios.patch('/api/user/update', {
            name,
            tag
        })
        .then((res: AxiosResponse) => {
            setStatus(res.data.status)
        })
        .catch(err => setResponse(err));
    };

    useEffect(() => {
        setName(user?.name || '');
        setTag(user?.tag || '');
    }, [user]);

    return (
        <form onSubmit={handleInformationUpdate}>
            <Wrapper className="gap-5">
                <h3 className="font-semibold text-xl">Change name</h3>

                <SuccessStatus className="mb-4" status={status}/>

                <ValidationErrors className="mb-4" errors={errors} />

                <Input
                    name="name"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={event => setName(event.target.value)}
                    required />

                <Input
                    name="tag"
                    type="text"
                    placeholder="Tag"
                    value={tag}
                    onChange={event => setTag(event.target.value)} />

                <Button
                    type="submit"
                >
                    Submit Changes
                </Button>
            </Wrapper>
        </form>
    );
};

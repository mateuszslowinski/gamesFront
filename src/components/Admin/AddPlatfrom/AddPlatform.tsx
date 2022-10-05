import {useState} from "react";
import {api} from "../../../utils/axios";
import {getToken} from "../../../hooks/getToken";
import {AddPlatformMain} from "./AddPlatformMain";
import {AddPlatformFormType} from "../../../types/addd-forms.types";

interface Props {
    closeModal: (value: number) => void
}

export const AddPlatform = ({closeModal}: Props) => {
    const [open, setOpen] = useState<boolean>(false);
    const [error, setError] = useState('');
    const token = getToken();

    const onSubmit = async (data: AddPlatformFormType) => {
        try {
            const response = await api.post('/platform', data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            if (response.status === 201) {
                setOpen(true);
            } else {
                setError(response.data.error);
            }
        } catch (e) {
            setError((e as Error).message);
        }
    }

    return (
        <AddPlatformMain
            closeModal={closeModal}
            onSubmit={onSubmit}
            closeConfirmMessage={() => setOpen(false)}
            openConfirmMessage={open}
            error={error}
        />
    )
}
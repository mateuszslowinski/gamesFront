import {useState} from "react";
import {api} from "../../../../utils/axios";
import {getToken} from "../../../../hooks/getToken";
import {AddPublisherMain} from "./AddPublisherMain";
import {AddPublisherFormType} from "../../../../types/add-forms.types";

interface Props {
    closeModal: (value: number) => void
}

export const AddPublisher = ({closeModal}: Props) => {
    const [open, setOpen] = useState<boolean>(false);
    const [error, setError] = useState('');
    const token = getToken();

    const onSubmit = async (data:AddPublisherFormType) => {
        try {
            const response = await api.post('/publisher', data, {
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
            <AddPublisherMain
                closeModal={closeModal}
                onSubmit={onSubmit}
                closeConfirmMessage={() => setOpen(false)}
                openConfirmMessage={open}
                error={error}
            />
    )
}
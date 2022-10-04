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
    const [form, setForm] = useState<AddPlatformFormType>({
        name: '',
        description: ""
    });

    const updateForm = (key: string, value: string) => {
        setForm(form => ({
            ...form,
            [key]: value,
        }));
    };

    const onSubmit = async () => {
        try {
            const response = await api.post('/platform', form, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            if (response.status === 201) {
                setForm({name: '', description: ''});
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
            form={form}
            onChange={updateForm}
            onSubmit={onSubmit}
            closeConfirmMessage={() => setOpen(false)}
            openConfirmMessage={open}
            error={error}/>
    )
}
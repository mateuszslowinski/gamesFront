import {SyntheticEvent, useState} from "react";
import {api} from "../../../utils/axios";
import {getToken} from "../../../hooks/getToken";
import {AddForm} from "../AddForm";
import {Button} from '../../commons/Button/Button';
import {InputField} from "../../commons/InputField/InputField";
import {ErrorMessage} from "../../commons/ErrorMessage/ErrorMessage";
import {TextAreaField} from "../../commons/TextArea/TextAreaField";
import {AddPublisherFormType} from "../../../types/addd-forms.types";
import {ConfirmMessage} from "../../commons/ConfirmMessage/ConfirmMessage";

interface Props {
    closeModal: (value: number) => void
}

export const AddPublisher = ({closeModal}: Props) => {
    const [open, setOpen] = useState<boolean>(false);
    const [error, setError] = useState('');
    const token = getToken();
    const [form, setForm] = useState<AddPublisherFormType>({
        name: '',
        description: ""
    });

    const updateForm = (key: string, value: string) => {
        setForm(form => ({
            ...form,
            [key]: value,
        }));
    };

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
            const response = await api.post('/publisher', form, {
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

    if (error) return <ErrorMessage text={error}/>
    return (
        <>
            {open && <ConfirmMessage text='Wydawca został dodany!' onClick={()=>setOpen(false)}/>}
            <AddForm
                closeModal={closeModal}
                onSubmit={handleSubmit}
                formSubtitle='Dodaj nowego wydawce:'
            >

                <InputField
                    name='name'
                    type='text'
                    placeholder='Nazwa wydawcy...'
                    value={form.name}
                    onChange={(e) => updateForm('name', e.target.value)}
                />
                <TextAreaField
                    name='description'
                    value={form.description}
                    onChange={(e) => updateForm('description', e.target.value)}
                    placeholder='Opis wydawcy...'
                />
                <Button text='Dodaj'/>
            </AddForm>
        </>
    )
}
import {useState} from "react";
import {api} from "../../../utils/axios";
import {useForm} from "react-hook-form";
import {getToken} from "../../../hooks/getToken";
import {AddForm} from "../AddForm";
import {Button} from '../../commons/Button/Button';
import {InputField} from "../../commons/InputField/InputField";
import {ErrorMessage} from "../../commons/Messages/ErrorMessage/ErrorMessage";
import {TextAreaField} from "../../commons/TextArea/TextAreaField";
import {ConfirmMessage} from "../../commons/Messages/ConfirmMessage/ConfirmMessage";
import {AddPublisherFormType} from "../../../types/addd-forms.types";

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

    const {
        handleSubmit,
        register,
        formState: {
            errors: {name, description},
        },
    } = useForm<AddPublisherFormType>();

    const updateForm = (key: string, value: string) => {
        setForm(form => ({
            ...form,
            [key]: value,
        }));
    };

    const onSubmit = async () => {
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
                onSubmit={handleSubmit(onSubmit)}
                closeModal={closeModal}
                formSubtitle='Dodaj nowego wydawce:'
            >
                <InputField
                    type='text'
                    placeholder='Nazwa wydawcy...'
                    error={name}
                    validation={register('name', {
                        required: 'Nazwa wydawcy jest wymagana',
                        maxLength: {
                            value: 50,
                            message: 'Nazwa nie może przekraczać 50 znaków',
                        },
                    })}
                    value={form.name}
                    onChange={(e) => updateForm('name', e.target.value)}
                />
                <TextAreaField
                    value={form.description}
                    error={description}
                    validation={register('description', {
                        required: 'Opis wydawcy jest wymagany',
                        maxLength: {
                            value: 1500,
                            message: 'Opis wydawcy nie może przekraczać 1500 znaków',
                        },
                    })}
                    onChange={(e) => updateForm('description', e.target.value)}
                    placeholder='Opis wydawcy...'
                />
                <Button text='Dodaj'/>
            </AddForm>
        </>
    )
}
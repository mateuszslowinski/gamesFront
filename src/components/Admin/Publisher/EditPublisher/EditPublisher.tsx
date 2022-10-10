import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {api} from "../../../../utils/axios";
import {Form} from "../../Form";
import {InputField} from "../../../commons/FormFields/InputField/InputField";
import {TextAreaField} from "../../../commons/FormFields/TextArea/TextAreaField";
import {EditPublisherFormType} from "../../../../types/edit-forms.types";
import {PublisherType} from 'types';

interface Props {
    closeModal: (value: number) => void
    publisher: PublisherType
    token: string | null
}

export const EditPublisher = ({closeModal, publisher, token}: Props) => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const {
        handleSubmit,
        register,
        formState: {
            errors: {name, description},
        },
    } = useForm<EditPublisherFormType>();


    const onSubmit = async (data: EditPublisherFormType) => {
        try {
            const response = await api.patch(`/publisher/${publisher.id}`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                navigate(0)
            } else {
                setError(response.data.error);
            }

        } catch (e) {
            setError((e as Error).message);
        }
    }

    return (
        <Form
            onSubmit={handleSubmit(onSubmit)}
            closeModal={closeModal}
            formSubtitle='Edytuj nowego wydawce:'
            error={error}
            buttonTxt='Edytuj'
        >
            <InputField
                type='text'
                placeholder='Nazwa wydawcy...'
                error={name}
                validation={register('name', {
                    required: 'Nazwa wydawcy jest wymagana',
                    value: publisher.name,
                    maxLength: {
                        value: 50,
                        message: 'Nazwa nie może przekraczać 50 znaków',
                    },
                })}
                text='Nazwa wydawcy'
            />
            <TextAreaField
                error={description}
                validation={register('description', {
                    required: 'Opis wydawcy jest wymagany',
                    value: publisher.description,
                    maxLength: {
                        value: 1500,
                        message: 'Opis wydawcy nie może przekraczać 1500 znaków',
                    },
                })}
                placeholder='Opis wydawcy...'
            />
        </Form>

    )
}
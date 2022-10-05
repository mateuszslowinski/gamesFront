import {useState} from "react";
import {useForm} from "react-hook-form";
import {api} from "../../../utils/axios";
import {getToken} from "../../../hooks/getToken";
import {useApi} from "../../../hooks/useApi";
import {AddForm} from "../AddForm";
import {InputField} from "../../commons/FormFields/InputField/InputField";
import {ErrorMessage} from "../../commons/Messages/ErrorMessage/ErrorMessage";
import {Spinner} from "../../commons/Spinner/Spinner";
import {TextAreaField} from "../../commons/FormFields/TextArea/TextAreaField";
import {NumberInput} from "../../commons/FormFields/NumberInput/NumberInput";
import {SelectField} from "../../commons/FormFields/SelectField/SelectField";
import {AddStudioFormType} from "../../../types/addd-forms.types";
import {PublisherType} from 'types';

interface Props {
    closeModal: (value: number) => void
}

export const AddStudio = ({closeModal}: Props) => {
    const [open, setOpen] = useState<boolean>(false);
    const [error, setError] = useState('');
    const token = getToken();
    const [publishers, loading, getPublisherError] = useApi<PublisherType[]>({
        method: 'get',
        url: '/publisher'
    });

    const {
        handleSubmit,
        register,
        reset,
        formState: {
            errors: {name, description, ownerId, country, founded, employees, image},
        },
    } = useForm<AddStudioFormType>({
        defaultValues: {
            name: '',
            country: "",
            employees: 0,
            founded: "",
            description: "",
            image: null,
            ownerId: "",
        }
    });

    const onSubmit = async (data: AddStudioFormType) => {
        try {
            if (data.image) {
                const newData = {
                    ...data,
                    image: data.image[0]
                }
                const response = await api.post('/studio', newData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });
                if (response.status === 201) {
                    reset();
                    setOpen(true);
                } else {
                    setError(response.data.error);
                }
            }
        } catch (e) {
            setError((e as Error).message);
        }
    }

    if (getPublisherError) return <ErrorMessage text={getPublisherError}/>
    return (
        <>
            {(loading || !publishers) ? <Spinner/> : (
                <AddForm
                    closeModal={closeModal}
                    onSubmit={handleSubmit(onSubmit)}
                    formSubtitle='Dodaj nowe studio'
                    closeConfirmMessage={() => setOpen(false)}
                    openConfirmMessage={open}
                    confirmMessageTxt='Studio zostało dodane!'
                    error={error}
                >
                    <InputField
                        type='text'
                        placeholder='Nazwa studia...'
                        error={name}
                        validation={register('name', {
                            required: 'Nazwa studia jest wymagana',
                            maxLength: {
                                value: 50,
                                message: 'Nazwa studia nie może przekraczać 50 znaków',
                            },
                        })}

                    />
                    <InputField
                        type='text'
                        placeholder='Kraj pochodzenia...'
                        error={country}
                        validation={register('country', {
                            required: 'Kraj pochodzenia jest wymagany',
                            maxLength: {
                                value: 50,
                                message: 'Nazwa studia nie może przekraczać 50 znaków',
                            },
                        })}

                    />
                    <NumberInput
                        text='Liczba pracowników:'
                        error={employees}
                        validation={register('employees', {
                            valueAsNumber: true,
                            maxLength: {
                                value: 11,
                                message: 'Liczba pracowników nie może przekraczać 11 znaków',
                            },
                        })}

                        min={0}
                        max={9999999}
                    />
                    <InputField
                        type='text'
                        placeholder='Założono w...'
                        error={founded}
                        validation={register('founded', {
                            required: 'Rok założenia jest wymagany',
                        })}

                    />

                    <SelectField
                        validation={register('ownerId')}
                        options={publishers}
                        error={ownerId}
                    />
                    <InputField
                        type='file'
                        error={image}
                        validation={register('image', {
                            onChange: (e) => e.target.files[0]
                        })}

                    />
                    <TextAreaField
                        error={description}
                        validation={register('description', {
                            required: 'Opis wydawcy jest wymagany',
                            maxLength: {
                                value: 1500,
                                message: 'Opis wydawcy nie może przekraczać 1500 znaków',
                            },
                        })}
                        placeholder='Opis wydawcy...'
                    />
                </AddForm>
            )}
        </>
    )
}

import {useState} from "react";
import {useForm} from "react-hook-form";
import {api} from "../../../utils/axios";
import {AddForm} from "../AddForm";
import {getToken} from "../../../hooks/getToken";
import {useApi} from "../../../hooks/useApi";
import {InputField} from "../../commons/FormFields/InputField/InputField";
import {SelectField} from "../../commons/FormFields/SelectField/SelectField";
import {Spinner} from "../../commons/Spinner/Spinner";
import {TextAreaField} from "../../commons/FormFields/TextArea/TextAreaField";
import {ErrorMessage} from "../../commons/Messages/ErrorMessage/ErrorMessage";
import {StudioType} from 'types';
import {AddGameFormType} from "../../../types/addd-forms.types";

interface Props {
    closeModal: (value: number) => void
}

export const AddGame = ({closeModal}: Props) => {
    const [open, setOpen] = useState<boolean>(false);
    const [error, setError] = useState('');
    const token = getToken()
    const [studios, loading, getStudioError] = useApi<StudioType[]>({
        method: 'get',
        url: '/studio'
    });
    const {
        handleSubmit,
        register,
        reset,
        formState: {
            errors: {name, developerId, releaseDate, description, image},
        },
    } = useForm<AddGameFormType>({
        defaultValues: {
            name: '',
            developerId: '',
            releaseDate: null,
            description: "",
            image: null,
        }
    });

    const onSubmit = async (data: AddGameFormType) => {
        try {
            if (data.image) {
                const newData = {
                    ...data,
                    image: data.image[0]
                }
                const response = await api.post('/game', newData, {
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
    if (getStudioError) return <ErrorMessage text={getStudioError}/>
    return (
        <>
            {(loading || !studios) ? <Spinner/> : (
                <AddForm
                    closeModal={closeModal}
                    onSubmit={handleSubmit(onSubmit)}
                    formSubtitle='Dodaj nową grę'
                    confirmMessageTxt='Gra została dodana'
                    closeConfirmMessage={() => setOpen(false)}
                    error={error}
                    openConfirmMessage={open}
                >
                    <InputField
                        type='text'
                        placeholder='Nazwa gry...'
                        error={name}
                        validation={register('name', {
                            required: 'Nazwa gry jest wymagana',
                            maxLength: {
                                value: 100,
                                message: 'Nazwa gry nie może przekraczać 100 znaków',
                            },
                        })}
                    />
                    <InputField
                        type='date'
                        error={releaseDate}
                        validation={register('releaseDate', {
                            valueAsDate: true,
                            required: 'Data wydania jest wymagana',
                        })}
                    />
                    <SelectField
                        validation={register('developerId')}
                        options={studios}
                        error={developerId}
                        text='Wybierz dewelopera:'
                    />
                    <InputField
                        type='file'
                        error={image}
                        validation={register('image')}
                    />
                    <TextAreaField
                        error={description}
                        validation={register('description', {
                            required: 'Opis gry jest wymagany',
                            maxLength: {
                                value: 1000,
                                message: 'Opis gry nie może przekraczać 1000 znaków',
                            },
                        })}
                        placeholder='Opis gry...'
                    />
                </AddForm>
            )}
        </>
    )
}
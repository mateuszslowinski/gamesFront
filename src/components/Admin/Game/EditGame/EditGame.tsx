import {useForm} from "react-hook-form";
import {useApi} from "../../../../hooks/useApi";
import {Form} from "../../Form";
import {InputField} from "../../../commons/FormFields/InputField/InputField";
import {SelectField} from "../../../commons/FormFields/SelectField/SelectField";
import {TextAreaField} from "../../../commons/FormFields/TextArea/TextAreaField";
import {Spinner} from "../../../commons/Spinner/Spinner";
import {ErrorMessage} from "../../../commons/Messages/ErrorMessage/ErrorMessage";
import {EditGameFormType} from "../../../../types/edit-forms.types";
import {StudioType, GameType} from 'types';
import {api} from "../../../../utils/axios";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

interface Props {
    closeModal: () => void
    game: GameType
    token:string | null
}

export const EditGame = ({closeModal, game,token}: Props) => {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const [studios, loading, gameError] = useApi<StudioType[]>({
        method: 'get',
        url: '/studio'
    });

    const {
        handleSubmit,
        register,
        formState: {
            errors: {name, developerId, releaseDate, description, image},
        },
    } = useForm<EditGameFormType>();

    const onSubmit = async (data: EditGameFormType) => {
        try {
            if (data.image) {
                const newData = {
                    ...data,
                    image: data.image[0]
                }
                const response = await api.patch(`/game/${game.id}`, newData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });
                if (response.status === 200) {
                    navigate(0)
                } else {
                    setError(response.data.error);
                }
            }
        } catch (e) {
            setError((e as Error).message);
        }
    }

    if (gameError) return <ErrorMessage text={gameError}/>
    if(error)return <ErrorMessage text={error}/>
    return (
        <>
            {(loading || !studios) ? <Spinner/> : (
                <Form
                    formSubtitle='Edytuj gre'
                    closeModal={closeModal}
                    onSubmit={handleSubmit(onSubmit)}
                    error=''
                    buttonTxt='Edytuj'
                >
                    <InputField
                        type='text'
                        placeholder='Nazwa gry...'
                        error={name}
                        validation={register('name', {
                            required: 'Nazwa gry jest wymagana',
                            value: game.name,
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
                        validation={register('image', {
                            required: 'Zdjecie jest wymagane'
                        })}
                    />
                    <TextAreaField
                        error={description}
                        validation={register('description', {
                            required: 'Opis gry jest wymagany',
                            value: game.description,
                            maxLength: {
                                value: 1000,
                                message: 'Opis gry nie może przekraczać 1000 znaków',
                            },
                        })}
                        placeholder='Opis gry...'
                    />
                </Form>
            )}
        </>
    )
}
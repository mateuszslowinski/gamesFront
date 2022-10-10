import {useEffect} from "react";
import {useForm} from "react-hook-form";
import {Form} from "../Form";
import {InputField} from "../../commons/FormFields/InputField/InputField";
import {SelectField} from "../../commons/FormFields/SelectField/SelectField";
import {TextAreaField} from "../../commons/FormFields/TextArea/TextAreaField";
import {AddGameFormType} from "../../../types/addd-forms.types";

interface Props {
    closeModal: (value: number) => void
    onSubmit: any
    closeConfirmMessage: () => void
    openConfirmMessage: boolean
    error: string
    studios: any
}

export const AddGameMain = ({closeModal, onSubmit, closeConfirmMessage, openConfirmMessage, error, studios}: Props) => {
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

    useEffect(() => {
        reset()
    }, [openConfirmMessage]);

    return (
        <Form
            closeModal={closeModal}
            onSubmit={handleSubmit(onSubmit)}
            formSubtitle='Dodaj nową grę'
            confirmMessageTxt='Gra została dodana'
            closeConfirmMessage={closeConfirmMessage}
            error={error}
            openConfirmMessage={openConfirmMessage}
            buttonTxt='Dodaj'
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
        </Form>
    )
}
import {Form} from "../../Form";
import {InputField} from "../../../commons/FormFields/InputField/InputField";
import {NumberInput} from "../../../commons/FormFields/NumberInput/NumberInput";
import {SelectField} from "../../../commons/FormFields/SelectField/SelectField";
import {TextAreaField} from "../../../commons/FormFields/TextArea/TextAreaField";
import {useForm} from "react-hook-form";
import {EditStudioFormType} from "../../../../types/edit-forms.types";
import {PublisherType, StudioType} from 'types';

interface Props {
    closeModal: (value: number) => void
    onSubmit: (data: EditStudioFormType) => void
    closeConfirmMessage: () => void
    openConfirmMessage: boolean
    error: string
    publishers: PublisherType[]
    studio: StudioType
}

export const EditStudioMain = ({
                                   closeModal,
                                   onSubmit,
                                   closeConfirmMessage,
                                   openConfirmMessage,
                                   error,
                                   publishers,
                                   studio
                               }: Props) => {

    const {
        handleSubmit,
        register,
        formState: {
            errors: {name, description, ownerId, country, founded, employees, image},
        },
    } = useForm<EditStudioFormType>();


    return (
        <Form
            closeConfirmMessage={closeConfirmMessage}
            formSubtitle='Edytuj stduio'
            confirmMessageTxt='Studio zostało zedytowane pomyślnie!'
            closeModal={closeModal}
            onSubmit={handleSubmit(onSubmit)}
            error={error}
            openConfirmMessage={openConfirmMessage}
            buttonTxt='Edytuj'
        >
            <InputField
                type='text'
                error={name}
                validation={register('name', {
                    required: 'Nazwa studia jest wymagana',
                    value: studio.name,
                    maxLength: {
                        value: 50,
                        message: 'Nazwa studia nie może przekraczać 50 znaków',
                    },
                })}
                text='Nazwa studia'
            />
            <InputField
                type='text'
                error={country}
                validation={register('country', {
                    required: 'Kraj pochodzenia jest wymagany',
                    value: studio.country,
                    maxLength: {
                        value: 50,
                        message: 'Nazwa studia nie może przekraczać 50 znaków',
                    },
                })}
                text="Kraj pochodzenia:"
            />
            <NumberInput
                text='Liczba pracowników:'
                error={employees}
                validation={register('employees', {
                    valueAsNumber: true,
                    value: studio.employees,
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
                    value: studio.founded,
                })}
                text="Data założenia:"
            />
            <SelectField
                validation={register('ownerId')}
                options={publishers}
                error={ownerId}
                text="Wybierz wydawce:"
            />
            <InputField
                type='file'
                error={image}
                validation={register('image')}
            />
            <TextAreaField
                error={description}
                validation={register('description', {
                    required: 'Opis wydawcy jest wymagany',
                    value: studio.description,
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
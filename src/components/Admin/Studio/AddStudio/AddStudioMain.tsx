import {useEffect} from "react";
import {useForm} from "react-hook-form";
import {Form} from "../../Form";
import {InputField} from "../../../commons/FormFields/InputField/InputField";
import {NumberInput} from "../../../commons/FormFields/NumberInput/NumberInput";
import {TextAreaField} from "../../../commons/FormFields/TextArea/TextAreaField";
import {SelectField} from "../../../commons/FormFields/SelectField/SelectField";
import {AddStudioFormType} from "../../../../types/addd-forms.types";

interface Props {
    closeModal: (value: number) => void
    onSubmit: any
    closeConfirmMessage: () => void
    openConfirmMessage: boolean
    error: string
    publishers: any
}

export const AddStudioMain = ({
                                  closeModal,
                                  onSubmit,
                                  closeConfirmMessage,
                                  openConfirmMessage,
                                  error,
                                  publishers
                              }: Props) => {

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

    useEffect(() => {
        reset()
    }, [openConfirmMessage]);

    return (
        <Form
            closeModal={closeModal}
            onSubmit={handleSubmit(onSubmit)}
            formSubtitle='Dodaj nowe studio'
            closeConfirmMessage={closeConfirmMessage}
            openConfirmMessage={openConfirmMessage}
            confirmMessageTxt='Studio zostało dodane!'
            error={error}
            buttonTxt='Dodaj'
        >
            <InputField
                type='text'
                error={name}
                validation={register('name', {
                    required: 'Nazwa studia jest wymagana',
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

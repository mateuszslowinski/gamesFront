import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import {Form} from "../Form";
import {InputField} from "../../commons/FormFields/InputField/InputField";
import {TextAreaField} from "../../commons/FormFields/TextArea/TextAreaField";
import {AddPublisherFormType} from "games/src/types/add-forms.types";

interface Props {
    closeModal: (value: number) => void
    onSubmit: any
    closeConfirmMessage: () => void
    openConfirmMessage: boolean
    error: string
}

export const AddPublisherMain = ({closeModal, onSubmit, closeConfirmMessage, openConfirmMessage, error}: Props) => {
    const {
        handleSubmit,
        register,
        reset,
        formState: {
            errors: {name, description},
        },
    } = useForm<AddPublisherFormType>({
        defaultValues: {
            name: '',
            description: ""
        }
    });

    useEffect(() => {
        reset()
    }, [openConfirmMessage]);

    return (
        <Form
            onSubmit={handleSubmit(onSubmit)}
            closeModal={closeModal}
            formSubtitle='Dodaj nowego wydawce:'
            confirmMessageTxt='Wydawca został dodany!'
            closeConfirmMessage={closeConfirmMessage}
            openConfirmMessage={openConfirmMessage}
            error={error}
            buttonTxt='Dodaj'
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
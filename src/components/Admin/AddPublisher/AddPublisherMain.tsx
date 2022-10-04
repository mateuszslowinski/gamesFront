import React from "react";
import {useForm} from "react-hook-form";
import {AddForm} from "../AddForm";
import {InputField} from "../../commons/InputField/InputField";
import {TextAreaField} from "../../commons/TextArea/TextAreaField";
import {AddPublisherFormType} from "../../../types/addd-forms.types";

interface Props {
    closeModal: (value: number) => void
    onSubmit: any
    form: AddPublisherFormType
    onChange: (arg: string, arg2: string) => void
    closeConfirmMessage: () => void
    openConfirmMessage: boolean
    error: string
}

export const AddPublisherMain = ({closeModal, onSubmit, form, onChange, closeConfirmMessage, openConfirmMessage, error}: Props) => {
    const {
        handleSubmit,
        register,
        formState: {
            errors: {name, description},
        },
    } = useForm<AddPublisherFormType>();

    return (
        <AddForm
            onSubmit={handleSubmit(onSubmit)}
            closeModal={closeModal}
            formSubtitle='Dodaj nowego wydawce:'
            confirmMessageTxt='Platforma została dodana!'
            closeConfirmMessage={closeConfirmMessage}
            openConfirmMessage={openConfirmMessage}
            error={error}
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
                onChange={(e) => onChange('name', e.target.value)}
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
                onChange={(e) => onChange('description', e.target.value)}
                placeholder='Opis wydawcy...'
            />
        </AddForm>
    )
}
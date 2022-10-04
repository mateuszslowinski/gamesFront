import React from "react";
import {useForm} from "react-hook-form";
import {AddForm} from "../AddForm";
import {InputField} from "../../commons/InputField/InputField";
import {TextAreaField} from "../../commons/TextArea/TextAreaField";
import {AddPlatformFormType} from "../../../types/addd-forms.types";

interface Props {
    closeModal: (value: number) => void
    onSubmit: any
    form: AddPlatformFormType
    onChange: (arg: string, arg2: string) => void
    closeConfirmMessage: () => void
    openConfirmMessage: boolean
    error: string
}

export const AddPlatformMain = ({closeModal, onSubmit, form, onChange, closeConfirmMessage, openConfirmMessage, error}: Props) => {
    const {
        handleSubmit,
        register,
        formState: {
            errors: {name, description},
        },
    } = useForm<AddPlatformFormType>();

    return (
        <AddForm
            onSubmit={handleSubmit(onSubmit)}
            closeModal={closeModal}
            formSubtitle='Dodaj nowa platformę:'
            confirmMessageTxt='Platforma została dodana!'
            closeConfirmMessage={closeConfirmMessage}
            openConfirmMessage={openConfirmMessage}
            error={error}
        >
            <InputField
                type='text'
                placeholder='Nazwa platformy...'
                error={name}
                validation={register('name', {
                    required: 'Nazwa wydawcy jest wymagana',
                    maxLength: {
                        value: 40,
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
                    required: 'Opis platformy jest wymagany',
                    maxLength: {
                        value: 1500,
                        message: 'Opis platformy nie może przekraczać 1500 znaków',
                    },
                })}
                onChange={(e) => onChange('description', e.target.value)}
                placeholder='Opis platformy...'
            />
        </AddForm>
    )
}
import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import {AddForm} from "../AddForm";
import {InputField} from "../../commons/FormFields/InputField/InputField";
import {TextAreaField} from "../../commons/FormFields/TextArea/TextAreaField";
import {AddPlatformFormType} from "../../../types/addd-forms.types";

interface Props {
    closeModal: (value: number) => void
    onSubmit: any
    closeConfirmMessage: () => void
    openConfirmMessage: boolean
    error: string
}

export const AddPlatformMain = ({closeModal, onSubmit, closeConfirmMessage, openConfirmMessage, error}: Props) => {
    const {
        handleSubmit,
        reset,
        register,
        formState: {
            errors: {name, description},
        },
    } = useForm<AddPlatformFormType>({
        defaultValues: {
            name: '',
            description: ""
        }
    });

    useEffect(() => {
        reset()
    }, [openConfirmMessage]);

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
                        message: 'Nazwa nie może przekraczać 40 znaków',
                    },
                })}

            />
            <TextAreaField
                error={description}
                validation={register('description', {
                    required: 'Opis platformy jest wymagany',
                    maxLength: {
                        value: 1500,
                        message: 'Opis platformy nie może przekraczać 1500 znaków',
                    },
                })}
                placeholder='Opis platformy...'
            />
        </AddForm>
    )
}
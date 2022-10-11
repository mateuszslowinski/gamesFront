import {Form} from "../../Form";
import {InputField} from "../../../commons/FormFields/InputField/InputField";
import {TextAreaField} from "../../../commons/FormFields/TextArea/TextAreaField";
import {useForm} from "react-hook-form";
import {EditPublisherFormType} from "../../../../types/edit-forms.types";
import {PublisherType} from 'types';

interface Props {
    closeModal: (value: number) => void
    onSubmit: (data: EditPublisherFormType) => void
    error: string
    publisher: PublisherType
}

export const EditPublisherMain = ({closeModal,onSubmit,error,publisher}: Props) => {
    const {
        handleSubmit,
        register,
        formState: {
            errors: {name, description},
        },
    } = useForm<EditPublisherFormType>();


    return (
        <Form
            onSubmit={handleSubmit(onSubmit)}
            closeModal={closeModal}
            formSubtitle='Edytuj nowego wydawce:'
            error={error}
            buttonTxt='Edytuj'
        >
            <InputField
                type='text'
                placeholder='Nazwa wydawcy...'
                error={name}
                validation={register('name', {
                    required: 'Nazwa wydawcy jest wymagana',
                    value: publisher.name,
                    maxLength: {
                        value: 50,
                        message: 'Nazwa nie może przekraczać 50 znaków',
                    },
                })}
                text='Nazwa wydawcy'
            />
            <TextAreaField
                error={description}
                validation={register('description', {
                    required: 'Opis wydawcy jest wymagany',
                    value: publisher.description,
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
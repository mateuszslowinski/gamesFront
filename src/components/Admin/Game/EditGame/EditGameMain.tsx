import {useForm} from "react-hook-form";
import {Form} from "../../Form";
import {InputField} from "../../../commons/FormFields/InputField/InputField";
import {SelectField} from "../../../commons/FormFields/SelectField/SelectField";
import {TextAreaField} from "../../../commons/FormFields/TextArea/TextAreaField";
import {EditGameFormType} from "../../../../types/edit-forms.types";
import {StudioType, GameType} from 'types';

interface Props {
    closeModal: () => void
    onSubmit: (data: EditGameFormType) => void
    studios: StudioType[]
    game: GameType
    error:string
}

export const EditGameMain = ({closeModal, onSubmit, studios, game,error}: Props) => {
    const {
        handleSubmit,
        register,
        formState: {
            errors: { developerId, releaseDate, description, image},
        },
    } = useForm<EditGameFormType>();


    return (
        <Form
            formSubtitle='Edytuj gre'
            closeModal={closeModal}
            onSubmit={handleSubmit(onSubmit)}
            error={error}
            buttonTxt='Edytuj'
        >
            <h2>{game.name}</h2>
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
        </Form>)
}
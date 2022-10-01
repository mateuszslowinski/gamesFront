import {AddForm} from "../AddForm";
import {SyntheticEvent} from "react";

interface Props {
    closeModal: (value: number) => void
}

export const AddGame = ({closeModal}: Props) => {
    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
    }

    return (
        <AddForm
            closeModal={closeModal}
            onSubmit={handleSubmit}
            formSubtitle='Dodaj nową grę'>
        </AddForm>
    )
}
import {SyntheticEvent} from "react";
import {AddForm} from "../AddForm";

interface Props {
    closeModal: (value: number) => void
}

export const AddStudio =({closeModal}:Props)=>{
    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
    }

    return(
        <AddForm
            closeModal={closeModal}
            onSubmit={handleSubmit}
            formSubtitle='Dodaj nowe studio'>
        </AddForm>
    )
}
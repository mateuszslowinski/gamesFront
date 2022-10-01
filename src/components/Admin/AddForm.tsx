import {ReactNode, SyntheticEvent} from "react";
import {Button} from "../commons/Button/Button";

import './AddForm.css';

interface Props {
    closeModal: (value: number) => void
    children: ReactNode
    onSubmit: (e: SyntheticEvent) => void
    formSubtitle: string
}

export const AddForm = ({closeModal, children, onSubmit, formSubtitle}: Props) => (
    <form className="add__form__container" onSubmit={onSubmit}>
        <Button text='Wróc do panelu' onClick={() => closeModal(0)}/>
        <h3>{formSubtitle}</h3>
        {children}
    </form>
)


import {ReactNode, SyntheticEvent} from "react";
import {Button} from "../commons/Button/Button";
import {ConfirmMessage} from "../commons/Messages/ConfirmMessage/ConfirmMessage";
import {ErrorMessage} from "../commons/Messages/ErrorMessage/ErrorMessage";

import './Form.css';

interface Props {
    closeModal: (value: number) => void
    children: ReactNode
    onSubmit: (e: SyntheticEvent) => void
    formSubtitle: string
    openConfirmMessage?: boolean
    closeConfirmMessage?: () => void
    confirmMessageTxt?: string
    error: string
    buttonTxt: string
}

export const Form = ({
                         closeModal,
                         children,
                         onSubmit,
                         formSubtitle,
                         openConfirmMessage,
                         closeConfirmMessage,
                         confirmMessageTxt,
                         error,
                         buttonTxt
                     }: Props) => {

    if (error) return <ErrorMessage text={error}/>
    return (
        <>
            {openConfirmMessage && <ConfirmMessage text={confirmMessageTxt} onClick={closeConfirmMessage}/>}
            <form className="form__container" onSubmit={onSubmit}>
                <Button text='Wróc do panelu' onClick={() => closeModal(0)}/>
                <h3>{formSubtitle}</h3>
                {children}
                <Button text={buttonTxt}/>
            </form>
        </>
    )
}
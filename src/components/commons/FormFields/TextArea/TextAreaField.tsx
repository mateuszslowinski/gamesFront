import React from "react";
import {UseFormRegisterReturn} from "react-hook-form";

import './TextAreaField.css';

interface Props {
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    placeholder: string
    validation: UseFormRegisterReturn
    error: any
}

export const TextAreaField = ({value, placeholder, onChange, validation, error}: Props) => (
    <>
    <textarea
        className='text__area__field'
        value={value}
        {...validation}
        placeholder={placeholder}
        onChange={onChange}
    />
        {error && <div className='text__error__message'>{error.message}</div>}
    </>
)
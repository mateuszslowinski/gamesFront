import React, {ChangeEvent} from "react";
import {UseFormRegisterReturn} from "react-hook-form";
import './InputFiled.css';

interface Props {
    type: React.HTMLInputTypeAttribute,
    value: string
    placeholder: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    error: any
    validation?: UseFormRegisterReturn
}

export const InputField = ({ type, value, placeholder, onChange, error, validation}: Props) => (
    <>
        <input
            type={type}
            value={value}
            {...validation}
            placeholder={placeholder}
            onChange={onChange}
        />
        {error && <div className='input__error__message'>{error.message}</div>}
    </>

)
import React from "react";
import {UseFormRegisterReturn} from "react-hook-form";
import './InputFiled.css';

interface Props {
    type: React.HTMLInputTypeAttribute,
    value?: string
    placeholder?: string
    error?: any
    validation?: UseFormRegisterReturn
    text?:string
}

export const InputField = ({type, value, placeholder, error, validation,text}: Props) => (
    <label className='input__field'>
        <p>{text}</p>
        <input
            type={type}
            value={value}
            {...validation}
            placeholder={placeholder}
        />
        {error && <div className='input__error__message'>{error.message}</div>}
    </label>

)
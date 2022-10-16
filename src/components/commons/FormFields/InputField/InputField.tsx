import React, { ChangeEvent } from "react";
import {UseFormRegisterReturn} from "react-hook-form";
import './InputFiled.css';

interface Props {
    type: React.HTMLInputTypeAttribute,
    value?: string
    placeholder?: string
    error?: any
    validation?: UseFormRegisterReturn
    text?:string
    onChange?:(e:ChangeEvent<HTMLInputElement>)=>void
}

export const InputField = ({type, value, placeholder, error, validation,text,onChange}: Props) => (
    <label className='input__field'>
        <p>{text}</p>
        <input
            type={type}
            value={value}
            {...validation}
            placeholder={placeholder}
            onChange={onChange}
        />
        {error && <div className='input__error__message'>{error.message}</div>}
    </label>

)
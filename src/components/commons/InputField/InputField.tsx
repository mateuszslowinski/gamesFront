import React, {ChangeEvent} from "react";
import './InputFiled.css';

interface Props {
    type: React.HTMLInputTypeAttribute,
    name: string
    value: string
    placeholder: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const InputField = ({type, name, value, placeholder, onChange}: Props) => (
    <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
    />
)
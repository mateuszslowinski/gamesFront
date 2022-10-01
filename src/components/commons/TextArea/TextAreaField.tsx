import React from "react";
import './TextAreaField.css';

interface Props {
    name: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    placeholder: string
}

export const TextAreaField = ({name, value, placeholder, onChange}: Props) => (
    <textarea
        className='text__area__field'
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
    />
)
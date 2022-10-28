import React, {ChangeEvent} from "react";
import {UseFormRegisterReturn} from "react-hook-form";

import './SelectField.css';

interface Props {
    validation?: UseFormRegisterReturn
    options: { id: string; name: string }[]
    error?: any
    text: string
    onChange?: (e: ChangeEvent<HTMLSelectElement>) => void
}

export const SelectField = ({validation, options,text, error, onChange}: Props) => (
    <div className='select__field__container'>
        <select
            {...validation}
            onChange={onChange}
        >
            <option selected hidden>{text}</option>
            {options.map(option => (
                <option
                    key={option.id}
                    value={option.id}>
                    {option.name}
                </option>
            ))}
        </select>
        {error && <div className='input__error__message'>{error.message}</div>}
    </div>
)
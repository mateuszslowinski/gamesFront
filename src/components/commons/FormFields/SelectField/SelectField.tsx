import React, {ChangeEvent} from "react";
import {UseFormRegisterReturn} from "react-hook-form";

import './SelectField.css';

interface Props {
    validation: UseFormRegisterReturn
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void
    options: { id: string; name: string }[]
    error:any
}

export const SelectField = ({validation, onChange, options,error}: Props) => (
    <div className='select__field__container'>
        <select
            {...validation}
            onChange={onChange}>
            <option value="">Wybierz wydawce:</option>
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
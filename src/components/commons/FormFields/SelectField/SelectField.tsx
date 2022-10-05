import React from "react";
import {UseFormRegisterReturn} from "react-hook-form";

import './SelectField.css';

interface Props {
    validation: UseFormRegisterReturn
    options: { id: string; name: string }[]
    error:any
}

export const SelectField = ({validation, options,error}: Props) => (
    <div className='select__field__container'>
        <select
            {...validation}
           >
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
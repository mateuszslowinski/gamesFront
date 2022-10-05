import React, {ChangeEvent} from "react";
import {UseFormRegisterReturn} from "react-hook-form";

import './NumberInput.css';
interface Props {
    value: number
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    error: any
    validation?: UseFormRegisterReturn
    min: number
    max: number
    text: string
}

export const NumberInput = ({value, onChange, error, validation, min, max, text}: Props) => (
    <div className='number__input_container'>
        <p>{text}</p>
        <input
            type="number"
            {...validation}
            value={value}
            onChange={onChange}
            min={min}
            max={max}
        />
        {error && <div className='input__error__message'>{error.message}</div>}
    </div>
)
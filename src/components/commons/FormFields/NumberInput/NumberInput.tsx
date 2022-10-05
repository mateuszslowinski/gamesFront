import React from "react";
import {UseFormRegisterReturn} from "react-hook-form";

import './NumberInput.css';
interface Props {
    error: any
    validation: UseFormRegisterReturn
    min: number
    max: number
    text: string
}

export const NumberInput = ({error, validation, min, max, text}: Props) => (
    <div className='number__input_container'>
        <p>{text}</p>
        <input
            type="number"
            {...validation}
            min={min}
            max={max}
        />
        {error && <div className='input__error__message'>{error.message}</div>}
    </div>
)
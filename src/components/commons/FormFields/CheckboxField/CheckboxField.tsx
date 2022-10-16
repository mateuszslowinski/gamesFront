import {UseFormRegisterReturn} from "react-hook-form";
import './Checkbox.css';

interface Props {
    options: { name: string, id: string }[]
    validation: UseFormRegisterReturn
    subTitle: string
}

export const CheckboxField = ({options, validation, subTitle}: Props) => (
    <div className='checkbox__container'>
        <h4>{subTitle}</h4>
        <div>
            {
                options.map(option => (
                    <label key={option.id}>
                        {option.name}
                        <input
                            type="checkbox"
                            {...validation}
                            value={option.id}
                        />
                    </label>
                ))
            }
        </div>
    </div>
)
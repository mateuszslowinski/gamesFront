import {useState} from "react";
import {api} from "../../utils/axios";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {ErrorMessage} from "../commons/Messages/ErrorMessage/ErrorMessage";
import {Button} from "../commons/Button/Button";
import {InputField} from "../commons/FormFields/InputField/InputField";
import {LoginFormTypes} from "../../types/login.types";
import {emailValidate} from "../../utils/pattern.validate";

import './Login.css';

export const Login = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const {
        handleSubmit,
        register,
        formState: {
            errors: {email, hash},
        },
    } = useForm<LoginFormTypes>({
        defaultValues:{
            email:'',
            hash:''
        }
    });


    const onSubmit = async (form: LoginFormTypes) => {
        try {
            const response = await api.post('/auth/login', form)
            const data = response.data;
            if (response.status === 200) {
                localStorage.setItem('userToken', data.access_token)
                navigate('/')
            } else {
                setError(data.error)
            }
        } catch (e) {
            setError((e as Error).message)
        }
    }

    if (error) return <ErrorMessage text={error}/>
    return (
        <div className='page__container'>
            <form className='login__form' onSubmit={handleSubmit(onSubmit)}>
                <InputField
                    type="email"
                    error={email}
                    validation={register('email', {
                        required: 'Email jest wymagane',
                        pattern: {
                            value: emailValidate,
                            message: "Podaj poprawy address email",
                        },
                    })}
                    text='email'
                />
                <InputField
                    type='password'
                    error={hash}
                    validation={register('hash', {
                        required: 'Hasło jest wymagane',
                    })}
                    text='Hasło'
                />
                <Button text='Zaloguj'/>
            </form>
        </div>
    )
}
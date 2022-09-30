import {SyntheticEvent, useState} from "react";
import {api} from "../../utils/axios";
import {useNavigate} from "react-router-dom";
import {ErrorMessage} from "../commons/ErrorMessage/ErrorMessage";
import {Button} from "../commons/Button/Button";

import './Login.css';

interface LoginForm {
    email: string
    hash: string
}

export const Login = () => {
    const [error, setError] = useState('');
    const [form, setForm] = useState<LoginForm>({
        email: '',
        hash: ''
    });
    const navigate = useNavigate();

    const updateForm = (key: string, value: string) => {
        setForm(form => ({
            ...form,
            [key]: value,
        }));
    };

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
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
            <form className='login__form' onSubmit={handleSubmit}>
                <input
                    type="email"
                    name='email'
                    placeholder='Email...'
                    value={form.email}
                    onChange={e => updateForm('email', e.target.value)}
                />
                <input type="password"
                       placeholder='Hasło...'
                       name='hash'
                       value={form.hash}
                       onChange={e => updateForm('hash', e.target.value)}
                />
                <Button text='Zaloguj'/>
            </form>
        </div>
    )
}
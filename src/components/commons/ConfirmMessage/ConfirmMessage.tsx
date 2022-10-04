import { Button } from '../Button/Button';
import './ConfirmMessage.css';

interface Props {
    text: string
    onClick:()=>void
}

export const ConfirmMessage = ({text,onClick}: Props) => (
    <div className='confirm__message'>
        <p>{text}</p>
        <Button text='Ok' onClick={onClick}/>
    </div>
)
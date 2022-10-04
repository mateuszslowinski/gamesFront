import './errorMessage.css';

interface Props {
    text: string;
}

export const ErrorMessage = ({text}: Props) => (
    <div className='error'>
        <p className="error__message">{text}</p>
    </div>
)
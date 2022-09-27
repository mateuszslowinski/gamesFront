import './button.css';

interface Props {
    text: string
    onClick?: () => void
}

export const Button = ({text, onClick}: Props) => (
    <button className='btn' onClick={onClick}>{text}</button>
)
import {useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import './Searchbar.css';

export const Searchbar = () => {
    const [term, setTerm] = useState<string>('');
    const[searchParams,setSearchParams]=useSearchParams('');
    const navigate = useNavigate();

    const searchGame = () => {
        setSearchParams({term})
        navigate({
            pathname: '/game',
            search: `?search=${term}`,
        })
    }

    return (
        <div className="searchbar_container">
            <input
                type="text"
                placeholder="Wyszukaj grę..."
                onChange={(e) => setTerm(e.target.value)}
                onKeyPress={e => {
                    if (e.key === 'Enter') searchGame()
                }}
            />
            <button className='btn' onClick={searchGame}>
                Szukaj
            </button>
        </div>
    )
}
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Searchbar.css';

export const Searchbar = () => {
    const [term, setTerm] = useState<string>('');
    const navigate = useNavigate();

    const search = () => {
        navigate(`/search/${term}`)
    }
    return (
        <div className="searchbar_container">
            <input
                type="text"
                placeholder="Wyszukaj grę..."
                onChange={(e) => setTerm(e.target.value)}
                onKeyPress={e => {
                    if (e.key === 'Enter') search()
                }}
            />
            <button className='btn' onClick={search}>
                Szukaj
            </button>
        </div>
    )
}
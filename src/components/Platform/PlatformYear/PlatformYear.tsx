import {useState} from "react";
import {AiOutlineArrowDown} from 'react-icons/ai'
import {NavLink} from "react-router-dom";
import {GameType} from 'types';
import './PlatformYear.css';

interface Props {
    year: string
    platformGames: GameType[] | null
}

export const PlatformYear = ({year, platformGames}: Props) => {
    const [open, setOpen] = useState<boolean>(false);
    const handleArrowClick = () => {
        setOpen(() => !open)
    }
    return (
        <>
            <div className='years__container' key={year}>
                <h3>{year}</h3>
                <AiOutlineArrowDown
                    onClick={handleArrowClick}
                    style={{transform: open ? "rotate(180deg)" : ''}}
                />
            </div>
            {open ? platformGames?.filter(game => game.releaseDate.toString().slice(0, 4) === year).map(game => (
                <div className='platforms__game__container' key={game.id}>
                    <NavLink to={`../game/${game.name}`}>
                        <h5>{game.name}</h5>
                    </NavLink>
                    <h5>{game.releaseDate.toString().slice(0, 10)}</h5>
                </div>
            )) : null}
        </>
    )
}
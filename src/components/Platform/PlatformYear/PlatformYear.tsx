import {useState} from "react";
import {GameType} from 'types';
import './PlatformYear.css';

interface Props {
    year: string
    platformGames: GameType[] | null
}

export const PlatformYear = ({year, platformGames}: Props) => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className='years__container' key={year}>
            <div>
                <h3>{year}</h3>
                <button onClick={()=>setOpen(!open)}>otw</button>
            </div>
            {open && platformGames?.filter(game => game.releaseDate.toString().slice(0, 4) === year).map(game => (
                <div key={game.id}>
                    <h5>{game.name}</h5>
                    <h5>{game.releaseDate.toString().slice(0, 10)}</h5>
                </div>
            ))}
        </div>
    )
}
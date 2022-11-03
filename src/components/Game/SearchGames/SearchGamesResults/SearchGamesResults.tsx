import {NavLink} from 'react-router-dom'
import {convertTime} from "../../../../utils/convertTime";
import {GameType} from 'types'

interface Props {
    games: GameType[] | null
}

export const SearchGamesResults = ({games}: Props) => {
    return (
        <div className='search__results__container'>
            <h2>Wyniki wyszukiwania:</h2>
            {games?.map(game => (
                <div className='search__results__container__game' key={game.id}>
                    <p>Tytuł:</p>
                    <h3>{game.name}</h3>
                    <p>Data wydania:</p>
                    <p>{convertTime(game.releaseDate)}</p>
                    <NavLink to={`../game/${game.name}`}>Zobacz więcej</NavLink>
                </div>
            ))}
        </div>
    )
}
import {NavLink} from 'react-router-dom'
import {convertTime} from "../../../../utils/convertTime";
import {motion} from 'framer-motion';
import {GameType} from 'types'

interface Props {
    games: GameType[] | null
    term?:string
}

export const SearchGamesResults = ({games,term}: Props) => {
    return (
        <div className='search__results__container'>
            <h2>Wyniki wyszukiwania dla {term}:</h2>
            {games?.map(game => (
                <motion.div
                    key={game.id}
                    className='search__results__container__game'
                    initial={{width: 0}}
                    animate={{width: "100%"}}
                    exit={{x: window.innerWidth, transition: {duration: 0.5}}}
                >
                    <p>Tytuł:</p>
                    <h3>{game.name}</h3>
                    <p>Data wydania:</p>
                    <p>{convertTime(game.releaseDate)}</p>
                    <NavLink to={`../game/${game.name}`}>Zobacz więcej</NavLink>
                </motion.div>
            ))}
        </div>
    )
}
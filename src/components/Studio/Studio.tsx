import {NavLink, useNavigate} from "react-router-dom";
import {Button} from "../commons/Button/Button";
import {StudioType} from 'types';
import {GameType} from 'types';

import './Studio.css';

interface Props {
    studio: StudioType
    games: GameType[]
}

export const Studio = ({studio, games}: Props) => {
    const navigate = useNavigate();
    const {id, name, description, employees, founded, country} = studio;

    return (
        <div className="studio__container">
            <Button
                text="Wróc na poprzednią stronę"
                onClick={() => navigate(-1)}
            />
            <img src={`${process.env.REACT_APP_API_URL}/studio/photo/${id}`} alt={`${name} logo`}/>
            <p>{description}</p>
            <div className='studio__details'>
                <span>Liczba pracowników:
                    <p>{employees}</p>
                </span>
                <span>Założone w:
                    <p>{founded}</p>
                </span>
                <span>Kraj:
                    <p>{country}</p>
                </span>
            </div>
            <p>Wydane gry:</p>
            <table>
                <thead>
                <tr>
                    <th>Tytuł</th>
                    <th>Data wydania</th>
                </tr>
                </thead>
                <tbody>
                {games.map(game => (
                    <tr key={game.id}>
                        <th><NavLink to={`../game/${game.id}`}>{game.name}</NavLink></th>
                        <th>{game.releaseDate.toString().slice(0, 10)}</th>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}
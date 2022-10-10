import {useApi} from "../../hooks/useApi";
import {Spinner} from "../commons/Spinner/Spinner";
import {ErrorMessage} from "../commons/Messages/ErrorMessage/ErrorMessage";
import {GameType} from 'types';
import {StudioType} from 'types';

import './Game.css';

interface Props {
    game: GameType;
}

export const Game = ({game}: Props) => {
    const {id, name, description, releaseDate, developerId} = game;
    const [studio, loadingStudio, errorStudio] = useApi<StudioType>({
        method: 'get',
        url: `/studio/${developerId}`
    }, id)

    if (!studio || errorStudio) return <ErrorMessage text={errorStudio}/>
    return (
        <div className='game__page__container'>
            {loadingStudio
                ? <Spinner/>
                : (
                    <>
                        <h3>{name}</h3>
                        <img src={`${process.env.REACT_APP_API_URL}/game/photo/${id}`} alt={`${name} logo`}/>
                        <div className="game__details">
                            <span>Deweloper:<p>{studio.name}</p></span>
                            <span>Data wydania: <p>{releaseDate.toString().slice(0, 10)}</p></span>
                        </div>
                        <div className='game__description'>
                            <p>{description}</p>
                        </div>
                    </>
                )}
        </div>
    )
}
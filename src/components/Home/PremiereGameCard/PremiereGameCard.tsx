import {useApi} from "../../../hooks/useApi";
import {convertTime} from "../../../utils/convertTime";
import {ErrorMessage} from "../../commons/Messages/ErrorMessage/ErrorMessage";
import {GameType} from 'types';
import './PremiereGameCard.css';

export const PremiereGameCard = () => {
    const [game, loadingGame, errorGame] = useApi<GameType>({
        method: 'get',
        url: `/game/release/close`
    }, []);

    if (errorGame) return <ErrorMessage text={errorGame}/>
    return (
        <div className='game__container'>
            {(!game || loadingGame)
                ? <h3>Brak premiery</h3>
                : <>
                    <h3>Najbliższa premiera</h3>
                    <h4>{convertTime(game.releaseDate)}</h4>
                    <img
                        src={`${process.env.REACT_APP_API_URL}/game/photo/${game.id}`}
                        alt={`${game.name} logo`}
                    />
                </>}
        </div>
    )
}
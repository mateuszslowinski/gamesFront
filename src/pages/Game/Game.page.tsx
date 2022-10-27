import {Game} from "../../components/Game/Game";
import {useParams} from "react-router-dom";
import {useApi} from "../../hooks/useApi";
import {ErrorMessage} from "../../components/commons/Messages/ErrorMessage/ErrorMessage";
import {Spinner} from "../../components/commons/Spinner/Spinner";
import {GameType} from 'types';

export const GamePage = () => {
    const {name} = useParams();
    const [game, loadingGame, errorGame] = useApi<GameType>({
        method: 'get',
        url: `/game/${name}`
    }, name);
    if (errorGame) return <ErrorMessage text={errorGame}/>
    return (
        <div className='page__container'>
            {loadingGame || !game ? <Spinner/> : <Game game={game}/>}
        </div>
    )
}

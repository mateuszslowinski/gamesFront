import {Studio} from "../../components/Studio/Studio";
import {useParams} from "react-router-dom";
import {useApi} from "../../hooks/useApi";
import {ErrorMessage} from "../../components/commons/Messages/ErrorMessage/ErrorMessage";
import {Spinner} from "../../components/commons/Spinner/Spinner";
import {StudioType} from 'types';
import {GameType} from 'types';

export const StudioPage = () => {
    const {name} = useParams();
    const [studio, loadingStudio, errorStudio] = useApi<StudioType>({
        method: 'get',
        url: `/studio/${name}`
    }, name);

    const [games, loadingGames, errorGames] = useApi<GameType[]>({
        method: 'get',
        url: `/game/${name}/studio`
    },name );

    if (errorGames) return <ErrorMessage text={errorGames}/>
    if (errorStudio) return <ErrorMessage text={errorStudio}/>
    return (
        <div className='page__container'>
            {(loadingStudio || loadingGames || !studio || !games)
                ? <Spinner/>
                : <Studio studio={studio} games={games}/>
            }
        </div>
    )
}
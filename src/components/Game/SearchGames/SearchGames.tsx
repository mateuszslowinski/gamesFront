import {useSearchParams} from "react-router-dom";
import {useApi} from "../../../hooks/useApi";
import {GameType} from 'types'
import {Spinner} from "../../commons/Spinner/Spinner";
import {ErrorMessage} from "../../commons/Messages/ErrorMessage/ErrorMessage";

export const SearchGames = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const term = searchParams.get('search')
    const [games, loadingGames, errorGames] = useApi<GameType[]>({
        method: 'get',
        url: `/game/search/${term}`
    }, [term]);

    if (errorGames) return <ErrorMessage text={errorGames}/>
    return (
        <div className='page__container'>
            {loadingGames
                ? <Spinner/>
                : games?.length !== 0 ? <h2>wyniki</h2> : <h2>brak wynikow wyszukiwania</h2>
            }
        </div>
    )
}

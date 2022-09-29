import {Studio} from "../../components/Studio/Studio";
import {useParams} from "react-router-dom";
import {useApi} from "../../hooks/useApi";
import {ErrorMessage} from "../../components/commons/ErrorMessage/ErrorMessage";
import {Spinner} from "../../components/commons/Spinner/Spinner";
import {StudioType} from 'types';

export const StudioPage = () => {
    const {id} = useParams();

    const [studio, loading, error] = useApi<StudioType>({
        method: 'get',
        url: `/studio/${id}`
    }, id);

    if (error) return <ErrorMessage text={error}/>
    return (
        <div className='page__container'>
            {(loading || !studio) ? <Spinner/> : <Studio studio={studio}/>}
        </div>
    )
}
import {Publisher} from "../../components/Publisher/Publisher";
import {useApi} from "../../hooks/useApi";
import {useParams} from "react-router-dom";
import {StudioType, PublisherType} from 'types';
import {ErrorMessage} from "../../components/commons/Messages/ErrorMessage/ErrorMessage";
import {Spinner} from "../../components/commons/Spinner/Spinner";


export const PublisherPage = () => {
    const {id} = useParams();

    const [publisher, loadingPublisher, errorPublisher] = useApi<PublisherType>({
        method: 'get',
        url: `/publisher/${id}`
    }, id);

    const [studios, loadingStudios, errorStudios] = useApi<StudioType[]>({
        method: 'get',
        url: `/publisher/${id}/studios`
    }, id);

    if (errorStudios) return <ErrorMessage text={errorStudios}/>
    if (errorPublisher ) return <ErrorMessage text={errorPublisher}/>
    return (
        <div className='page__container'>
            {
                (loadingStudios || loadingPublisher || !studios || !publisher)
                    ? <Spinner/>
                    : <Publisher publisher={publisher} studios={studios}/>
            }
        </div>
    )
}
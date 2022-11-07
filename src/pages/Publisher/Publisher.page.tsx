import {useParams} from "react-router-dom";
import {useApi} from "../../hooks/useApi";
import {Publisher} from "../../components/Publisher/Publisher";
import {ErrorMessage} from "../../components/commons/Messages/ErrorMessage/ErrorMessage";
import {Spinner} from "../../components/commons/Spinner/Spinner";
import {StudioType, PublisherType} from 'types';

export const PublisherPage = () => {
    const {name} = useParams();
    const [publisher, loadingPublisher, errorPublisher] = useApi<PublisherType>({
        method: 'get',
        url: `/publisher/${name}`
    }, name);

    const [studios, loadingStudios, errorStudios] = useApi<StudioType[]>({
        method: 'get',
        url: `/publisher/${name}/studios`
    }, name);

    if (errorStudios) return <ErrorMessage text={errorStudios}/>
    if (errorPublisher) return <ErrorMessage text={errorPublisher}/>
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
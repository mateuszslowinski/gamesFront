import {Home} from "../../components/Home/Home";
import {useApi} from "../../hooks/useApi";
import {Spinner} from "../../components/commons/Spinner/Spinner";
import {ErrorMessage} from "../../components/commons/Messages/ErrorMessage/ErrorMessage";
import {PublisherType} from 'types';
import {StudioType} from 'types';


export const HomePage = () => {
    const [publishers, publisherLoading, publisherError] = useApi<PublisherType[]>({
        method: 'get',
        url: '/publisher'
    });
    const [studios, loadingStudios, errorStudios] = useApi<StudioType[]>({
        method: 'get',
        url: `/studio/`
    });

    if (publisherError) return <ErrorMessage text={publisherError}/>
    if (errorStudios) return <ErrorMessage text={errorStudios}/>
    return (
        <div className='page__container'>
            {(publisherLoading || !publishers || loadingStudios || !studios)
                ? <Spinner/>
                : <Home publishers={publishers} studios={studios}/>}
        </div>
    )
}
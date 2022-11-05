import {Home} from "../../components/Home/Home";
import {useApi} from "../../hooks/useApi";
import {Spinner} from "../../components/commons/Spinner/Spinner";
import {ErrorMessage} from "../../components/commons/Messages/ErrorMessage/ErrorMessage";
import {PublisherType} from 'types';

export const HomePage = () => {
    const [publishers, publisherLoading, publisherError] = useApi<PublisherType[]>({
        method: 'get',
        url: '/publisher'
    });

    if (publisherError) return <ErrorMessage text={publisherError}/>
    return (
        <div className='page__container'>
            {(publisherLoading || !publishers) ? <Spinner/> : <Home publishers={publishers}/>}
        </div>
    )
}
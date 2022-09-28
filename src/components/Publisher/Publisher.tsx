import {useParams} from "react-router-dom";
import {useApi} from "../../hooks/useApi";
import {Spinner} from "../commons/Spinner/Spinner";
import {ErrorMessage} from "../commons/ErrorMessage/ErrorMessage";
import {StudioType,PublisherType} from 'types';

import './Publisher.css';

export const Publisher = () => {
    const {id} = useParams();

    const [publisher, loadingPublisher, errorPublisher] = useApi<PublisherType>({
        method: 'get',
        url: `/publisher/${id}`
    }, id);


    const [studios, loadingStudios, errorStudios] = useApi<StudioType[]>({
        method: 'get',
        url: `/publisher/${id}/studios`
    }, id);

    if(errorStudios) return <ErrorMessage text={errorStudios}/>
    if(errorPublisher) return <ErrorMessage text={errorPublisher}/>
    return (
        <>
            {
                (loadingStudios || loadingPublisher) ? <Spinner/> : (
                    <div className='publisher__container'>
                        <h2>{publisher?.name}</h2>
                        <p>{publisher?.description}</p>
                        <div className="studios__container">
                            {studios?.map(studio => (
                                <div className="studio" key={studio.id}>
                                    <p>{studio.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            }
        </>
    )
}
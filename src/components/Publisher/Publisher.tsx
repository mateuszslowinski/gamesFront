import {useNavigate} from "react-router-dom";
import {StudioType, PublisherType} from 'types';

import './Publisher.css';

interface Props {
    studios: StudioType[]
    publisher: PublisherType
}

export const Publisher = ({studios, publisher}: Props) => {
    const navigate = useNavigate();

    const handleGoToStudioSite = (id: string) => {
        navigate(`/studio/${id}`)
    };

    return (
        <div className='publisher__container'>
            <h2>{publisher.name}</h2>
            <p>{publisher.description}</p>
            <h3>Studia należące do {publisher.name}:</h3>
            <div className="studios__container">
                {studios.map(studio => (
                    <div className="studio" key={studio.id} onClick={() => handleGoToStudioSite(studio.id)}>
                        <p>{studio.name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {getToken} from "../../hooks/getToken";
import {Button} from "../commons/Button/Button";
import {EditPublisher} from "../Admin/Publisher/EditPublisher/EditPublisher";
import {StudioType, PublisherType} from 'types';

import './Publisher.css';

interface Props {
    studios: StudioType[]
    publisher: PublisherType
}

export const Publisher = ({studios, publisher}: Props) => {
    const navigate = useNavigate();
    const [openEditForm, setOpenEditForm] = useState(0);
    const token = getToken();

    const handleGoToStudioSite = (id: string) => {
        navigate(`/studio/${id}`)
    };
    const {name, description} = publisher
    return (
        <div className='publisher__container'>
            {openEditForm === 1 && <EditPublisher
                token={token}
                publisher={publisher}
                closeModal={() => setOpenEditForm(0)}
            />}
            {token && <Button
                text='Edytuj wydawcę'
                onClick={() => setOpenEditForm(1)}
            />
            }
            <h2>{name}</h2>
            <span>Opis:<p>{description}</p></span>

            <h3>Studia należące do {name}:</h3>
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
import {useParams} from "react-router-dom";
import {useApi} from "../../hooks/useApi";
import {Spinner} from "../commons/Spinner/Spinner";
import {ErrorMessage} from "../commons/ErrorMessage/ErrorMessage";
import {StudioType} from 'types';

import './Publisher.css';

export const Publisher = () => {
    const {id} = useParams();

    const [response, loading, error] = useApi<StudioType[]>({
        method: 'get',
        url: `/publisher/${id}/studios`
    }, id);

    if(error) return <ErrorMessage text={error}/>
    return (
        <>
            {
                loading ? <Spinner/> : (
                    <div className='publisher__container'>
                        <h2>Nazwa wydawcy</h2>
                        <p>opis</p>
                        <div className="studios__container">
                            {response?.map(studio => (
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
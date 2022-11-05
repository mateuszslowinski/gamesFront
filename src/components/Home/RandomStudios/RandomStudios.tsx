import {NavLink} from "react-router-dom";
import {useApi} from "../../../hooks/useApi";
import {Spinner} from "../../commons/Spinner/Spinner";
import {ErrorMessage} from "../../commons/Messages/ErrorMessage/ErrorMessage";
import {StudioType} from 'types';
import './RandomStudios.css';

export const RandomStudios = () => {
    const [studios, loadingStudios, errorStudios] = useApi<StudioType[]>({
        method: 'get',
        url: `/studio/`
    });

    if (errorStudios) return <ErrorMessage text={errorStudios}/>
    return (
        <div className='random__studios__container'>
            <h4>Wybrane studia:</h4>
            {(!studios || loadingStudios)
                ? <Spinner/>
                : <div className='random__studio__container'>
                    {studios.map(studio => (
                        <div className="random__studio__details__container">
                            <h4> {studio.name}</h4>
                            <img src={`${process.env.REACT_APP_API_URL}/studio/photo/${studio.id}`}
                                 alt={`${studio.name} logo`}/>
                            <NavLink to={`../studio/${studio.name}`}>Zobacz więcej</NavLink>
                        </div>
                    ))}
                </div>}
        </div>
    )
}
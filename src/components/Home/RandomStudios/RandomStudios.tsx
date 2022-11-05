import {NavLink} from "react-router-dom";
import {randomNumber} from "../../../utils/randomNumber";
import {StudioType} from 'types';
import './RandomStudios.css';

interface Props {
    studios: StudioType[]
}

export const RandomStudios = ({studios}: Props) => {
    const number = randomNumber(0, (studios?.length - 3))
    const newStudios = studios?.slice(number, number + 3)
    return (
        <div className='random__studios__container'>
            <h4>Wybrane studia:</h4>
            <div className='random__studio__container'>
                {newStudios?.map(studio => (
                    <div
                        key={studio.id}
                        className="random__studio__details__container">
                        <h4> {studio.name}</h4>
                        <img src={`${process.env.REACT_APP_API_URL}/studio/photo/${studio.id}`}
                             alt={`${studio.name} logo`}/>
                        <NavLink to={`../studio/${studio.name}`}>Zobacz więcej</NavLink>
                    </div>
                ))}
            </div>
        </div>
    )
}
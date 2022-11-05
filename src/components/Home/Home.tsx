import {PublisherType} from 'types';

import './Home.css';
import {NavLink} from "react-router-dom";
import {PremiereGameCard} from "../Game/PremiereGameCard/PremiereGameCard";

interface Props {
    publishers: PublisherType[]
}

export const Home = ({publishers}: Props) => {


    return (
        <div className='home__container'>
            <div>
                <h2>Witaj na games world</h2>
                <p>opis tego co się tu znajduje</p>
            </div>
            <div>
                <h4>Wydawcy:</h4>
                {publishers.map(publisher => (
                    <div className='publisher__links__container'>
                        <NavLink
                            key={publisher.id}
                            to={`/publisher/${(publisher.name).toLowerCase()}`}
                        >
                            {publisher.name}
                        </NavLink>
                    </div>
                ))}
            </div>
            <div>
                losowe studia
            </div>
            <div>
                <PremiereGameCard/>
            </div>
        </div>

    )
}
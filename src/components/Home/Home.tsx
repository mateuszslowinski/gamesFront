import {NavLink} from "react-router-dom";
import {PremiereGameCard} from "../Game/PremiereGameCard/PremiereGameCard";
import {IntroductionSection} from "./IntroductionSection/IntroductionSection";
import {PublisherType} from 'types';
import './Home.css';

interface Props {
    publishers: PublisherType[]
}

export const Home = ({publishers}: Props) => {

    return (
        <div className='home__container'>
            <IntroductionSection/>
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
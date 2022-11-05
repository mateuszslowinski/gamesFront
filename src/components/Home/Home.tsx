import {PremiereGameCard} from "../Game/PremiereGameCard/PremiereGameCard";
import {IntroductionSection} from "./IntroductionSection/IntroductionSection";
import {PublisherSection} from "./PublisherSection/PublisherSection";
import {PublisherType} from 'types';
import './Home.css';

interface Props {
    publishers: PublisherType[]
}

export const Home = ({publishers}: Props) => {

    return (
        <div className='home__container'>
            <IntroductionSection/>
            <PublisherSection publishers={publishers}/>
            <div>
                losowe studia
            </div>
            <div>
                <PremiereGameCard/>
            </div>
        </div>

    )
}
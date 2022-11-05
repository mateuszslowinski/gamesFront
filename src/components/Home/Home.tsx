import {PremiereGameCard} from "./PremiereGameCard/PremiereGameCard";
import {IntroductionSection} from "./IntroductionSection/IntroductionSection";
import {PublisherSection} from "./PublisherSection/PublisherSection";
import {RandomStudios} from "./RandomStudios/RandomStudios";
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
            <RandomStudios/>
            <PremiereGameCard/>
        </div>

    )
}
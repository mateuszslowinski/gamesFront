import {motion} from "framer-motion";
import {PremiereGameCard} from "./PremiereGameCard/PremiereGameCard";
import {IntroductionSection} from "./IntroductionSection/IntroductionSection";
import {PublisherSection} from "./PublisherSection/PublisherSection";
import {RandomStudios} from "./RandomStudios/RandomStudios";
import {PublisherType} from 'types';
import {StudioType} from 'types';
import './Home.css';

interface Props {
    publishers: PublisherType[]
    studios: StudioType[]
}

export const Home = ({publishers, studios}: Props) => (
    <motion.div
        initial={{width: 0}}
        animate={{width: "100%"}}
        exit={{x: window.innerWidth, transition: {duration: 0.5}}}
        className='home__container'
    >
        <IntroductionSection/>
        <PublisherSection publishers={publishers}/>
        <RandomStudios studios={studios}/>
        <PremiereGameCard/>
    </motion.div>

)
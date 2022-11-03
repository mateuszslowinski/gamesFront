import {PlatformMain} from "./PlatformMain/PlatformMain";
import { motion } from "framer-motion";
import {PlatformType} from 'types';

import './Platform.css';

interface Props {
    platforms: PlatformType[]
}

export const Platform = ({platforms}: Props) => (
    <motion.div
        className='platforms__container'
        initial={{width: 0}}
        animate={{width: "100%"}}
        exit={{x: window.innerWidth, transition:{duration: 0.5}}}
    >
        <p>Wybierz dowolną platformę by zobaczyć wydane na nią gry w poszczególnych latach.</p>
        <PlatformMain platforms={platforms}/>
    </motion.div>
)

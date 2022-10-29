import { motion } from 'framer-motion';
import './spinner.css';

export const Spinner = () => (
    <motion.div
        className="center"
        initial={{width: 0}}
        animate={{width: "100%"}}
        exit={{x: window.innerWidth, transition:{duration: 0.1}}}
    >
        <div className='spinner'/>
        <span>Wczytywanie danych...</span>
    </motion.div>
)
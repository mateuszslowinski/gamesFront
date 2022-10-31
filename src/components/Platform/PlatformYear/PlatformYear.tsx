import {useState} from "react";
import {NavLink} from "react-router-dom";
import { motion } from "framer-motion";
import {AiOutlineArrowDown} from 'react-icons/ai'
import {GameType} from 'types';

import './PlatformYear.css';
import {convertTime} from "../../../utils/convertTime";

interface Props {
    year: string
    platformGames: GameType[] | null
}

export const PlatformYear = ({year, platformGames}: Props) => {
    const [open, setOpen] = useState<boolean>(false);
    const handleArrowClick = () => {
        setOpen(() => !open)
    }
    return (
        <>
            <div className='years__container' key={year}>
                <h3>{year}</h3>
                <AiOutlineArrowDown
                    onClick={handleArrowClick}
                    style={{transform: open ? "rotate(180deg)" : ''}}
                />
            </div>
            {open ? platformGames?.filter(game => game.releaseDate.toString().slice(0, 4) === year).map(game => (
                <motion.div
                    key={game.id}
                    className='platforms__game__container'
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                >
                    <NavLink to={`../game/${game.name}`}>
                        <h5>{game.name}</h5>
                    </NavLink>
                    <h5>{convertTime(game.releaseDate)}</h5>
                </motion.div>
            )) : null}
        </>
    )
}
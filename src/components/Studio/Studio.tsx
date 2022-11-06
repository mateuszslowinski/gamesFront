import {useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {motion} from "framer-motion";
import {getToken} from "../../hooks/getToken";
import {Button} from "../commons/Button/Button";
import {EditStudio} from "../Admin/Studio/EditStudio/EditStudio";
import {convertTime} from "../../utils/convertTime";
import {StudioType} from 'types';
import {GameType} from 'types';

import './Studio.css';

interface Props {
    studio: StudioType
    games: GameType[]
}

export const Studio = ({studio, games}: Props) => {
    const [openEditForm, setOpenEditForm] = useState(0);
    const navigate = useNavigate();
    const token = getToken();
    const {id, name, description, employees, founded, country} = studio;

    const sortedGamesByDate = (games.sort((a, b) => {
        return new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime()
    }))

    return (
        <motion.div
            className="studio__container"
            initial={{width: 0}}
            animate={{width: "100%"}}
            exit={{x: window.innerWidth, transition: {duration: 0.5}}}
        >
            {openEditForm === 1 && <EditStudio closeModal={() => setOpenEditForm(0)} studio={studio}/>}
            <Button
                text="Wróc na poprzednią stronę"
                onClick={() => navigate(-1)}
            />
            {token && <Button
                text='Edytuj studio'
                onClick={() => setOpenEditForm(1)}
            />
            }
            <img src={`${process.env.REACT_APP_API_URL}/studio/photo/${id}`} alt={`${name} logo`}/>
            <p>{description}</p>
            <div className='studio__details'>
                <span>Liczba pracowników:
                    <p>{employees}</p>
                </span>
                <span>Założone w:
                    <p>{founded}</p>
                </span>
                <span>Kraj:
                    <p>{country}</p>
                </span>
            </div>
            <p>Wydane gry:</p>
            <table>
                <thead>
                <tr>
                    <th>Tytuł</th>
                    <th>Data wydania</th>
                </tr>
                </thead>
                <tbody>
                {sortedGamesByDate.map(game => (
                    <tr key={game.id}>
                        <th><NavLink to={`../game/${game.name}`}>{game.name}</NavLink></th>
                        <th>{convertTime(game.releaseDate)}</th>
                    </tr>
                ))}
                </tbody>
            </table>
        </motion.div>
    )
}
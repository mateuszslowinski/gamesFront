import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useApi} from "../../hooks/useApi";
import {getToken} from "../../hooks/getToken";
import {motion} from "framer-motion";
import {Spinner} from "../commons/Spinner/Spinner";
import {ErrorMessage} from "../commons/Messages/ErrorMessage/ErrorMessage";
import {Button} from "../commons/Button/Button";
import {EditGame} from "../Admin/Game/EditGame/EditGame";
import {convertTime} from "../../utils/convertTime";
import {GameType} from 'types';
import {StudioType} from 'types';

import './Game.css';

interface Props {
    game: GameType;
}

export const Game = ({game}: Props) => {
    const navigate = useNavigate();
    const token = getToken();
    const [openEditForm, setOpenEditForm] = useState(0);
    const {id, name, description, releaseDate, developerId} = game;
    const [studio, loadingStudio, errorStudio] = useApi<StudioType>({
        method: 'get',
        url: `/studio/id/${developerId}`
    }, id)

    if (!studio || errorStudio) return <ErrorMessage text={errorStudio}/>
    return (
        <motion.div
            className='game__page__container'
            initial={{width: 0}}
            animate={{width: "100%"}}
            exit={{x: window.innerWidth, transition: {duration: 0.5}}}
        >
            {openEditForm === 1
                && <EditGame
                    closeModal={() => setOpenEditForm(0)}
                    game={game}
                    token={token}
                />}
            {loadingStudio
                ? <Spinner/>
                : (
                    <>
                        <Button
                            text="Wróc na poprzednią stronę"
                            onClick={() => navigate(-1)}
                        />
                        {token && <Button
                            text='Edytuj grę'
                            onClick={() => setOpenEditForm(1)}
                        />}
                        <h3>{name}</h3>
                        <img
                            src={`${process.env.REACT_APP_API_URL}/game/photo/${id}`}
                            alt={`${name} logo`}
                        />
                        <div className="game__details">
                            <span>Deweloper:
                             <p
                                 className='publisher__navigate'
                                 onClick={() => navigate(`../studio/${studio.id}`)}
                             >
                                 {studio.name}
                             </p>
                            </span>
                            <span>Data wydania:
                                <p>{convertTime(releaseDate)}</p>
                            </span>
                        </div>
                        <div className='game__description'>
                            <p>{description}</p>
                        </div>
                    </>
                )}
        </motion.div>
    )
}
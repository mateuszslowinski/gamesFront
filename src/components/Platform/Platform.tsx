import {useState} from "react";
import {useApi} from "../../hooks/useApi";
import {Spinner} from "../commons/Spinner/Spinner";
import {SelectField} from "../commons/FormFields/SelectField/SelectField";
import {ErrorMessage} from "../commons/Messages/ErrorMessage/ErrorMessage";
import {yearsPlatformData} from "./platform.data";
import {GameType, PlatformType} from 'types';
import './Platform.css';

interface Props {
    platforms: PlatformType[]
}

export const Platform = ({platforms}: Props) => {
    const [firstPlatform, setFirstPlatform] = useState<string>('')
    const [secondPlatform, setSecondPlatform] = useState<string>('')

    const [firstPlatformGames, firstPlatformGamesLoading, firstPlatformGamesError] = useApi<GameType[]>({
        method: 'get',
        url: `/platform/${firstPlatform}/games`
    }, [firstPlatform]);

    const [secondPlatformGames, secondPlatformGamesLoading, secondPlatformGamesError] = useApi<GameType[]>({
        method: 'get',
        url: `/platform/${secondPlatform}/games`
    }, [secondPlatform]);

    const errorsArray = [firstPlatformGamesError, secondPlatformGamesError];
    const loadingsArray = [firstPlatformGamesLoading, secondPlatformGamesLoading];


    errorsArray.map(error => (
        <ErrorMessage text={error}/>
    ))
    return (
        <>
            {loadingsArray.includes(true) ? <Spinner/> : (
                <div className='platforms__container'>
                    <div className='platform__details__container'>
                        <SelectField
                            options={platforms}
                            text='Wybierz pierwsza platformę'
                            onChange={e => setFirstPlatform(e.target.value)}/>

                        {yearsPlatformData.map(year => (
                            <div className='years__container'>
                                <h3>{year}</h3>
                                {firstPlatformGames?.filter(game => game.releaseDate.toString().slice(0, 4) === year).map(game => (
                                    <div>
                                        <h5>{game.name}</h5>
                                        <h5>{game.releaseDate.toString().slice(0,10)}</h5>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                    <div className='platform__details__container'>
                        <SelectField
                            options={platforms}
                            text='Wybierz druga platformę'
                            onChange={e => setSecondPlatform(e.target.value)}/>
                        {yearsPlatformData.map(year => (
                            <div className='years__container'>
                                <h3>{year}</h3>
                                {secondPlatformGames?.filter(game => game.releaseDate.toString().slice(0, 4) === year).map(game => (
                                    <h5>{game.name}</h5>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}
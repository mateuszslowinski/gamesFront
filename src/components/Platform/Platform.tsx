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

    const errorsArray = [ firstPlatformGamesError,  secondPlatformGamesError];
    const loadingsArray = [ firstPlatformGamesLoading, secondPlatformGamesLoading];


    errorsArray.map(error => (
        <ErrorMessage text={error}/>
    ))
    return (
        <div className='platforms__container'>
            {loadingsArray.includes(true) ? <Spinner/> : (
                <>
                    <SelectField
                        options={platforms}
                        text='Wybierz pierwsza platformę'
                        onChange={e => setFirstPlatform(e.target.value)}/>

                    {yearsPlatformData.map(year => (
                        <>
                            <h3>{year}</h3>
                            {firstPlatformGames?.filter(game => game.releaseDate.toString().slice(0, 4) === year).map(game => (
                                <h5>{game.name}</h5>
                            ))}
                        </>
                    ))}

                    {/*<SelectField*/}
                    {/*    options={platforms}*/}
                    {/*    text='Wybierz druga platformę'*/}
                    {/*    onChange={e => setSecondPlatform(e.target.value)}/>*/}
                    {/*<h3>{getSecondPlatform?.name}</h3>*/}
                    {/*{secondPlatformGames?.map(game => (*/}
                    {/*    game.name*/}
                    {/*))}*/}
                </>
            )}
        </div>
    )
}
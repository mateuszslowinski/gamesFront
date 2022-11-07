import {useState} from "react";
import {useApi} from "../../../hooks/useApi";
import {SelectField} from "../../commons/FormFields/SelectField/SelectField";
import {ErrorMessage} from "../../commons/Messages/ErrorMessage/ErrorMessage";
import {Spinner} from "../../commons/Spinner/Spinner";
import {PlatformYear} from "../PlatformYear/PlatformYear";
import {yearsPlatformData} from "../platform.data";
import {GameType, PlatformType} from 'types';

interface Props {
    platforms: PlatformType[]
}

export const PlatformMain = ({platforms}: Props) => {
    const [platform, setPlatform] = useState<string>('start')

    const [platformGames, platformGamesLoading, platformGamesError] = useApi<GameType[]>({
        method: 'get',
        url: `/platform/${platform}/games`
    }, [platform]);

    if (!platform) return <ErrorMessage text={platformGamesError}/>
    return (
        <>
            {
                platformGamesLoading
                    ? <Spinner/>
                    : <div className='platform__details__container'>
                        <SelectField
                            options={platforms}
                            text='Wybierz platformę'
                            onChange={e => setPlatform(e.target.value)}/>
                        {yearsPlatformData.map(year => (
                            <PlatformYear
                                year={year}
                                platformGames={platformGames}
                            />
                        ))}
                    </div>
            }
        </>
    )
}
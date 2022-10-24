import {Platform} from "../../components/Platform/Platform";
import {useApi} from "../../hooks/useApi";
import {Spinner} from "../../components/commons/Spinner/Spinner";
import {ErrorMessage} from "../../components/commons/Messages/ErrorMessage/ErrorMessage";
import {PlatformType} from 'types';

export const PlatformPage = () => {
    const [platforms, platformsLoading, getPlatformsError] = useApi<PlatformType[]>({
        method: 'get',
        url: '/platform'
    });

    if (getPlatformsError) return <ErrorMessage text={getPlatformsError}/>
    return (
        <div className='page__container'>
            {platformsLoading || !platforms ? <Spinner/> : <Platform platforms={platforms}/>}
        </div>
    )
}

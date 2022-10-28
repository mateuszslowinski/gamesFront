import {PlatformMain} from "./PlatformMain/PlatformMain";
import {PlatformType} from 'types';
import './Platform.css';

interface Props {
    platforms: PlatformType[]
}

export const Platform = ({platforms}: Props) => (
    <div className='platforms__container'>
        <p>Wybierz dowolną platformę by zobaczyć wydane na nią gry w poszczególnych latach.</p>
        <PlatformMain platforms={platforms}/>
    </div>
)

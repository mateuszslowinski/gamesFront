import {PlatformMain} from "./PlatformMain/PlatformMain";
import { PlatformType} from 'types';
import './Platform.css';

interface Props {
    platforms: PlatformType[]
}
export const Platform = ({platforms}: Props) => (
    <div className='platforms__container'>
        <PlatformMain platforms={platforms}/>
        <PlatformMain platforms={platforms}/>
    </div>
)

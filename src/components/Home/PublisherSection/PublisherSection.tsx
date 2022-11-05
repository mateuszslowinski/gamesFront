import {NavLink} from "react-router-dom";
import {PublisherType} from 'types';
import './PublisherSection.css';

interface Props {
    publishers: PublisherType[]
}

export const PublisherSection = ({publishers}: Props) => {
    return (
        <div className='publisher__section__container'>
            <h4>Wydawcy:</h4>
            <div className='publisher__links__container'>
                {publishers.map(publisher => (
                    <NavLink
                        key={publisher.id}
                        to={`/publisher/${(publisher.name).toLowerCase()}`}
                    >
                        {publisher.name}
                    </NavLink>
                ))}
            </div>
        </div>
    )
}

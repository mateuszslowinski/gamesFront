import {NavLink} from "react-router-dom"
import {useApi} from "../../../hooks/useApi";
import {Spinner} from "../Spinner/Spinner";
import {ErrorMessage} from "../ErrorMessage/ErrorMessage";
import {PublisherType} from 'types';

import './header.css';
import {getToken} from "../../../hooks/getToken";

export const Header = () => {
    const token = getToken();
    const [publishers, loading, error] = useApi<PublisherType[]>({
        method: 'get',
        url: '/publisher'
    });

    if (error) return <ErrorMessage text={error}/>
    return (
        <>
            {(loading || !publishers) ?
                <Spinner/>
                : <div className='header__container'>
                    <ul>
                        <NavLink to='/'><img src="/gameicon.svg" alt=""/></NavLink>
                        {publishers.map(publisher => (
                            <NavLink key={publisher.id} to={`/publisher/${publisher.id}`}>{publisher.name}</NavLink>
                        ))}
                        {token && <NavLink to='/admin'>Admin</NavLink>}
                    </ul>
                </div>}
        </>
    )
}

import {NavLink} from "react-router-dom"
import './header.css';

export const Header = () => {
    return (
        <div className='header__container'>
            <ul>
                <NavLink to='/'>Strona główna</NavLink>
                <NavLink to='#'>Xbox</NavLink>
                <NavLink to='#'>Playstation</NavLink>
            </ul>
        </div>
    )
}
import {StudioType} from 'types';
import './Studio.css';

interface Props {
    studio: StudioType
}

export const Studio = ({studio}: Props) => {
    const {name, description, image, employees, founded, country} = studio
    return (
        <div className="studio__container">
            <img src={`${image}`} alt={`${name} logo`}/>
            <p>{description}</p>
            <div className='studio__details'>
                <span>Liczba pracowników:
                    <p>{employees}</p>
                </span>
                <span>Założone w:
                    <p>{founded}</p>
                </span>
                <span>Kraj:
                    <p>{country}</p>
                </span>
            </div>
            <p>Wydane gry:</p>
            <table>
                <thead>
                <tr>
                    <th>Rok wydania</th>
                    <th>Tytuł</th>
                    <th>Platforma</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th>2010</th>
                    <td>Jakas nazwa gry dluższa nazwa VI</td>
                    <td>ps3 ps4 ps5</td>
                </tr>
                <tr>
                    <th>2022</th>
                    <td>Nazwa</td>
                    <td>p5</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}
import './Game.css';

export const Game = () => {
    return (
        <div className='game__page__container'>
            <h3>Nazwa gry</h3>
            <img src="" alt="zdj"/>
            <div className="game__details">
                <span>Deweloper:<p>Nazwa studia</p></span>
               <span>Data wydania: <p>Data  </p></span>
            </div>
            <div className='game__description'>
                <p>Opis</p>
            </div>
        </div>
    )
}
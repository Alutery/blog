import React from 'react';
import {Link} from 'react-router-dom';

import logo from '../../images/Logo_Kodland.png';

const Header = () => {
    return (
        <header className="header">
            <div className="container header__container">
                <div className="header__logo">
                    <Link to="/"><img src={logo} alt="logo"/></Link>
                </div>
                <nav className="header__navigation">
                    <Link to="/">Блог</Link>
                </nav>
                <Link to="/add" className="header__button btn">
                    + Добавить статью
                </Link>
            </div>
        </header>
    );
};

export default Header;
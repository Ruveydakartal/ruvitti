import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ROUTES from '../../Consts/Routes';
import style from './Navigation.module.css';

const Navigation = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className={style.container}>
            <div className={style.hamburger} onClick={toggleMenu}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <nav className={`${style.nav} ${menuOpen ? style.active : ''}`}>
                <Link to={ROUTES.home} className={`${style.link} ${location.pathname === ROUTES.home ? style.activeLink : ''}`}>HOME</Link>
                <Link to={ROUTES.infiniteCanvas} className={`${style.link} ${location.pathname === ROUTES.infiniteCanvas ? style.activeLink : ''}`}>INFINITE CANVAS</Link>
                <Link to={ROUTES.about} className={`${style.link} ${location.pathname === ROUTES.about ? style.activeLink : ''}`}>ABOUT ME</Link>
            </nav>
        </div>
    );
};

export default Navigation;

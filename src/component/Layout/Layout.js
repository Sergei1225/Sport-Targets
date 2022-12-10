import s from './Layout.module.scss';
import { Outlet  } from "react-router-dom";
import { NavBar } from '../NavBar/NavBar.js';

export const Layout = () => {

    const active = s.activeLink
    return (
        <>
            <NavBar/>
            <div className="container footerDown">
                <Outlet />
            </div>
            <NavBar/>
        </>
    );
};

import s from "./NavBar.module.scss";

import { dataLinks } from "./dataLinks";

import { GetSvg } from "../../serviceComponents/GetSvg/GetSvg";
import { Burger } from "../../serviceComponents/Burger/Burger";

import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import { useState } from "react";

export const NavBar = () => {
    const [activeBurger, setBurger] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const param = useParams();

    const createLinks = (data) => {
        if (!data) return null;
        return data.map((item) => {
            const active = location.pathname === item.to;
            const menu = activeBurger ? s.navBar__menu : "bFlexColumnCenter";
            const text = active || activeBurger ? s.navBar__text_active : "";
            return (
                <div key={item.id} className={`${s.navBar__item} ${active && s.navBar__item_active} ${menu}`}>
                    <Link to={item.to}>
                        <div className="bSizeIconBig bTransition">
                            <GetSvg nameSvg={item.nameSvg} />
                        </div>
                    </Link>
                    <div className={`${s.navBar__text} ${text} bTransition`}>{item.inner}</div>
                </div>
            );
        });
    };

    const links = !activeBurger ? createLinks(dataLinks) : null;
    const linksMenu = activeBurger ? createLinks(dataLinks) : null;

    const backButton = () => {
        console.log(location.pathname);
        if (location.pathname === "/") return false;
        else if (location.pathname === "/test") return false;
        else if (Object.keys(param).length !== 0) return false;
        else return true;
    };

    const btnBack = backButton() ? `${s.navBar__back} ${s.navBar__back_active}` : [s.navBar__back];
    const menu = activeBurger ? s.navBar__list_active : `${s.navBar__list_active} ${s.navBar__list}`;

    return (
        <header className={`${s.navBar} `}>
            <div className={`${s.navBar__containerBack} `}>
                <div onClick={() => navigate(-1)} className={`${btnBack}  bFlexColumnCenter bTransition`}>
                    <div className="bSizeIconSmall ">
                        <GetSvg nameSvg={"backBtn"} />
                    </div>
                </div>
                <div className={`${s.navBar__wrapper} ${"bElement"} ${"bFlexJC"} bContent`}>{links}</div>
                <div
                    className={`${!activeBurger && s.navBar__burgerMenu} ${
                        activeBurger && s.navBar__burgerMenu_active
                    }`}
                    onClick={() => setBurger((activeBurger) => !activeBurger)}
                >
                    <Burger active={activeBurger} />
                </div>
            </div>
            <div className={`${menu} `}>{linksMenu}</div>
            <div
                onClick={() => setBurger((activeBurger) => !activeBurger)}
                className={`${s.navBar__overlay} ${!activeBurger && s.navBar__overlay_active}`}
            ></div>
        </header>
    );
};

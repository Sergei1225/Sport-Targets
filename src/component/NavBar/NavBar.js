import s from "./NavBar.module.scss";

import { GetSvg } from "../../serviceComponents/GetSvg/GetSvg";
import { Burger } from "../../serviceComponents/Burger/Burger";

import { useLocation, useNavigate, useParams, Link } from "react-router-dom";

export const NavBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const param = useParams();

    const dataLink = [
        { to: "/", inner: "Trenings", id: "23GHSjshfg5&75s688GGH7dsf", nameSvg: "run" },
        { to: "/editorTrening", inner: "Create trening", id: "yhGHSjshfg5&75s688GGH7dsf", nameSvg: "dumbbell" },
        { to: "/chooseExercise", inner: "Choose exersice", id: "02223Sjshfg5&7Kldfl7dsf", nameSvg: "locker" },
        { to: "/createTarget", inner: "Target", id: "kldso89895s688GGH7dsf", nameSvg: "timer" },
    ];

    const createLinks = (data) => {
        if (!data) return null;
        return data.map((item) => {
            const active = location.pathname === item.to;
            return (
                <div
                    key={item.id}
                    className={`${s.navBar__item} ${active && s.navBar__item_active}  bFlexColumnCenter`}
                >
                    <Link to={item.to}>
                        <div className="bSizeIconBig bTransition">
                            <GetSvg nameSvg={item.nameSvg} />
                        </div>
                    </Link>
                    <div className={`${s.navBar__text} ${active && s.navBar__text_active} bTransition`}>
                        {item.inner}
                    </div>
                </div>
            );
        });
    };

    const links = createLinks(dataLink);

    const backButton = () => {
        console.log(location.pathname);
        if (location.pathname === "/") return false;
        else if (location.pathname === "/test") return false;
        else if (Object.keys(param).length !== 0) return false;
        else return true;
    };

    const btnBack = backButton() ? [s.navBar__back, s.navBar__back_active] : [s.navBar__back];

    return (
        <>
        <header className={`${s.navBar} `}>
            <div className="container">
                <div className={`${s.navBar__containerBack} `}>
                    <div onClick={() => navigate(-1)} className={`${btnBack.join(" ")}  bFlexColumnCenter bTransition`}>
                        <div className="bSizeIconSmall ">
                            <GetSvg nameSvg={"backBtn"} />
                        </div>
                    </div>
                </div>
                <div className={`${s.navBar__wrapper} ${"bElement"} ${"bFlexJC"} bContent`}>{links}</div>
            </div>
            
        </header>
        <div className="container">
            <div style={{height: '70px'}}>
            <Burger/>
            </div>
            
        </div>
        
        </>
    );
};

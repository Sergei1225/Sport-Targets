import s from "./NavBar.module.scss";

import { CustomLink } from "../BaseComponents/CustomLink/CustomLink";
import { useLocation, useNavigate } from "react-router-dom";
import { useMemo } from "react";

export const NavBar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const dataLink = useMemo(() => {
        return [
            { to: "/", inner: "First page", id: "yhGHSjshfg5&75s688GGH7dsf" },
            { to: "/two", inner: "Second page", id: "kldso8*895s688GGH7dsf" },
            { to: "/three", inner: "Third page", id: "02223Sjshfg5&7Kldfl7dsf" },
        ];
    }, []);

    const createLinks = (data) => {
        return data.map((item) => {
            return (
                <CustomLink key={item.id} to={item.to}>
                    {item.inner}
                </CustomLink>
            );
        });
    };

    const links = useMemo(() => {
        return createLinks(dataLink);
    }, [dataLink]);

    //console.log("рендер NavBar");
    ///console.log(location);
    return (
        <header className={`${s.navBar} `}>
            <div className="container">
                <div className={`${s.navBar__wrapper} `}>
                    {(location.pathname !== "/" && location.pathname !== "/test") ? (
                        <div
                            onClick={() => navigate(-1)}
                            className={`${s.navBar__back} ${"baseFlexCenter"}`}
                        >
                            Previous page
                        </div>
                    ) : (
                        <div className={`${s.navBar__back}  ${"baseFlexCenter"} `}></div>
                    )}

                    <div className={`${s.navBar__links} ${"basePositionBlock"} ${"baseFlexGap"}`}>
                        {links}
                    </div>
                </div>
            </div>
        </header>
    );
};

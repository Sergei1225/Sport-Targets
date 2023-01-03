import s from "./NavBar.module.scss";

import { GetSvg } from "../../serviceComponents/GetSvg/GetSvg";

import { CustomLink } from "../BaseComponents/CustomLink/CustomLink";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMemo } from "react";

export const NavBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const param = useParams();

    const dataLink = useMemo(() => {
        return [
            { to: "/", inner: "Trenings", id: "23GHSjshfg5&75s688GGH7dsf" },
            { to: "/editorTrening", inner: "Create trening", id: "yhGHSjshfg5&75s688GGH7dsf" },
            { to: "/chooseExercise", inner: "Choose exersice", id: "02223Sjshfg5&7Kldfl7dsf" },
            { to: "/createTarget", inner: "Target", id: "kldso89895s688GGH7dsf" },
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

    const backButton = () => {
        console.log(location.pathname);
        if (location.pathname === "/") return false;
        else if (location.pathname === "/test") return false;
        else if (Object.keys(param).length !== 0) return false;
        else return true;
    };

    console.log(backButton());
    return (
        <header className={`${s.navBar} `}>
            <div className="container">
                <div className={`${s.navBar__wrapper} `}>
                    {backButton() ? (
                        <div
                            onClick={() => navigate(-1)}
                            className={`${s.navBar__back} ${"baseFlexCenter"}`}
                        >
                            <GetSvg nameSvg={"backBtn"} />
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

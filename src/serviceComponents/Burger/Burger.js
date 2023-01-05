import s from "./Burger.module.scss";

export const Burger = ({changeValue, active}) => {

    return (
        <div className={`${s.burger}`}>
            <div className={`${s.burger__wrapper} `}>
                <div className={`${s.burger__one} ${active && s.burger__one_active}`}></div>
                <div className={`${s.burger__two} ${active && s.burger__two_active}`}></div>
                <div className={`${s.burger__three} ${active && s.burger__three_active}`}></div>
            </div>
        </div>
    );
};


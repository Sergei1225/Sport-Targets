import s from "./hintComponent.module.scss";

export const HintComponent = ({ styleTiangle, styleText, styleContent, inner, top= "-12", left="-95", children }) => {
    if(!inner) inner = 'hint'
    return (
        <div className={`${s.hint}`}>
            {children}
            <div style={{ top: `${top}px`, left: `${left}px` }} className={`${s.hint__content} ${styleContent}`}>
                <div className={`${s.hint__text} ${styleText}`}>{inner}</div>
                <div className={`${s.hint__triangle} ${styleTiangle}`}></div>
            </div>
        </div>
    );
};

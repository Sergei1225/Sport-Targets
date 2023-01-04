import s from "./BaseHeader.module.scss";
import { memo } from "react";

export const BaseHeader = memo((props) => {
    let { srcImg, text } = props;

    if (!srcImg)
        srcImg =
            "https://molotfitness.ru/wp-content/uploads/2019/04/FF_%D0%9C_%D1%81%D0%B0%D0%B9%D1%82_01_03-01-750x550.jpg";
    if (!text) text = "create new trening";

    return (
        <div className={`${s.baseHeader} bBlock`}>
            <div className={`${s.baseHeader__title} ${"bElement bTitleBig bTextShadow "}`}>
                {text.toUpperCase()}
            </div>
            <div className={`${s.baseHeader__img} `}>
                <img className="bImgCover bBorderRadius" src={srcImg} alt="headerImage" />
            </div>
        </div>
    );
});

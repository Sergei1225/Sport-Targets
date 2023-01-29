import s from "./SpinnerComp.module.scss";

import { Spinner } from "../Spinner/Spinner";

export const SpinnerComp = ({
    width,
    heigth,
    size = "small",
    sizeWrapper = "small",
    text = "Loading...",
    styleSpinner,
    styleText
}) => {
    if (size === "small") {
        width = 100;
        heigth = 100;
    }
    if (size === "middle") {
        width = 200;
        heigth = 200;
    }
    if (sizeWrapper === "small") {
        sizeWrapper = s.spinnerComp__small;
    }
    if (sizeWrapper === "middle") {
        sizeWrapper = s.spinnerComp__middle;
    }

    return (
        <div className={`${s.spinnerComp} bElement`}>
            <div className={`${s.spinnerComp__wrapper} ${sizeWrapper}   bFlexCenter`}>
                <div
                    className={`${s.spinnerComp__size} ${styleSpinner}`}
                    style={{ width: `${width}px`, height: `${heigth}px` }}
                >
                    <Spinner />
                </div>
                <div className={`${s.spinnerComp__text} ${styleText} bTitleSmall bBold`}>{text}</div>
            </div>
        </div>
    );
};

import s from "./ViewAddRepeats.module.scss";

import { ComponentSwitch } from "../../serviceComponents/ComponentSwitch/ComponentSwitch";
import { CustomRange } from "../../component/BaseComponents/CustomComponents";

import { GetSvg } from "../../serviceComponents/GetSvg/GetSvg";

export const ViewAddRepeats = (props) => {
    const { title, valueHandler, imgSrc, valueError, arrValues, nameSvg, subtile } = props;
    return (
        <div className={`${s.viewAddRepeats}`}>
            <div className={`${s.viewAddRepeats__wrapper}`}>
                <div className={` ${s.viewAddRepeats__header} bElement bFlex `}>
                    <div className={` ${s.viewAddRepeats__range} `}>
                        <CustomRange
                            subtile={subtile}
                            nameSvg={nameSvg}
                            title={title}
                            getValue={valueHandler}
                            styleRange={s.viewAddRepeats__range_inner}
                        />
                        {arrValues ? arrValues : null}
                    </div>
                    <div className={` ${s.viewAddRepeats__img} `}>
                        <img className={`bImgCover bBorderDifferent bBoxShadowMini`} src={imgSrc} alt="imgList" />
                    </div>
                </div>
                <div className="bFlex bAlignItems">
                    {valueError ? (
                        <div className="bSizeIconBig bAnimationShow bElement">
                            <GetSvg nameSvg={"warning"} />
                        </div>
                    ) : null}
                    <ComponentSwitch
                        logicValue={valueError}
                        styleDiv={""}
                        styleActive={"bError bElement "}
                        innerValueTrue={valueError ? valueError.toUpperCase() : valueError}
                        innerValueFalse={""}
                    />
                </div>
            </div>
        </div>
    );
};

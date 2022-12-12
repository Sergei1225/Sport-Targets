import s from './ViewAddRepeats.module.scss';

import { ComponentSwitch } from "../../serviceComponents/ComponentSwitch/ComponentSwitch";
import { ViewAddTrening } from "../ViewAddTrening/ViewAddTrening";

export const ViewAddRepeats = (props) => {
    const { title, valueHandler, imgSrc, valueError, arrValues, itemsValue } = props;
    return (
        <div className={`${""}`}>
            <div className={` ${s.viewAddRepeats__header} baseFlex`}>
                <div className={` ${s.viewAddRepeats__title} `}>
                    <div className={` ${"baseFontTitleSmall"} basePositionElementNoMT`}>
                        {title}
                    </div>
                    <ViewAddTrening getValue={valueHandler} />
                </div>
                <div className={` ${s.viewAddRepeats__img} `}>
                    <div className={`${s.viewAddRepeats__img_inner} basePositionElementNoMT`}>
                        <img className={`baseImgCover`} src={imgSrc} alt="imgList" />
                    </div>
                </div>
            </div>
            <ComponentSwitch
                logicValue={valueError}
                styleDiv={""}
                styleActive={"basePositionElement baseError"}
                innerValueTrue={valueError}
                innerValueFalse={""}
            />
            <div className={` ${"basePositionBlock baseFontContentBold"}`}>
                Approaches: {itemsValue.length}
            </div>
            {arrValues ? arrValues : null}
        </div>
    );
};

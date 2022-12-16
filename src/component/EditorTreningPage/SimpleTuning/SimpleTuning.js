import s from './SimpleTuning.module.scss';
import cross from "../../../img/ItemListCreateTrening/icon/can.png";

import { AddTrening } from "../AddTrening/AddTrening";
import { ComponentSwitch } from "../../../serviceComponents/ComponentSwitch/ComponentSwitch";

import { useState } from "react";

export const SimpleTuning = (props) => {
    const { title, id, deleteItem, imgSrc, saveItem, order} = props;

    const [valueError, setValueError] = useState(null);

    const getValue = (value) => {
        if (value === 0) {
            setValueError("Error: not value");
            setTimeout(() => setValueError(""), 3000);
        } else {
            const newItem = { id, fullTime: value }
            saveItem(newItem)
        }
    };

    return (
        <div className={` ${"basePositionBlock"}`}>
            <div className={`${s.itemList__editor} baseFlexGapSB`}>
                {
                    order ? 
                    <div className={`${s.itemList__editor} basePositionElementNoMT baseFontContentBold`}>
                         EDITING ITEM                               
                    </div>
                    :
                    null
                }
                <div onClick={() => deleteItem(id)}>
                    <img src={cross} alt="cross" />
                </div>
            </div>
            <div className={` ${s.simpleTuning__header} baseFlex`}>
                <div className={` ${s.simpleTuning__title} `}>
                    <div className={` ${"baseFontTitleSmall"} basePositionElementNoMT`}>
                        {title}
                    </div>
                    <AddTrening
                        title={"Time"}
                        btn={"Save exersice"}
                        metering={"min"}
                        getValue={getValue}
                        max={200}
                        />
                </div>
                <div className={` ${s.simpleTuning__img} `}>
                    <div className={`${s.simpleTuning__img_inner} basePositionElementNoMT`}>
                        <img className={`baseImgCover`} src={[imgSrc]} alt="imgList" />
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
        </div>
    );
};

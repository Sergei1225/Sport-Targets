import s from "./viewAddWeights.module.scss";

import { ComponentSwitch } from "../../serviceComponents/ComponentSwitch/ComponentSwitch";
import { ViewAddTrening } from "../ViewAddTrening/ViewAddTrening";
import { CustomButton } from "../../component/BaseComponents/CustomButton/CustomButton";
import { CustomRange } from "../../component/BaseComponents/CustomComponents";

export const ViewAddWeights = (props) => {
    const { itemsValue, arrValues, funkChangeState, valueError, valueHandler } = props;
    return (
        <div className={` ${itemsValue ? " baseActiveVisible " : " baseHiddenVisible  "}  `}>
            <div className={` ${s.viewAddWeigth__range} `}>
                <CustomRange title={'Weights'} getValue={valueHandler} styleRange={s.viewAddWeigth__inner} />
            </div>
            {/* <ViewAddTrening title={"Weight"} max={300} getValue={valueHandler} /> */}
            <ComponentSwitch
                logicValue={valueError}
                styleDiv={""}
                styleActive={"basePositionElement baseError"}
                innerValueTrue={valueError}
                innerValueFalse={""}
            />
            {arrValues ? arrValues : null}
            <CustomButton
                funk={() => funkChangeState(null)}
                innerValue={"Delete weights"}
            />
        </div>
    );
};
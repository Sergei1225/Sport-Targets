import { ComponentSwitch } from "../../serviceComponents/ComponentSwitch/ComponentSwitch";
import { ViewAddTrening } from "../ViewAddTrening/ViewAddTrening";
import { CustomButton } from "../../component/BaseComponents/CustomButton/CustomButton";

export const ViewAddWeights = (props) => {
    const { itemsValue, arrValues, funkChangeState, valueError, valueHandler } = props;
    return (
        <div className={` ${itemsValue ? " baseActiveVisible " : " baseHiddenVisible  "}  `}>
            <div className={` ${"basePositionBlock baseFontContentBold"}`}>Weights</div>
            <ViewAddTrening title={"Weight"} max={300} getValue={valueHandler} />
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
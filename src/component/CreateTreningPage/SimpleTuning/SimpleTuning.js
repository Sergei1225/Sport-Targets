import cross from "../../../img/ItemListCreateTrening/icon/can.png";

import { AddTrening } from "../AddTrening/AddTrening";
import { ComponentSwitch } from "../../../serviceComponents/ComponentSwitch/ComponentSwitch";

import { useState } from "react";

export const SimpleTuning = (props) => {
    const { title, id, deleteItem} = props;

    const [valueError, setValueError] = useState(null);

    const getValue = (value) => {
        if (value === 0) {
            setValueError("Error: not value");
            setTimeout(() => setValueError(""), 3000);
        } else {
            console.log(value);
        }
    };

    return (
        <div className={` ${"basePositionBlock"}`}>
            <div onClick={() => deleteItem(id)}>
                <img src={cross} alt="cross" />
            </div>
            <div className={` ${"baseFontTitleSmall"} basePositionElement`}>{title}</div>
            <AddTrening
                title={"Time"}
                btn={"Save exersice"}
                metering={"min"}
                getValue={getValue}
                max={200}
            />
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

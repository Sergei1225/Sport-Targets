import s from "./TuningTrening.module.scss";
import cross from "../../../img/ItemListCreateTrening/icon/can.png";

import { useCallback, useState } from "react";
import { randomId } from "../../../service/RandomId";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { ComponentSwitch } from "../../../serviceComponents/ComponentSwitch/ComponentSwitch";
import { AddTrening } from "../AddTrening/AddTrening";
import { CustomButton } from "../../BaseComponents/CustomComponents";

const dataRepeat = [
    { value: 20, id: "GdsjjstGYuisda64%7722j" },
    { value: 100, id: "Jjdsu768sda64%7722j" },
    { value: 27, id: "poHkds77n3nmkdfisda64%7722j" },
];

export const TuningTrening = (props) => {
    const { title, id, saveItem, imgSrc, deleteItem } = props;
    const [itemsValue, setItemsValue] = useState(dataRepeat);
    const [valueError, setValueError] = useState(null);

    const addItem = useCallback(
        (value) => {
            if (itemsValue.length > 15) {
                setValueError("Error: soo much elements");
                setTimeout(() => setValueError(""), 3000);
                return;
            } else if (!value) {
                setValueError("Error: not value");
                setTimeout(() => setValueError(""), 3000);
                return;
            } else {
                const newItem = { value, id: randomId() };
                setItemsValue((itemsValue) => [...itemsValue, newItem]);
            }
        },
        [itemsValue]
    );

    const deleteItemRepeat = (idItem) => {
        setItemsValue((itemsValue) => itemsValue.filter(({ id }) => id !== idItem));
    };

    const createItems = (data) => {
        if (!data || data.length < 1) return null;
        const items = data.map(({ value, id }) => {
            return (
                <CSSTransition key={id} timeout={500} classNames="baseTransition">
                    <div
                        onClick={() => deleteItemRepeat(id)}
                        key={id}
                        className={`${"basePositionElement"}`}
                    >
                        {value}
                    </div>
                </CSSTransition>
            );
        });
        return (
            <TransitionGroup
                className={`${s.tuning__items} ${"basePositionBlock baseFlexGapNoJC"}`}
            >
                {items}
            </TransitionGroup>
        );
    };

    const itemsView = createItems(itemsValue);

    //console.log(itemsView);

    return (
        <div className={`${s.tuning} ${"basePositionBlock"}`}>
            <div onClick={() => deleteItem(id)}>
                <img src={cross} alt="cross" />
            </div>
            <div className={` ${"baseFontTitleSmall"} basePositionElement`}>{title}</div>
            <AddTrening getValue={addItem} imgSrc={imgSrc}/>
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
            {itemsView ? (
                itemsView
            ) : (
                <div className={` ${"basePositionBlock baseFlexGapNoJC"}`}>No data</div>
            )}
            <CustomButton
                //active={}
                funk={() => saveItem()}
                innerValue={"Save exersice"}
            />
        </div>
    );
};

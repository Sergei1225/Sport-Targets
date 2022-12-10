import s from "./TuningTrening.module.scss";
import cross from "../../../img/ItemListCreateTrening/icon/can.png";

import { useCallback, useState } from "react";
import { randomId } from "../../../service/RandomId";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { ComponentSwitch } from "../../../serviceComponents/ComponentSwitch/ComponentSwitch";
import { AddTrening } from "../AddTrening/AddTrening";
import { CustomButton } from "../../BaseComponents/CustomComponents";

export const TuningTrening = (props) => {
    const { title, id, saveItem, imgSrc, deleteItem } = props;
    const [itemsValue, setItemsValue] = useState([]);
    const [itemsWeight, setItemsWeight] = useState(null);
    const [valueErrorRepeat, setValueErrorRepeat] = useState(null);
    const [valueErrorWeigth, setValueError] = useState(null);

    const addItemRepeat = useCallback(
        (value) => {
            if (itemsValue.length > 15) {
                setValueErrorRepeat("Error: soo much elements");
                setTimeout(() => setValueErrorRepeat(""), 3000);
                return;
            } else if (!value) {
                setValueErrorRepeat("Error: not value");
                setTimeout(() => setValueErrorRepeat(""), 3000);
                return;
            } else {
                const newItem = { value, id: randomId() };
                setItemsValue((itemsValue) => [...itemsValue, newItem]);
            }
        },
        [itemsValue]
    );

    const addItemWeight = (value) => {
        if (itemsWeight.length > 15) {
            setValueError("Error: soo much elements");
            setTimeout(() => setValueError(""), 3000);
            return;
        } else if (!value) {
            setValueError("Error: not value");
            setTimeout(() => setValueError(""), 3000);
            return;
        } else {
            const newItem = { value, id: randomId() };
            setItemsWeight((itemsValue) => [...itemsValue, newItem]);
        }
    };

    const deleteItemRepeat = (idItem) => {
        setItemsValue((itemsValue) => itemsValue.filter(({ id }) => id !== idItem));
    };

    const deleteItemWeights = (idItem) => {
        setItemsWeight((itemsValue) => itemsValue.filter(({ id }) => id !== idItem));
    };

    const createItems = (data, deleteFunc) => {
        if (!data || data.length === 0) return null;
        const items = data.map(({ value, id }) => {
            return (
                <CSSTransition key={id} timeout={500} classNames="baseTransition">
                    <div
                        onClick={() => deleteFunc && deleteFunc(id)}
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

    const savingItem = () => ({
        id: id,
        repeats: itemsValue.map((item) => item.value),
        weight: itemsWeight ? itemsWeight.map((item) => item.value) : [],
    });

    const itemsView = createItems(itemsValue, deleteItemRepeat);
    const itemsViewWeigth = createItems(itemsWeight, deleteItemWeights);

    //console.log(itemsView);

    return (
        <div className={`${s.tuning} ${"basePositionBlock"}`}>
            <div onClick={() => deleteItem(id)}>
                <img src={cross} alt="cross" />
            </div>
            <div className={` ${"baseFontTitleSmall"} basePositionElement`}>{title}</div>
            <AddTrening getValue={addItemRepeat} imgSrc={imgSrc} />
            <ComponentSwitch
                logicValue={valueErrorRepeat}
                styleDiv={""}
                styleActive={"basePositionElement baseError"}
                innerValueTrue={valueErrorRepeat}
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
            <div className={` ${!itemsWeight ? "baseActiveVisible" : "baseHiddenVisible "}`}>
                <CustomButton
                    funk={() => setItemsWeight([])}
                    innerValue={"Add weights"}
                />
            </div>
            <div className={` ${itemsWeight ? "baseActiveVisible" : "baseHiddenVisible "}`}>
                <div className={` ${"basePositionBlock baseFontContentBold"}`}>Weights</div>
                <AddTrening title={"Weight"} max={300} getValue={addItemWeight} imgSrc={imgSrc} />
                <ComponentSwitch
                    logicValue={valueErrorWeigth}
                    styleDiv={""}
                    styleActive={"basePositionElement baseError"}
                    innerValueTrue={valueErrorWeigth}
                    innerValueFalse={""}
                />
                {itemsViewWeigth ? (
                    itemsViewWeigth
                ) : (
                    <div className={` ${"basePositionBlock baseFlexGapNoJC"}`}>No data</div>
                )}
                <CustomButton
                    //active={}
                    funk={() => saveItem && saveItem(savingItem())}
                    innerValue={"Save exersice"}
                />
                <CustomButton
                    //active={}
                    funk={() => setItemsWeight(null)}
                    innerValue={"Delete weights"}
                />
            </div>
        </div>
    );
};

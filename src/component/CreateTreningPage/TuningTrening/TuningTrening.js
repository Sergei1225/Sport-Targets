import s from "./TuningTrening.module.scss";
import cross from "../../../img/ItemListCreateTrening/icon/can.png";

import { useState } from "react";
import { randomId } from "../../../service/RandomId";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { CustomButton } from "../../BaseComponents/CustomComponents";
import { ViewAddWeights } from "../../../View/ViewAddWeights/ViewAddWeights";
import { ViewAddRepeats } from "../../../View/ViewAddRepeats/ViewAddRepeats";

export const TuningTrening = (props) => {
    const { title, id, saveItem, imgSrc, deleteItem } = props;
    const [itemsValue, setItemsValue] = useState([]);
    const [itemsWeight, setItemsWeight] = useState(null);
    const [valueErrorRepeat, setValueErrorRepeat] = useState(null);
    const [valueErrorWeigth, setValueErrorWeigth] = useState(null);

    const errorsStates = {
        weightsSetting: "the number of weights weights cannot exceed the number of approaches",
        moreElement: "soo much elements",
        notValue: "not value",
    };

    const controlError = (funkError, errorValue) => {
        funkError(`Error: ${errorValue}`);
        setTimeout(() => funkError(""), 3000);
    };

    const addItem = (valueState, valueStateFunc, funcError, value) => {
        if (valueState.length >= 10) {
            controlError(funcError, errorsStates.moreElement);
            return;
        } else if (!value) {
            controlError(funcError, errorsStates.notValue);
            return;
        } else {
            const newItem = { value, id: randomId() };
            valueStateFunc((valueState) => [...valueState, newItem]);
        }
    };

    const settingAddItemWeigth = (value) => {
        if (itemsWeight.length === itemsValue.length) {
            controlError(setValueErrorWeigth, errorsStates.weightsSetting);
        } else {
            addItem(itemsWeight, setItemsWeight, setValueErrorWeigth, value);
        }
    };

    const settingAddItemValue = (value) => {
        addItem(itemsValue, setItemsValue, setValueErrorRepeat, value);
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
            <ViewAddRepeats
                title={title}
                valueHandler={settingAddItemValue}
                imgSrc={[imgSrc]}
                valueError={valueErrorRepeat}
                arrValues={itemsView}
                itemsValue={itemsValue}
            />
            <div className={` ${!itemsWeight ? "baseActiveVisible" : "baseHiddenVisible "}`}>
                <CustomButton funk={() => setItemsWeight([])} innerValue={"Add weights"} />
            </div>
            <ViewAddWeights
                itemsValue={itemsWeight}
                arrValues={itemsViewWeigth}
                funkChangeState={setItemsWeight}
                valueError={valueErrorWeigth}
                valueHandler={settingAddItemWeigth}
            />
            <CustomButton
                //active={}
                funk={() => saveItem(savingItem())}
                innerValue={"Save exersice"}
            />
        </div>
    );
};

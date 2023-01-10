import s from "./TuningTrening.module.scss";

import { randomId } from "../../../service/RandomId";

import { CBtnStyled } from "../../BaseComponents/CustomComponents";
import { ViewAddRepeats } from "../../../View/ViewAddRepeats/ViewAddRepeats";
import { GetSvg } from "../../../serviceComponents/GetSvg/GetSvg";
import { ComponentSwitch } from "../../../serviceComponents/ComponentSwitch/ComponentSwitch";

import { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

export const TuningTrening = (props) => {
    const { title, id, saveItem, imgSrc, deleteItem, order } = props;
    const [itemsValue, setItemsValue] = useState([]);
    const [itemsWeight, setItemsWeight] = useState([]);
    const [addWeight, setAddWeight] = useState(false);
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
    const controlWeigth = () => {
        setAddWeight((addWeight) => !addWeight);
        if (addWeight) setItemsWeight([]);
    };

    const createItems = (data, deleteFunc) => {
        if (!data || data.length === 0) return null;
        const items = data.map(({ value, id }) => {
            return (
                <CSSTransition key={id} timeout={500} classNames="baseTransition">
                    <div onClick={() => deleteFunc && deleteFunc(id)} key={id} className={`${s.tuning__item} `}>
                        {value}
                    </div>
                </CSSTransition>
            );
        });
        return <TransitionGroup className={`${s.tuning__items} ${" bFlex bFlexWrap"}`}>{items}</TransitionGroup>;
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
        <div className={`${s.tuning} ${" bBlock"}`}>
            <div className={`${s.tuning} ${"bElement bWrapperStyle"}`}>
                <div className={`${s.tuning__header}  `}>
                    {order ? (
                        <div className={`${s.tuning__editor} bElement bContentBig bBold`}>EDITING ITEM</div>
                    ) : null}
                    <div className={`${s.tuning__delete} bElement bSizeIconSmall`} onClick={() => deleteItem(id)}>
                        <GetSvg nameSvg={"bucket"} />
                    </div>
                </div>
                <ViewAddRepeats
                    title={title}
                    valueHandler={settingAddItemValue}
                    imgSrc={imgSrc[0]}
                    valueError={valueErrorRepeat}
                    arrValues={itemsView}
                    subtile={"Lorem ipsum dolor sit amet "}
                    nameSvg={"gantelSquare"}
                />
                <div className="bElement bPaddingTop0">
                    <ComponentSwitch
                        logicValue={addWeight}
                        styleDiv={"bBtn bInlineBlock "}
                        styleActive={"bBtn bBtnActive bInlineBlock"}
                        innerValueTrue={"Delete weights"}
                        innerValueFalse={"Add weights"}
                        funcClick={controlWeigth}
                    />
                </div>
                <div className={`${s.tuning__weigth} ${addWeight && s.tuning__weigth_active}`}>
                    <ViewAddRepeats
                        title={"Weights"}
                        valueHandler={settingAddItemWeigth}
                        imgSrc={
                            "https://ligasporta.com.ua/upload/medialibrary/025/025f73ec6ead4743d1bbf24dbde34eba.png"
                        }
                        valueError={valueErrorWeigth}
                        arrValues={itemsViewWeigth}
                        itemsValue={itemsWeight}
                        nameSvg={"locker"}
                        subtile={"Lorem ipsum dolor sit amet "}
                    />
                </div>
                <div className="bElement bPaddingTop0">
                    <CBtnStyled funk={() => saveItem(savingItem())} innerValue={"Save exersice"} />
                </div>
            </div>
        </div>
    );
};

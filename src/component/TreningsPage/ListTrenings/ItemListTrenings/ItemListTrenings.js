import s from "./ItemListTrenings.module.scss";

import { paint, cross, list, star } from "../../../../img/srcIcons";

import { CustomButton } from "../../../BaseComponents/CustomComponents";
import { ComponentSwitch } from "../../../../serviceComponents/ComponentSwitch/ComponentSwitch";

export const ItemListTrenings = (props) => {
    const {
        name,
        id,
        date,
        listExersises,
        favorite,
        changeProp,
        forDelete,
        deleteItem,
        status,
        changeStatus,
        addToDelete,
    } = props;

    const lineExercise = listExersises.map((item) => item.name).join(", ");
    const styleMark = favorite ? "baseMark" : "";
    const styleDelete = forDelete ? "baseForDelete" : "";

    return (
        <div key={id} className={`${s.itemTrenings} bElement`}>
            <div
                className={`${s.itemTrenings__wrapper} ${styleMark} ${styleDelete} bFlex bElement bWrapperStyleElem bBoxShadowMini bTransition`}
            >
                <div className={`${s.itemTrenings__date} bContentBig bBold `}>
                    {date} <br />
                    Status:
                    <ComponentSwitch
                        logicValue={status === "future"}
                        styleDiv={"bInlineBlock bPaddingLeft"}
                        styleActive={"bInlineBlock bPaddingLeft"}
                        innerValueTrue={"FUTURE"}
                        innerValueFalse={"PAST"}
                    />
                </div>
                <div className={`${s.itemTrenings__name} bContentBig bBold`}>
                    {name.toUpperCase()}
                </div>
                <div className={`${s.itemTrenings__exercise} bContent`}>
                    {lineExercise}
                    {/* <div>
                        <CustomButton
                            //funk={}
                            innerValue={"DETAIL"}
                        />
                    </div> */}
                </div>
                <div className={`${s.itemTrenings__func} bFlex bFlexJC `}>
                    <div
                        onClick={() => addToDelete(id, forDelete)}
                        className={`${s.itemTrenings__favorites} bSizeIconSmall`}
                    >
                        <img className={`bImgCover`} src={list} alt="imgFunction" />
                    </div>
                    <div
                        onClick={() => changeStatus(id, status)}
                        className={`${s.itemTrenings__favorites} bSizeIconSmall`}
                    >
                        <img className={`bImgCover`} src={paint} alt="imgFunction" />
                    </div>
                    <div
                        onClick={() => changeProp(id, favorite)}
                        className={`${s.itemTrenings__favorites} bSizeIconSmall`}
                    >
                        <img className={`bImgCover`} src={star} alt="imgFunction" />
                    </div>
                    <div
                        onClick={() => deleteItem(id)}
                        className={`${s.itemTrenings__favorites} bSizeIconSmall`}
                    >
                        <img className={`bImgCover`} src={cross} alt="imgFunction" />
                    </div>
                </div>
            </div>
        </div>
    );
};

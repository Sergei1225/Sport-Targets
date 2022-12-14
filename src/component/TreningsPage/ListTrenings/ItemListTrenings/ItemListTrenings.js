import s from "./ItemListTrenings.module.scss";

import { paint, cross, list, star } from "../../../../img/srcIcons";

import { CustomButton } from "../../../BaseComponents/CustomComponents";

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
        <div
            key={id}
            className={`${s.itemTrenings} ${styleMark} ${styleDelete} basePositionElement baseFlex baseFontContent bTran`}
        >
            <div className={`${s.itemTrenings__date} baseFontContentBigBold`}>
                {date} <br />
                Status: {status}
            </div>
            <div className={`${s.itemTrenings__name} baseFontContentBigBold`}>
                {name.toUpperCase()}
            </div>
            <div className={`${s.itemTrenings__exercise} baseFlexColumn`}>
                {lineExercise}
                <CustomButton
                    //funk={}
                    innerValue={"DETAIL"}
                />
            </div>
            <div className={`${s.itemTrenings__func} baseFlexGap`}>
                <div
                    onClick={() => addToDelete(id, forDelete)}
                    className={`${s.itemTrenings__favorites} baseSizeImgSmall`}
                >
                    <img className={`baseImgCover`} src={list} alt="imgFunction" />
                </div>
                <div
                    onClick={() => changeStatus(id, status)}
                    className={`${s.itemTrenings__favorites} baseSizeImgSmall`}
                >
                    <img className={`baseImgCover`} src={paint} alt="imgFunction" />
                </div>
                <div
                    onClick={() => changeProp(id, favorite)}
                    className={`${s.itemTrenings__favorites} baseSizeImgSmall`}
                >
                    <img className={`baseImgCover`} src={star} alt="imgFunction" />
                </div>
                <div
                    onClick={() => deleteItem(id)}
                    className={`${s.itemTrenings__favorites} baseSizeImgSmall`}
                >
                    <img className={`baseImgCover`} src={cross} alt="imgFunction" />
                </div>
            </div>
        </div>
    );
};

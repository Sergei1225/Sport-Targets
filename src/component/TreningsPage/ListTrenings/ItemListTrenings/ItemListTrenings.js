import s from "./ItemListTrenings.module.scss";

import { CustomButton } from "../../../BaseComponents/CustomComponents";

export const ItemListTrenings = (props) => {
    const { name, id, date, listExersises, favorite, changeProp, deleteItem } = props;

    const lineExercise = listExersises.map((item) => item.name).join(", ");

    return (
        <div key={id} className={`${s.itemTrenings} basePositionElement baseFlex baseFontContent`}>
            <div className={`${s.itemTrenings__date} baseFontContentBigBold`}> {date}</div>
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
            <div
                className={`${s.itemTrenings__func} baseFlexGap`}
                style={{ justifySelf: "flex-end" }}
            >
                <div
                    className={s.itemTrenings__favorites}
                    data-current="favorite"
                    onClick={(e) => changeProp(id, e.target.getAttribute("data-current"))}
                >
                    📕
                </div>
                <div
                    className={s.itemTrenings__favorites}
                    data-current="favorite"
                    onClick={(e) => changeProp(id, e.target.getAttribute("data-current"))}
                >
                    🧾
                </div>
                <div
                    className={`${s.itemTrenings__cross} baseIcons__cross`}
                    onClick={() => deleteItem(id)}
                ></div>
            </div>
        </div>
    );
};

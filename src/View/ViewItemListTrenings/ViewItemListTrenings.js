import s from "./ViewItemListTrenings.module.scss";

import { ComponentSwitch } from "../../serviceComponents/ComponentSwitch/ComponentSwitch";
import { IconList } from "../../serviceComponents/IconList/IconList";

export const ViewItemListTrenings = ({
    id,
    date,
    status,
    name,
    lineExercise,
    functionsItems,
    favorite,
    forDelete,
}) => {
    const svgPast = status === "past" ? "pastIcon" : "checkMark";
    const statusItem = status === "past" ? s.itemTrenings__past : "";
    const styleDelete = forDelete ? s.itemTrenings__forDelete : "";

    const dataItemsFunction = [
        { id: "HDMysjd793297hGFhsd76w", nameFunct: "favotiteValue", nameSvg: "starIcon", hint: "Add to favorite" },
        { id: "9393jjJjfdk33hUJSKaske", nameFunct: "statusValue", nameSvg: svgPast, hint: "Change status" },
        { id: "jHshdns^%6hsanashsat4h", nameFunct: "editor", nameSvg: "editorIcon", hint: "Add to editor" },
        { id: "4334Jjsdmsdnn4383984h4", nameFunct: "deleteList", nameSvg: "deleteList", hint: "Delete list item" },
        { id: "Kdlswek94495h323nwejew", nameFunct: "delete", nameSvg: "deleteCross", hint: "Delete item" },
    ];
    const dataFavorite = [
        { id: "HDMysjd793297hGFhsd76w", nameFunct: "favotiteValue", nameSvg: "gantelSquare", hint: "Favorite item" },
    ];

    return (
        <div key={id} className={`${s.itemTrenings}  bElement `}>
            <div
                className={`${s.itemTrenings__wrapper} ${statusItem} ${styleDelete} bFlex bElement bWrapperStyleElem `}
            >
                <div
                    className={`${s.itemTrenings__favorite} ${
                        favorite && s.itemTrenings__favorite_active
                    } bFlex bAlignItems`}
                >
                    <IconList
                        styleHint={`${s.itemTrenings__hint} `}
                        funcComp={functionsItems}
                        data={dataFavorite}
                        styleWrapper={""}
                        positionHint={"-103"}
                    />
                </div>
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
                <div className={`${s.itemTrenings__name} bContentBig bBold`}>{name.toUpperCase()}</div>
                <div className={`${s.itemTrenings__exercise} bContent`}>{lineExercise}</div>
                <div className={`${s.itemTrenings__func}  `}>
                    <IconList
                        positionHint={"-103"}
                        styleHint={s.itemTrenings__hint}
                        funcComp={functionsItems}
                        data={dataItemsFunction}
                        styleWrapper={" bFlex bFlexJCSA"}
                    />
                </div>
            </div>
        </div>
    );
};

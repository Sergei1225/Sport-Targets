import s from "./ItemListTrenings.module.scss";

import { ComponentSwitch } from "../../../../serviceComponents/ComponentSwitch/ComponentSwitch";
import { IconList } from "../../../../serviceComponents/IconList/IconList";

import { useNavigate } from "react-router-dom";

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

    const navigate = useNavigate();

    const lineExercise = listExersises.map((item) => item.name).join(", ");
    const styleMark = favorite ? "baseMark" : "";
    const styleDelete = forDelete ? "baseForDelete" : "";

    const functionsItems = (action) => {
        switch (action) {
            case "delete":
                deleteItem(id);
                break;
            case "deleteList":
                addToDelete(id, forDelete);
                break;
            case "statusValue":
                changeStatus(id, status);
                break;
            case "editor":
                //navigate("/session-timed-out");
                console.log("editor link");
                break;
            case "favotiteValue":
                changeProp(id, favorite);
                break;
            default:
                console.log("Error function");
        }
    };

    const svgPast = status === "past" ? "pastIcon" : "checkMark";
    const statusItem = status === "past" ? s.itemTrenings__past : "";

    const dataItemsFunction = [
        { id: "HDMysjd793297hGFhsd76w", nameFunct: "favotiteValue", nameSvg: "starIcon", hint: "Add to favorite" },
        { id: "9393jjJjfdk33hUJSKaske", nameFunct: "statusValue", nameSvg: svgPast, hint: "Change status" },
        { id: "jHshdns^%6hsanashsat4h", nameFunct: "editor", nameSvg: "editorIcon", hint: "Add to editor" },
        { id: "4334Jjsdmsdnn4383984h4", nameFunct: "deleteList", nameSvg: "deleteList", hint: "Delete list item" },
        { id: "Kdlswek94495h323nwejew", nameFunct: "delete", nameSvg: "deleteCross", hint: "Delete item" },
    ];

    return (
        <div key={id} className={`${s.itemTrenings}  bElement`}>
            <div
                className={`${s.itemTrenings__wrapper} ${statusItem} ${styleMark} ${styleDelete} bFlex bElement bWrapperStyleElem`}
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
                <div className={`${s.itemTrenings__name} bContentBig bBold`}>{name.toUpperCase()}</div>
                <div className={`${s.itemTrenings__exercise} bContent`}>{lineExercise}</div>
                <div className={`${s.itemTrenings__func}  `}>
                    <IconList
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

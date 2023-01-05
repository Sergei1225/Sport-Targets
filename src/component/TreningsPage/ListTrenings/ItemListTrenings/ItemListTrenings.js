import s from "./ItemListTrenings.module.scss";

import { paint, cross, list, star } from "../../../../img/srcIcons";

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
            case "favotiteValue":
                changeProp(id, favorite);
                break;
            default:
                console.log("Error function");
        }
    };

    const createFunctionItems = (data) => {
        if (!data) return null;
        const items = data.map((item) => {
            return (
                <div
                    key={item.id}
                    onClick={() => functionsItems(item.action)}
                    className={`${s.itemTrenings__item} bSizeIconSmall`}
                >
                    <img className={`bImgCover`} src={item.srcImg} alt="imgFunction" />
                </div>
            );
        });
        return <div className={`${s.itemTrenings__func} bFlex bFlexJC `}>{items}</div>;
    };

    const dataItemsFunction = [
        { id: "HDMysjd793297hGFhsd76w4b327uHhjdsu", action: "favotiteValue", srcImg: star },
        { id: "9393jjJjfdk33hUJSKaskekesj544jKdse", action: "statusValue", srcImg: paint },
        { id: "4334Jjsdmsdnn4383984h4ndsmsdj3434r", action: "deleteList", srcImg: list },
        { id: "Kdlswek94495h323nwejewkJSskkaskesd", action: "delete", srcImg: cross },
    ];

    const itemsList = createFunctionItems(dataItemsFunction);

    return (
        <div key={id} className={`${s.itemTrenings} bElement`}>
            <div
                className={`${s.itemTrenings__wrapper} ${styleMark} ${styleDelete} bFlex bWrapperStyleElem`}
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
                </div>
                {itemsList}
            </div>
        </div>
    );
};
